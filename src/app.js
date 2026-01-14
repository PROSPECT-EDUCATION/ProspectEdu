
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error.js";


// routes (we’ll add auth first)
import authRoutes from "./modules/auth/auth.routes.js";
import usersRoutes from "./modules/users/users.routes.js"
import addressesRoutes from "./modules/addresses/addresses.routes.js";
import supplierRoutes from "./modules/suppliers/supplier.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import wishlistRoutes from "./modules/wishlist/wishlist.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import scholarshipRoutes from "./modules/scholarship/scholarship.routes.js"; 
import achieverRoutes from "./modules/achievers/achiever.routes.js";
import researchRoutes from "./modules/research/research.routes.js";
import donationRoutes from "./modules/donations/donation.routes.js";
import doubtRoutes from "./modules/doubts/doubt.routes.js";
import contactRoutes from "./modules/contacts/contact.routes.js";
import newsRoutes from "./modules/news/news.routes.js";
import testSeriesRoutes from "./modules/testSeries/testSeries.routes.js";
import testPurchaseRoutes from "./modules/testPurchase/testPurchase.routes.js";
import blogRoutes from "./modules/blog/blog.routes.js";
import announcementRoutes from "./modules/announcements/announcement.routes.js";
import liveTestsRoutes from "./modules/liveTests/liveTests.routes.js";











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
  app.use("/api/v1/addresses", addressesRoutes);
  app.use("/api/v1/suppliers", supplierRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/cart", cartRoutes);
  app.use("/api/v1/wishlist", wishlistRoutes);
  app.use("/api/v1/orders", orderRoutes);
  app.use("/api/v1/scholarship", scholarshipRoutes);
  app.use("/api/v1/achievers", achieverRoutes);
  app.use("/api/v1/research", researchRoutes);
  app.use("/api/v1/donations", donationRoutes);
  app.use("/api/v1/doubts", doubtRoutes);
   app.use("/api/v1/contacts", contactRoutes);
   app.use("/api/v1/news", newsRoutes);
  app.use("/api/v1/test-series", testSeriesRoutes);
  app.use("/api/v1/test-purchase", testPurchaseRoutes);
  app.use("/api/v1/blogs", blogRoutes);
 app.use("/api/v1/announcements", announcementRoutes);
 app.use("/api/v1/live-tests", liveTestsRoutes);




  

    
 



  app.use(notFound);
  app.use(errorHandler);
  return app;
}
