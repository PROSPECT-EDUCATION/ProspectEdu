import Supplier from "../suppliers/supplier.model.js";
import Product from "./product.model.js";
import { createProductSchema } from "./product.validators.js";
import { uploadBufferToCloudinary } from "../../utils/cloudinaryUpload.js";
import Category from "../categories/category.model.js";

/* ---------------- HELPERS ---------------- */

async function ensureCategoryExists(name) {
  const raw = (name || "").trim();
  if (!raw) return false;

  const found = await Category.findOne({
    name: { $regex: new RegExp(`^${raw}$`, "i") },
  }).lean();

  return !!found;
}

async function uploadImages(req) {
  const files = req.files || [];
  const urls = [];

  for (const f of files) {
    const uploaded = await uploadBufferToCloudinary(f.buffer, "products");
    urls.push(uploaded.secure_url);
  }

  return urls;
}

/* ---------------- SUPPLIER CREATE ---------------- */

export async function createProduct(req, res, next) {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error });
    }

    const supplier = await Supplier.findOne({ userId: req.user.id });
    if (!supplier || supplier.status !== "approved") {
      return res.status(403).json({ success: false, message: "Supplier not approved" });
    }

    if (!(await ensureCategoryExists(parsed.data.category))) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    const images = await uploadImages(req);

    const product = await Product.create({
      supplierId: supplier._id,
      createdBy: req.user.id,
      ...parsed.data,
      images,
    });

    res.status(201).json({ success: true, product });
  } catch (e) {
    next(e);
  }
}

/* ---------------- ADMIN CREATE ---------------- */

export async function createProductAdmin(req, res, next) {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error });
    }

    if (!(await ensureCategoryExists(parsed.data.category))) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    const images = await uploadImages(req);

    const product = await Product.create({
      supplierId: null,
      createdBy: req.user.id,
      ...parsed.data,
      images,
    });

    res.status(201).json({ success: true, product });
  } catch (e) {
    next(e);
  }
}

/* ---------------- ADMIN LIST ---------------- */

export async function adminMyProducts(req, res, next) {
  try {
    const products = await Product.find({
      createdBy: req.user.id,
      supplierId: null,
    }).sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (e) {
    next(e);
  }
}

/* ---------------- ADMIN TOGGLES ---------------- */

export async function adminToggleStock(req, res, next) {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id, supplierId: null },
      { outOfStock: !!req.body.outOfStock },
      { new: true }
    );

    if (!product) return res.status(404).json({ success: false });

    res.json({ success: true, product });
  } catch (e) {
    next(e);
  }
}

export async function adminToggleTrending(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isTrending: !!req.body.isTrending },
      { new: true }
    );

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (e) {
    next(e);
  }
}


/* ---------------- PUBLIC ---------------- */

export async function listPublicProducts(req, res, next) {
  try {
    const products = await Product.find({ status: "active" }).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (e) {
    next(e);
  }
}

// ✅ ADMIN DELETE PRODUCT
export async function adminDeleteProduct(req, res, next) {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,   // only admin who created it
      supplierId: null,         // ensure admin product
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found or not allowed",
      });
    }

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    next(e);
  }
}
// ✅ ADMIN: list ALL supplier-added products


export async function adminAllSupplierProducts(req, res, next) {
  try {
    const products = await Product.find({ supplierId: { $ne: null } })
      .populate({
        path: "supplierId",
        select: "shopName ownerName userId",
        populate: { path: "userId", select: "name email" }, // name from signup user
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (e) {
    next(e);
  }
}


