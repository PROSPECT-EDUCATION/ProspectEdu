import { Router } from "express";
import { login, register, refresh, logout } from "./auth.controller.js";
import { requireAuth, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.post("/refresh", refresh);
router.post("/logout", logout);

// ✅ test RBAC quickly
router.get("/me", requireAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/admin-only", requireAuth, requireRole("admin"), (req, res) => {
  res.json({ success: true, message: "Welcome admin!" });
});

export default router;
