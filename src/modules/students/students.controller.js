import { StudentProfile } from "./students.model.js";
import { User } from "../users/user.model.js";
import { updateMeSchema } from "./students.validators.js";
import { ensureStudentProfile } from "./students.service.js"; 
import mongoose from "mongoose";

const USER_SELECT = "fullName email phone role";
const ADMIN_USER_SELECT =
  "fullName email phone role state city isActive createdAt lastLoginAt updatedAt";
export async function getMyStudentProfile(req, res, next) {
  try {
    const [user, profileDoc] = await Promise.all([
  User.findById(req.user.id).select(USER_SELECT),
  StudentProfile.findOne({ userId: req.user.id }),
]);

let profile = profileDoc;
if (!profile) {
  profile = await ensureStudentProfile(req.user.id);
}

return res.json({ success: true, user, profile });

  } catch (e) {
    next(e);
  }
}

export async function updateMyStudentProfile(req, res, next) {
  try {
    const data = updateMeSchema.parse(req.body);

    const { fullName, phone, ...profileFields } = data;

    const ops = [];

    // Update User only if needed
    if (fullName !== undefined || phone !== undefined) {
      ops.push(
        User.findByIdAndUpdate(
          req.user.id,
          {
            $set: {
              ...(fullName !== undefined ? { fullName } : {}),
              ...(phone !== undefined ? { phone } : {}),
            },
          },
          { new: true, runValidators: true }
        ).select(USER_SELECT)
      );
    } else {
      ops.push(User.findById(req.user.id).select(USER_SELECT));
    }

    // Update StudentProfile (upsert keeps it safe)
    ops.push(
      StudentProfile.findOneAndUpdate(
        { userId: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, runValidators: true }
      )
    );

    const [user, profile] = await Promise.all(ops);

    return res.json({ success: true, user, profile });
  } catch (e) {
    if (e?.name === "ZodError") {
      e.statusCode = 422;
      e.message = e.errors?.[0]?.message || "Invalid input";
    }
    next(e);
  }
}


export async function getStudentProfileByIdAdmin(req, res, next) {
  try {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid studentId" });
    }

    const user = await User.findOne({ _id: studentId, role: "student" })
      .select("_id fullName email phone state city createdAt lastLoginAt updatedAt isActive");

    if (!user) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // ✅ ensures profile exists and returns it
    const profile = await ensureStudentProfile(user._id);

    return res.json({ success: true, user, profile });
  } catch (e) {
    next(e);
  }
}
