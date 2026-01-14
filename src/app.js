import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error.js";
import studentsRoutes from "./modules/students/students.routes.js";
// routes (we’ll add auth first)
import authRoutes from "./modules/auth/auth.routes.js";
import assignmentsRoutes from "./modules/assignments/assignments.routes.js";
import quizzesRouter from "./modules/quizzes/quizzes.routes.js";
import adminDashboardRouter from "./modules/adminDashboard/adminDashboard.routes.js";
import usersRoutes from "./modules/users/users.routes.js"
import coursesRoutes from "./modules/courses/courses.routes.js";
import contentRoutes from "./modules/courses/content.routes.js";
import categoryRoutes from "./modules/courseCategories/category.routes.js";
import purchaseRoutes from "./modules/purchases/purchase.routes.js";
import activityRoutes from "./modules/activity/activity.routes.js";
import uploadsRoutes from "./modules/uploads/uploads.routes.js";
import teacherProfileRoutes from "./modules/teachers/teacherProfile.routes.js";
export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan("dev"));

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", usersRoutes);
  app.use("/api/v1/students", studentsRoutes);
  app.use("/api/v1/courses", coursesRoutes);
  app.use("/api/v1/content", contentRoutes);

  app.use("/api/v1/course-categories", categoryRoutes);
  app.use("/api/v1/purchases", purchaseRoutes);
  app.use("/api/v1/activity", activityRoutes);
  app.use("/api/v1/uploads", uploadsRoutes);

  app.use("/api/v1/teachers/profile", teacherProfileRoutes);
  app.use("/api/v1/assignments", assignmentsRoutes);
  app.use("/api/v1/quizzes", quizzesRouter);
  app.use("/api/v1/admin", adminDashboardRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
