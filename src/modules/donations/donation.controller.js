import Donation from "./donation.model.js";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
const isMobile = (v) => /^[0-9]{10}$/.test(String(v || "").trim());

export async function createDonation(req, res, next) {
  try {
    const {
      amount,
      currency = "INR",
      firstName,
      lastName,
      email,
      mobile,
      address,
      city,
      state,
      postalCode,
      country,
      pan = "",
    } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: "Valid amount is required" });
    }
    if (!firstName || !lastName) {
      return res.status(400).json({ success: false, message: "First name and last name are required" });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ success: false, message: "Valid email is required" });
    }
    if (!isMobile(mobile)) {
      return res.status(400).json({ success: false, message: "Valid 10 digit mobile is required" });
    }
    if (!address || !city || !state || !postalCode || !country) {
      return res.status(400).json({ success: false, message: "Full address is required" });
    }

    const doc = await Donation.create({
      amount: Number(amount),
      currency,
      firstName,
      lastName,
      email,
      mobile,
      address,
      city,
      state,
      postalCode,
      country,
      pan,
    });

    return res.status(201).json({ success: true, message: "Donation saved", data: doc });
  } catch (e) {
    next(e);
  }
}

export async function adminListDonations(req, res, next) {
  try {
    const list = await Donation.find().sort({ createdAt: -1 }).lean();
    return res.json({ success: true, count: list.length, data: list });
  } catch (e) {
    next(e);
  }
}
