import { Router } from "express";
import { User } from "./user.model.js";

const router = Router();

// TEMP test route: creates a user (remove later)
router.post("/seed-admin", async (req, res, next) => {
  try {
    const exists = await User.findOne({ email: "admin@demo.com" });
    if (exists) {
      return res.json({ ok: true, message: "Admin already exists" });
    }

    const user = new User({
      fullName: "Admin Demo",
      email: "admin@demo.com",
      role: "admin",
    });

    user.password = "Admin@123"; // virtual triggers hashing
    await user.save();

    res.json({ ok: true, id: user._id });
  } catch (e) {
    next(e);
  }
});

export default router;
