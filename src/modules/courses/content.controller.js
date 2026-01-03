// server/modules/courses/content.controller.js
import { Course } from "./course.model.js";
import { Enrollment } from "./enrollment.model.js";
import { CourseModule } from "./module.model.js";
import { Lesson } from "./lesson.model.js";

/**
 * Helper: student must be enrolled to view content (for now)
 */
async function assertStudentEnrolled(req, courseId) {
  const enr = await Enrollment.findOne({ studentUserId: req.user.id, courseId, status: "active" });
  if (!enr) {
    const err = new Error("Enroll in the course to access content");
    err.statusCode = 403;
    throw err;
  }
}

/**
 * Helper: teacher must be assigned (admin always allowed)
 */
async function assertTeacherAssignedOrAdmin(req, courseId) {
  if (req.user.role === "admin") return;

  if (req.user.role !== "teacher") {
    const err = new Error("Forbidden");
    err.statusCode = 403;
    throw err;
  }

  const course = await Course.findById(courseId).select("assignedTeachers");
  if (!course) {
    const err = new Error("Course not found");
    err.statusCode = 404;
    throw err;
  }

  const ok = (course.assignedTeachers || []).some((t) => String(t) === String(req.user.id));
  if (!ok) {
    const err = new Error("You are not assigned to this course");
    err.statusCode = 403;
    throw err;
  }
}

/**
 * TEACHER/ADMIN: Create module
 * POST /api/v1/courses/:courseId/modules
 */
export async function createModule(req, res, next) {
  try {
    const { courseId } = req.params;
    const { title, description = "", order = 0, isPublished = true } = req.body;

    if (!title) return res.status(422).json({ success: false, message: "Module title is required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    // ✅ enforce teacher assignment
    await assertTeacherAssignedOrAdmin(req, courseId);

    const moduleDoc = await CourseModule.create({
      courseId,
      title,
      description,
      order: Number(order || 0),
      isPublished: !!isPublished,
    });

    res.json({ success: true, module: moduleDoc });
  } catch (e) {
    next(e);
  }
}

/**
 * STUDENT: List modules for a course (enrolled only)
 * GET /api/v1/courses/:courseId/modules
 */
export async function listModules(req, res, next) {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId, status: "published" });
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    await assertStudentEnrolled(req, courseId);

    const modules = await CourseModule.find({ courseId, isPublished: true })
      .sort({ order: 1, createdAt: 1 })
      .select("-__v");

    res.json({ success: true, modules });
  } catch (e) {
    next(e);
  }
}

/**
 * TEACHER/ADMIN: Create lesson under module
 * POST /api/v1/modules/:moduleId/lessons
 */
export async function createLesson(req, res, next) {
  try {
    const { moduleId } = req.params;
    const {
      title,
      type = "video",
      contentUrl = "",
      contentText = "",
      durationMinutes = 0,
      order = 0,
      isPreview = false,
      isPublished = true,
    } = req.body;

    if (!title) return res.status(422).json({ success: false, message: "Lesson title is required" });

    const mod = await CourseModule.findById(moduleId);
    if (!mod) return res.status(404).json({ success: false, message: "Module not found" });

    // ✅ enforce teacher assignment (via courseId from module)
    await assertTeacherAssignedOrAdmin(req, mod.courseId);

    const lesson = await Lesson.create({
      courseId: mod.courseId,
      moduleId,
      title,
      type,
      contentUrl,
      contentText,
      durationMinutes: Number(durationMinutes || 0),
      order: Number(order || 0),
      isPreview: !!isPreview,
      isPublished: !!isPublished,
    });

    res.json({ success: true, lesson });
  } catch (e) {
    next(e);
  }
}

/**
 * STUDENT: List lessons in a module (enrolled only)
 * GET /api/v1/modules/:moduleId/lessons
 */
export async function listLessons(req, res, next) {
  try {
    const { moduleId } = req.params;

    const mod = await CourseModule.findById(moduleId);
    if (!mod) return res.status(404).json({ success: false, message: "Module not found" });

    const course = await Course.findOne({ _id: mod.courseId, status: "published" });
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    await assertStudentEnrolled(req, mod.courseId);

    const lessons = await Lesson.find({ moduleId, isPublished: true })
      .sort({ order: 1, createdAt: 1 })
      .select("-__v");

    res.json({ success: true, lessons });
  } catch (e) {
    next(e);
  }
}
