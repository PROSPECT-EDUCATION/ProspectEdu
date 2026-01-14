import express from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
import { createDonation, adminListDonations } from "./donation.controller.js";

const router = express.Router();

// Public: anyone can submit donation details
router.post("/", createDonation);

// Admin: view list
router.get("/admin", requireAuth, requireRole("admin"), adminListDonations);

export default router;
