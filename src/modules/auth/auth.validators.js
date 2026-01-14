import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional(),
  password: z.string().min(6).max(72),
  city: z.string(),
  state: z.string(),
  role: z.enum(["admin", "student", "parent", "teacher", "supplier"]),
});

export const loginSchema = z.object({
  phone: z.string().min(7).max(20),
  password: z.string().min(6).max(72),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

