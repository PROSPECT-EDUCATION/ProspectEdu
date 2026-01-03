import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
import { createLesson, createModule, listLessons, listModules } from "./content.controller.js";

const router = Router();

// teacher/admin create module
router.post("/courses/:courseId/modules", requireAuth, requireRole("admin", "teacher"), createModule);

// student list modules (enrolled)
router.get("/courses/:courseId/modules", requireAuth, requireRole("student"), listModules);

// teacher/admin create lesson
router.post("/modules/:moduleId/lessons", requireAuth, requireRole("admin", "teacher"), createLesson);

// student list lessons (enrolled)
router.get("/modules/:moduleId/lessons", requireAuth, requireRole("student"), listLessons);

export default router;
