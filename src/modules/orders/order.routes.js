import express from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
import {
  createOrder,
  myOrders,
  supplierOrders,
  updateItemStatus,
  supplierStats,
  getMyOrderByOrderId,
} from "./order.controller.js";

const router = express.Router();

// user place order
router.post("/", requireAuth, createOrder);

// user my orders
router.get("/mine", requireAuth, myOrders);

// supplier orders + status update + stats
router.get("/supplier", requireAuth, requireRole("supplier"), supplierOrders);
router.patch("/items/:itemId/status", requireAuth, requireRole("supplier"), updateItemStatus);
router.get("/supplier/stats", requireAuth, requireRole("supplier"), supplierStats);
// user: single order detail by orderId
router.get("/:orderId", requireAuth, getMyOrderByOrderId);


export default router;
