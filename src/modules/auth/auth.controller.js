import { registerSchema, loginSchema, changePasswordSchema } from "./auth.validators.js";
import { registerUser, loginUser, refreshSession, logoutUser, changePassword } from "./auth.service.js";


function setRefreshCookie(res, refreshToken) {
  // Local dev: secure false. In prod: secure true + sameSite "none" if cross-domain.
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/api/v1/auth/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

function clearRefreshCookie(res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/api/v1/auth/refresh",
  });
}

export async function register(req, res, next) {
  try {
    const data = registerSchema.parse(req.body);
    const result = await registerUser(data);

    setRefreshCookie(res, result.refreshToken);

    return res.status(201).json({
      success: true,
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (e) {
    // Zod errors:
    if (e?.name === "ZodError") {
      e.statusCode = 422;
      e.message = e.errors?.[0]?.message || "Invalid input";
    }
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);
    const result = await loginUser(data);

    setRefreshCookie(res, result.refreshToken);

    return res.json({
      success: true,
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (e) {
    if (e?.name === "ZodError") {
      e.statusCode = 422;
      e.message = e.errors?.[0]?.message || "Invalid input";
    }
    next(e);
  }
}
export async function refresh(req, res, next) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    const result = await refreshSession({ refreshToken });

    // rotate cookie
    setRefreshCookie(res, result.refreshToken);

    return res.json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (e) {
    // ensure cookie cleared if refresh fails
    clearRefreshCookie(res);
    next(e);
  }
}

export async function logout(req, res, next) {
  try {
    // If user is logged in, we can optionally accept Bearer token
    // But simplest: decode refresh cookie if exists (best effort)
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      try {
        const payload = refreshToken ? (await import("../../utils/jwt.js")).then(m => m.verifyRefreshToken(refreshToken)) : null;
      } catch {}
    }

    // Better: if access token provided, use it to clear DB
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");
    if (type === "Bearer" && token) {
      try {
        const { verifyAccessToken } = await import("../../utils/jwt.js");
        const payload = verifyAccessToken(token);
        await logoutUser({ userId: payload.sub });
      } catch {}
    }

    clearRefreshCookie(res);

    return res.json({ success: true, message: "Logged out" });
  } catch (e) {
    next(e);
  }
}
export async function changeMyPassword(req, res, next) {
  try {
    const data = changePasswordSchema.parse(req.body);

    await changePassword({
      userId: req.user?.id, // ✅ requireAuth gives req.user.id
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });

    clearRefreshCookie(res);

    return res.json({
      success: true,
      message: "Password changed successfully. Please login again.",
    });
  } catch (e) {
    if (e?.name === "ZodError") {
      e.statusCode = 422;
      e.message = e.errors?.[0]?.message || "Invalid input";
    }
    next(e);
  }
}

