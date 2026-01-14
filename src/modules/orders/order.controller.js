import Order from "./order.model.js";
import Product from "../products/product.model.js";
import Supplier from "../suppliers/supplier.model.js";

const makeOrderId = () => "ORD" + Math.floor(10000 + Math.random() * 90000);

// ✅ Status groups for stock logic
const reserveStatuses = new Set(["CONFIRMED", "ON_THE_WAY", "DELIVERED"]);
const releaseStatuses = new Set(["REJECTED", "CANCELED"]);

export async function createOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const { items, address } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order items required" });
    }
    if (!address?.name || !address?.phone || !address?.address || !address?.pincode) {
      return res.status(400).json({ success: false, message: "Address required" });
    }

    // ✅ Build order items from DB products (prevent client tampering)
    const orderItems = [];
    let totalMRP = 0;
    let totalPrice = 0;

    for (const it of items) {
      const product = await Product.findById(it.productId).lean();
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      const qty = Math.max(1, Number(it.quantity || 1));
      const mrp = Number(product.price || 0);
      const offer = Number(product.offerPrice ?? product.price ?? 0);

      totalMRP += mrp * qty;
      totalPrice += offer * qty;

      orderItems.push({
        productId: product._id,
        supplierId: product.supplierId,
        title: product.name,
        img: product.images?.[0] || "",
        price: offer,
        quantity: qty,
        status: "CONFIRMED", // ✅ default = CONFIRMED
      });
    }

    const discount = totalMRP - totalPrice;
    const shipping = totalPrice < 1000 ? 99 : 0;
    const grandTotal = totalPrice + shipping;

    // unique orderId retry
    let orderId = makeOrderId();
    for (let i = 0; i < 5; i++) {
      const exists = await Order.findOne({ orderId }).lean();
      if (!exists) break;
      orderId = makeOrderId();
    }

    const doc = await Order.create({
      orderId,
      userId,
      items: orderItems,
      address,
      totalMRP,
      totalPrice,
      discount,
      shipping,
      grandTotal,
    });

    return res.status(201).json({ success: true, message: "Order placed", order: doc });
  } catch (err) {
    next(err);
  }
}

// ✅ User: My Orders
export async function myOrders(req, res, next) {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
}

// ✅ Supplier: Orders list (only items for this supplier)
export async function supplierOrders(req, res, next) {
  try {
    const supplier = await Supplier.findOne({ userId: req.user.id }).lean();
    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier profile not found" });
    }

    const allOrders = await Order.find({ "items.supplierId": supplier._id })
      .sort({ createdAt: -1 })
      .lean();

    // filter items only for this supplier
    const orders = allOrders.map((o) => ({
      ...o,
      items: (o.items || []).filter((it) => String(it.supplierId) === String(supplier._id)),
    }));

    return res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
}

// ✅ Supplier: Update status of single item + ✅ UPDATE PRODUCT STOCK
export async function updateItemStatus(req, res, next) {
  try {
    const supplier = await Supplier.findOne({ userId: req.user.id }).lean();
    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier profile not found" });
    }

    const { itemId } = req.params;
    const { status } = req.body;

    const allowed = ["ORDER_RECEIVED", "CONFIRMED", "ON_THE_WAY", "CANCELED", "REJECTED", "DELIVERED"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Find the order containing this itemId
    const order = await Order.findOne({ "items._id": itemId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order item not found" });
    }

    const item = order.items.id(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    // ✅ Security: only that supplier can update its item
    if (String(item.supplierId) !== String(supplier._id)) {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }

    // ✅ stock logic based on old -> new
    const oldStatus = item.status;
    const oldIsReserved = reserveStatuses.has(oldStatus);
    const newIsReserved = reserveStatuses.has(status);

    // update item status
    item.status = status;

    // ✅ Update product stock
    if (item.productId) {
      const product = await Product.findById(item.productId);
      if (product) {
        const qty = Number(item.quantity || 1);
        const currentQty = Number(product.quantity || 0);

        // reserve now (CONFIRMED/ON_THE_WAY/DELIVERED) but wasn't reserved earlier
        if (!oldIsReserved && newIsReserved) {
          product.quantity = Math.max(0, currentQty - qty);
        }

        // release now (REJECTED/CANCELED) but was reserved earlier
        if (oldIsReserved && releaseStatuses.has(status)) {
          product.quantity = currentQty + qty;
        }

        // update outOfStock automatically
        product.outOfStock = Number(product.quantity || 0) <= 0;

        await product.save();
      }
    }

    await order.save();

    return res.json({
      success: true,
      message: "Status updated",
      orderId: order.orderId,
      itemId,
      status,
    });
  } catch (err) {
    next(err);
  }
}

// ✅ Supplier Dashboard stats
export async function supplierStats(req, res, next) {
  try {
    const supplier = await Supplier.findOne({ userId: req.user.id }).lean();
    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier profile not found" });
    }

    const orders = await Order.find({ "items.supplierId": supplier._id }).lean();

    let totalOrders = 0;
    let pendingOrders = 0;
    let totalRevenue = 0;

    const productSales = new Map(); // productId -> qty sold

    for (const o of orders) {
      for (const it of o.items || []) {
        if (String(it.supplierId) !== String(supplier._id)) continue;

        totalOrders += 1;

        if (["ORDER_RECEIVED", "CONFIRMED", "ON_THE_WAY"].includes(it.status)) {
          pendingOrders += 1;
        }

        // revenue: count only not canceled/rejected
        if (!["CANCELED", "REJECTED"].includes(it.status)) {
          totalRevenue += Number(it.price || 0) * Number(it.quantity || 0);
        }

        const pid = String(it.productId);
        productSales.set(pid, (productSales.get(pid) || 0) + Number(it.quantity || 0));
      }
    }

    // best selling product (by qty)
    let bestProductId = null;
    let bestQty = 0;
    for (const [pid, qty] of productSales.entries()) {
      if (qty > bestQty) {
        bestQty = qty;
        bestProductId = pid;
      }
    }

    return res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        totalRevenue,
        bestSelling: bestProductId ? { productId: bestProductId, soldQty: bestQty } : null,
      },
    });
  } catch (err) {
    next(err);
  }
}

// ✅ GET /api/v1/orders/:orderId  (user only: own order)
export async function getMyOrderByOrderId(req, res, next) {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({
      orderId,
      userId: req.user.id,
    }).lean();

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
}
