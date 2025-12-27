import bcrypt from "bcryptjs";
import { User } from "../users/user.model.js";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.js";

export async function registerUser({ fullName, email, phone, password, role }) {
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already in use");
    err.statusCode = 409;
    throw err;
  }

  const user = new User({ fullName, email, phone, role });
  user.password = password; // virtual -> hashes into passwordHash
  await user.save();

  // Load passwordHash for refresh hashing operations
  const fresh = await User.findById(user._id).select("+passwordHash +refreshTokenHash");

  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id.toString(), role: user.role });

  // Store refresh token hash in DB (recommended)
  fresh.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await fresh.save();

  return { user: sanitizeUser(user), accessToken, refreshToken };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select("+passwordHash +refreshTokenHash");
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
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}
