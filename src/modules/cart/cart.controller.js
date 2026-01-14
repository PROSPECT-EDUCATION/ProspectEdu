import Cart from "./cart.model.js";
import Product from "../products/product.model.js";

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = await Cart.create({ userId, items: [] });
  return cart;
}

export async function getMyCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user.id);
    return res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
}

export async function addCartItem(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "productId is required" });
    }

    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty < 1) {
      return res.status(400).json({ success: false, message: "quantity must be >= 1" });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const cart = await getOrCreateCart(req.user.id);

    const idx = cart.items.findIndex((it) => String(it.productId) === String(productId));

    if (idx >= 0) {
      cart.items[idx].quantity += qty;
    } else {
      cart.items.push({
        productId,
        quantity: qty,
        title: product.name || "",
        img: (product.images && product.images[0]) || "",
        price: Number(product.offerPrice || product.price || 0),
        oldPrice: Number(product.price || 0),
      });
    }

    await cart.save();
    return res.json({ success: true, message: "Added to cart", cart });
  } catch (err) {
    next(err);
  }
}

export async function updateCartItemQty(req, res, next) {
  try {
    const { productId } = req.params;
    const qty = Number(req.body.quantity);

    if (!Number.isFinite(qty) || qty < 1) {
      return res.status(400).json({ success: false, message: "quantity must be >= 1" });
    }

    const cart = await getOrCreateCart(req.user.id);
    const idx = cart.items.findIndex((it) => String(it.productId) === String(productId));
    if (idx < 0) return res.status(404).json({ success: false, message: "Item not found" });

    cart.items[idx].quantity = qty;
    await cart.save();

    return res.json({ success: true, message: "Quantity updated", cart });
  } catch (err) {
    next(err);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    const { productId } = req.params;

    const cart = await getOrCreateCart(req.user.id);
    cart.items = cart.items.filter((it) => String(it.productId) !== String(productId));
    await cart.save();

    return res.json({ success: true, message: "Item removed", cart });
  } catch (err) {
    next(err);
  }
}

export async function clearCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user.id);
    cart.items = [];
    await cart.save();
    return res.json({ success: true, message: "Cart cleared", cart });
  } catch (err) {
    next(err);
  }
}
