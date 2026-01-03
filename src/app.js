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
import usersRoutes from "./modules/users/users.routes.js"
import coursesRoutes from "./modules/courses/courses.routes.js";
import contentRoutes from "./modules/courses/content.routes.js";
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
  app.use("/api/v1", contentRoutes);


  app.use(notFound);
  app.use(errorHandler);
  return app;
}
