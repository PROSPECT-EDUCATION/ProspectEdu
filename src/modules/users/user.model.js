import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

export const USER_ROLES = ["admin", "student", "parent", "teacher", "supplier"];

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    phone: { type: String, trim: true }, // optional

    passwordHash: { type: String, required: true, select: false },

    role: {
      type: String,
      enum: USER_ROLES,
      required: true,
      index: true,
    },

    isActive: { type: Boolean, default: true },

    // For refresh-token rotation (we’ll use this later in Auth module)
    refreshTokenHash: { type: String, select: false, default: null },

    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

/**
 * Virtual setter to accept "password" and store hashed value in passwordHash.
 * So controllers can do: user.password = "secret"
 */
userSchema
  .virtual("password")
  .set(function setPassword(password) {
    this._plainPassword = password;
  });

userSchema.pre("save", async function hashPassword(next) {
  try {
    if (this._plainPassword) {
      const salt = await bcrypt.genSalt(10);
      this.passwordHash = await bcrypt.hash(this._plainPassword, salt);
      this._plainPassword = undefined;
    }
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function comparePassword(password) {
  // passwordHash may be not selected by default
  if (!this.passwordHash) return false;
  return bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.model("User", userSchema);
