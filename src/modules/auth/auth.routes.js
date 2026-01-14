import { Router } from "express";
import * as AuthController from "./auth.controller.js";
import { requireAuth, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);

// ✅ Change Password (update => PATCH is best practice)
router.patch("/change-password", requireAuth, AuthController.changeMyPassword);

// ✅ test RBAC quickly
router.get("/me", requireAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/admin-only", requireAuth, requireRole("admin"), (req, res) => {
  res.json({ success: true, message: "Welcome admin!" });
});

export default router;
