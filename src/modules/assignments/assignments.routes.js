import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
import { uploadAny } from "../../middlewares/uploadAny.js";
import { Assignment } from "./assignments.model.js";
import https from "https";
import {
  createAssignment,
  teacherListAssignments,
  updateAssignment,
  deleteAssignment,
} from "./assignments.controller.js";

const router = Router();

// ✅ Create assignment (file optional)
router.post(
  "/courses/:courseId",
  requireAuth,
  requireRole("admin", "teacher"),
  uploadAny.single("file"),
  createAssignment
);

// ✅ List assignments for a course (teacher/admin)
router.get(
  "/teacher/courses/:courseId",
  requireAuth,
  requireRole("admin", "teacher"),
  teacherListAssignments
);

// ✅ Update assignment meta
router.patch(
  "/:assignmentId",
  requireAuth,
  requireRole("admin", "teacher"),
  updateAssignment
);

// ✅ Delete assignment + cloudinary
router.delete(
  "/:assignmentId",
  requireAuth,
  requireRole("admin", "teacher"),
  deleteAssignment
);


router.get("/:assignmentId/file", async (req, res, next) => {
  try {
    const a = await Assignment.findById(req.params.assignmentId).select(
      "fileUrl fileName mimeType"
    );

    if (!a?.fileUrl) {
      return res.status(404).json({ success: false, message: "No file" });
    }

    // ✅ tell browser to open PDF in tab (inline)
    res.setHeader("Content-Type", a.mimeType || "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(a.fileName || "attachment.pdf")}"`
    );

    // ✅ stream bytes from cloudinary to the browser
    https.get(a.fileUrl, (fileRes) => {
      // if cloudinary responds with error
      if (fileRes.statusCode && fileRes.statusCode >= 400) {
        return res.status(fileRes.statusCode).end();
      }
      fileRes.pipe(res);
    }).on("error", (err) => next(err));
  } catch (e) {
    next(e);
  }
});




export default router;
