import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
import { getMyStudentProfile, updateMyStudentProfile } from "./students.controller.js";

const router = Router();

// Student self routes
router.get("/me", requireAuth, requireRole("student"), getMyStudentProfile);
router.patch("/me", requireAuth, requireRole("student"), updateMyStudentProfile);

export default router;
