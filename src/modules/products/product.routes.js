import express from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
import { upload } from "../../middlewares/upload.js";
import {
  createProduct,
  myProducts,
  deleteProduct,
  updateStock,
  listPublicProducts,
} from "./product.controller.js";

const router = express.Router();

// ✅ PUBLIC (Shop page)
router.get("/", listPublicProducts);

// ✅ supplier create (NOW supports images upload)
router.post(
  "/",
  requireAuth,
  requireRole("supplier"),
  upload.array("images", 5), // ✅ IMPORTANT: field name = images
  createProduct
);

// supplier dashboard
router.get("/mine", requireAuth, requireRole("supplier"), myProducts);
router.delete("/:id", requireAuth, requireRole("supplier"), deleteProduct);
router.patch("/:id/stock", requireAuth, requireRole("supplier"), updateStock);

export default router;
