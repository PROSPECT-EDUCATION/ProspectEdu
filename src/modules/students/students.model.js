import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },

    state: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },

    grade: { type: String, trim: true, default: "" },
    stream: { type: String, trim: true, default: "" },

    isEnrolled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const StudentProfile = mongoose.model("StudentProfile", studentSchema);
