import { StudentProfile } from "./students.model.js";
import { updateMeSchema } from "./students.validators.js";

export async function getMyStudentProfile(req, res, next) {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user.id });
    return res.json({ success: true, profile });
  } catch (e) {
    next(e);
  }
}

export async function updateMyStudentProfile(req, res, next) {
  try {
    const data = updateMeSchema.parse(req.body);

    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: data },
      { new: true }
    );

    return res.json({ success: true, profile });
  } catch (e) {
    if (e?.name === "ZodError") {
      e.statusCode = 422;
      e.message = e.errors?.[0]?.message || "Invalid input";
    }
    next(e);
  }
}
