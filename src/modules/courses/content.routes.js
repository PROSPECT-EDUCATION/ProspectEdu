import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
import { createLesson, createModule,updateLesson, listLessons, listModules,deleteLesson, teacherGetModulesWithLessons } from "./content.controller.js";

const router = Router();

// teacher/admin create module
router.post("/courses/:courseId/modules", requireAuth, requireRole("admin", "teacher"), createModule);

// student list modules (enrolled)
router.get("/courses/:courseId/modules", requireAuth, requireRole("student"), listModules);

// teacher/admin create lesson
router.post("/modules/:moduleId/lessons", requireAuth, requireRole("admin", "teacher"), createLesson);

// student list lessons (enrolled)
router.get("/modules/:moduleId/lessons", requireAuth, requireRole("student"), listLessons);

router.get(
  "/teacher/courses/:courseId/modules",
  requireAuth,
  requireRole("admin", "teacher"),
  teacherGetModulesWithLessons
);
router.delete(
  "/lessons/:lessonId",
  requireAuth,
  requireRole("admin", "teacher"),
  deleteLesson
);
router.patch(
  "/lessons/:lessonId",
  requireAuth,
  requireRole("admin", "teacher"),
  updateLesson
);

export default router;
