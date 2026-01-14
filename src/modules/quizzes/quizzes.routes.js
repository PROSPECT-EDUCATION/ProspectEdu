import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
import {
  createQuiz,
  teacherListQuizzes,
  getQuiz,
  updateQuiz,
  publishQuiz,
  deleteQuiz,
} from "./quizzes.controller.js";

const router = Router();

router.post(
  "/courses/:courseId",
  requireAuth,
  requireRole("admin", "teacher"),
  createQuiz
);

router.get(
  "/teacher/courses/:courseId",
  requireAuth,
  requireRole("admin", "teacher"),
  teacherListQuizzes
);

router.get(
  "/:quizId",
  requireAuth,
  requireRole("admin", "teacher"),
  getQuiz
);

router.patch(
  "/:quizId",
  requireAuth,
  requireRole( "teacher"),
  updateQuiz
);

router.post(
  "/:quizId/publish",
  requireAuth,
  requireRole("teacher"),
  publishQuiz
);
router.delete(
  "/:quizId",
  requireAuth,
  requireRole( "teacher"),
  deleteQuiz
);

export default router;
