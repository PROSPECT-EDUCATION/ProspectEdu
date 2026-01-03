import bcrypt from "bcryptjs";
import { User } from "../users/user.model.js";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "../../utils/jwt.js";
import { ensureStudentProfile } from "../students/students.service.js";

export async function registerUser({ fullName, email, phone, password, role, state, city }) {
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already in use");
    err.statusCode = 409;
    throw err;
  }
const passwordHash = await bcrypt.hash(password, 10);
 let user;
  try {
    user = await User.create({
      fullName,
      email,
      phone,
      role,
      state,
      city,
      passwordHash,
    });
    if (user.role === "student") {
  await ensureStudentProfile(user._id, { state: "", city: "" });
}
  } catch (e) {
    // ✅ Handle Mongo duplicate key
    if (e?.code === 11000) {
      const field = Object.keys(e.keyPattern || {})[0] || "field";
      const err = new Error(`${field} already in use`);
      err.statusCode = 409;
      throw err;
    }
    throw e;
  }
// load fresh doc with refreshTokenHash selectable
const fresh = await User.findById(user._id).select("+refreshTokenHash");
const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
const refreshToken = signRefreshToken({ sub: user._id.toString(), role: user.role });

// Store refresh token hash in DB (recommended)
fresh.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
await fresh.save();
return { user: sanitizeUser(user), accessToken, refreshToken };
}

export async function loginUser({ phone, password }) {
  const user = await User.findOne({ phone }).select("+passwordHash +refreshTokenHash");
  if (!user || !user.isActive) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const ok = await user.comparePassword(password);
  if (!ok) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  user.lastLoginAt = new Date();

  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id.toString(), role: user.role });

  user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await user.save();

  return { user: sanitizeUser(user), accessToken, refreshToken };
}

export function sanitizeUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    state: user.state,
    city: user.city,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}
export async function refreshSession({ refreshToken }) {
  if (!refreshToken) {
    const err = new Error("Missing refresh token");
    err.statusCode = 401;
    throw err;
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    const err = new Error("Invalid refresh token");
    err.statusCode = 401;
    throw err;
  }

  const user = await User.findById(payload.sub).select("+refreshTokenHash");
  if (!user || !user.isActive) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    throw err;
  }

  // Compare stored hash with presented refresh token
  const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash || "");
  if (!ok) {
    // Token reuse / rotation protection: invalidate stored token
    user.refreshTokenHash = null;
    await user.save();

    const err = new Error("Refresh token revoked");
    err.statusCode = 401;
    throw err;
  }

  // Rotate: issue new tokens
  const newAccessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  const newRefreshToken = signRefreshToken({ sub: user._id.toString(), role: user.role });

  user.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
  await user.save();

  return { accessToken: newAccessToken, refreshToken: newRefreshToken, user: sanitizeUser(user) };
}

export async function logoutUser({ userId }) {
  if (!userId) return;
  await User.updateOne({ _id: userId }, { $set: { refreshTokenHash: null } });
}

