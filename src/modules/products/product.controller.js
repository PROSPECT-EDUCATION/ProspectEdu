import Supplier from "../suppliers/supplier.model.js";
import Product from "./product.model.js";
import { createProductSchema } from "./product.validators.js";
import { uploadBufferToCloudinary } from "../../utils/cloudinaryUpload.js";

// ✅ Shop page predefined categories (same as your UI filter)
const PREDEFINED_CATEGORIES = [
  "IT Books",
  "Electrical Books",
  "Civil Books",
  "Law Books",
  "Medical Books",
  "Management Books",
  "Merchandise",
];

export async function createProduct(req, res, next) {
  try {
    // multipart/form-data => req.body values are strings
    const body = {
      ...req.body,
      price: req.body.price !== undefined ? Number(req.body.price) : req.body.price,
      offerPrice:
        req.body.offerPrice !== undefined && req.body.offerPrice !== ""
          ? Number(req.body.offerPrice)
          : 0,
      quantity: req.body.quantity !== undefined ? Number(req.body.quantity) : req.body.quantity,
      images: [], // we will set after cloudinary upload
    };

    const parsed = createProductSchema.safeParse(body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten(),
      });
    }

    // find supplier by logged-in user
    const supplier = await Supplier.findOne({ userId: req.user.id });
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier profile not found",
      });
    }

    // allow only approved suppliers
    if (supplier.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Supplier not approved yet",
      });
    }

    // ✅ upload images to Cloudinary (if any)
    const files = req.files || [];
    const imageUrls = [];

    for (const f of files) {
      const uploaded = await uploadBufferToCloudinary(f.buffer, "products");
      imageUrls.push(uploaded.secure_url);
    }

    const rawCategory = (parsed.data.category || "").trim();

    // ✅ If category is not in predefined list -> send it to "Other"
    const isPredefined = PREDEFINED_CATEGORIES.some(
      (c) => c.toLowerCase() === rawCategory.toLowerCase()
    );

    const finalCategory = isPredefined ? rawCategory : "Other";
    const finalCustomCategory = isPredefined ? "" : rawCategory;

    const doc = await Product.create({
      supplierId: supplier._id,
      createdBy: req.user.id,

      name: parsed.data.name.trim(),
      description: parsed.data.description?.trim() || "",

      category: finalCategory,
      customCategory: finalCustomCategory,

      price: parsed.data.price,
      offerPrice: parsed.data.offerPrice,
      quantity: parsed.data.quantity,

      images: imageUrls, // ✅ STORE CLOUDINARY URLS
    });

    return res.status(201).json({
      success: true,
      message: "Product created",
      product: doc,
    });
  } catch (err) {
    next(err);
  }
}

// ✅ PUBLIC: for shop page (everyone can see)
export async function listPublicProducts(req, res, next) {
  try {
    const products = await Product.find({ status: "active" })
      .sort({ createdAt: -1 })
      .populate("supplierId", "shopName")
      .lean();

    return res.json({
      success: true,
      products,
    });
  } catch (err) {
    next(err);
  }
}

export async function myProducts(req, res, next) {
  try {
    const supplier = await Supplier.findOne({ userId: req.user.id });
    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier profile not found" });
    }

    const products = await Product.find({ supplierId: supplier._id }).sort({
      createdAt: -1,
    });

    return res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const supplier = await Supplier.findOne({ userId: req.user.id });
    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier profile not found" });
    }

    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      supplierId: supplier._id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found or not allowed" });
    }

    return res.json({ success: true, message: "Product removed", deleted });
  } catch (err) {
    next(err);
  }
}

export async function updateStock(req, res, next) {
  try {
    const supplier = await Supplier.findOne({ userId: req.user.id });
    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier profile not found" });
    }

    const { outOfStock } = req.body;

    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, supplierId: supplier._id },
      { $set: { outOfStock: !!outOfStock } },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found or not allowed" });
    }

    return res.json({ success: true, message: "Stock updated", product: updated });
  } catch (err) {
    next(err);
  }
}
