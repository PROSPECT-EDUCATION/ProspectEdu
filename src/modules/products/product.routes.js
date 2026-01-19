import express from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
import { upload } from "../../middlewares/upload.js";

import {
  createProduct,
  createProductAdmin,
  adminMyProducts,
  adminToggleStock,
  adminToggleTrending,
  adminDeleteProduct,
  listPublicProducts,
  adminAllSupplierProducts,
} from "./product.controller.js";

const router = express.Router();

/* -------- PUBLIC -------- */
router.get("/", listPublicProducts);

/* -------- SUPPLIER -------- */
router.post(
  "/",
  requireAuth,
  requireRole("supplier"),
  upload.array("images", 5),
  createProduct
);

/* -------- ADMIN -------- */
router.post(
  "/admin",
  requireAuth,
  requireRole("admin"),
  upload.array("images", 5),
  createProductAdmin
);

router.get(
  "/admin/mine",
  requireAuth,
  requireRole("admin"),
  adminMyProducts
);

router.patch(
  "/:id/stock-admin",
  requireAuth,
  requireRole("admin"),
  adminToggleStock
);

router.patch(
  "/:id/trending",
  requireAuth,
  requireRole("admin"),
  adminToggleTrending
);

// ✅ DELETE (THIS WAS MISSING)
router.delete(
  "/admin/:id",
  requireAuth,
  requireRole("admin"),
  adminDeleteProduct
);
// ✅ ADMIN: all supplier products
router.get(
  "/admin/supplier-products",
  requireAuth,
  requireRole("admin"),
  adminAllSupplierProducts
);
router.get(
  "/admin/supplier-products",
  requireAuth,
  requireRole("admin"),
  adminAllSupplierProducts
);



export default router;
