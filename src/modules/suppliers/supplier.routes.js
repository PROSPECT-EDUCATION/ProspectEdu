import express from "express";
import * as controller from "./supplier.controller.js";
import { requireAuth, requireRole } from "../../middlewares/auth.js";

const router = express.Router();

// logged-in user
router.get("/me", requireAuth, controller.getMe);
router.post("/apply", requireAuth, controller.apply);

// admin
router.get(
  "/applications",
  requireAuth,
  requireRole("admin"),
  controller.list
);
router.patch("/me", requireAuth, controller.updateMe);


router.patch(
  "/:id/approve",
  requireAuth,
  requireRole("admin"),
  controller.approve
);

router.patch(
  "/:id/reject",
  requireAuth,
  requireRole("admin"),
  controller.reject
);

export default router;
