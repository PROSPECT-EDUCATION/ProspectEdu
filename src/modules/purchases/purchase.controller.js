import mongoose from "mongoose";
import { Course } from "../courses/course.model.js";
import { Enrollment } from "../courses/enrollment.model.js";
import { Purchase } from "./purchase.model.js";

/**
 * STEP 1: Create pending purchase (checkout)
 */
export async function createCheckout(req, res, next) {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await Course.findOne({ _id: courseId, status: "published" });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const amount =
      Number(course.price || 0) -
      Number(course.discount || 0) +
      Number(course.tax || 0);

    const purchase = await Purchase.create({
      userId,
      courseId,
      amount,
      currency: "INR",
      status: "pending",
      provider: "manual",
    });

    return res.json({
      success: true,
      purchaseId: purchase._id,
      amount: purchase.amount,
    });
  } catch (e) {
    if (e?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Purchase already exists",
      });
    }
    next(e);
  }
}

/**
 * STEP 2: Confirm payment → mark paid → enroll student
 */
export async function confirmPurchase(req, res, next) {
  try {
    const { purchaseId } = req.params;
    const userId = req.user.id;

    // 🔒 Only confirm if still pending
    const purchase = await Purchase.findOneAndUpdate(
      { _id: purchaseId, userId, status: "pending" },
      {
        $set: {
          status: "paid",
          paidAt: new Date(),
          providerPaymentId: req.body?.providerPaymentId || "manual_paid",
        },
      },
      { new: true }
    );

    if (!purchase) {
      return res.status(409).json({
        success: false,
        message: "Purchase not found or already confirmed",
      });
    }

    // Enroll student
    let enrollment;
    try {
      enrollment = await Enrollment.create({
        studentUserId: userId,
        courseId: purchase.courseId,
        status: "active",
      });
    } catch (e) {
      if (e?.code !== 11000) throw e;
    }

    return res.json({
      success: true,
      message: "Payment confirmed and enrollment activated",
      purchase,
      enrollment: enrollment || null,
    });
  } catch (e) {
    next(e);
  }
}

export async function purchaseCourse(req, res, next) {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await Course.findOne({ _id: courseId, status: "published" });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const amount =
      Number(course.price || 0) -
      Number(course.discount || 0) +
      Number(course.tax || 0);

    // 1️⃣ Create purchase
    const purchase = await Purchase.create({
      userId,
      courseId,
      amount,
      currency: "INR",
      status: "paid",
    });

    // 2️⃣ Create enrollment
    const enrollment = await Enrollment.create({
      studentUserId: userId,
      courseId,
      status: "active",
    });

    res.json({
      success: true,
      message: "Course purchased & enrolled successfully",
      purchase,
      enrollment,
    });
  } catch (e) {
    if (e?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Already purchased or already enrolled",
      });
    }
    next(e);
  }
}

export async function myPurchases(req, res, next) {
  try {
    const userId = req.user.id;

    const purchases = await Purchase.find({ userId, status: "paid" })
      .sort({ createdAt: -1 })
      .populate("courseId", "title slug category img price discount tax date status")
      .select("-__v");

    res.json({ success: true, purchases });
  } catch (e) {
    next(e);
  }
}
