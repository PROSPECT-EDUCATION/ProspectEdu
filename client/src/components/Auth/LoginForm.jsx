import { useState } from "react";
import { Phone, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../services/auth";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await authApi.login({
      phone: formData.phone,
      password: formData.password,
    });

    const { accessToken, user } = res.data;

    // simplest working storage for now (we can move to Context later)
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("user", JSON.stringify(user));

    // role-based redirect (adjust paths to your actual routes)
    if (user.role === "admin") {
  const status = user.adminApproval?.status;
  if (status && status !== "approved") {
    // Should not happen because backend blocks login,
    // but just in case:
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    setError("Admin account pending approval");
    return;
  }
  navigate("/admin-dashboard");
}
    else if (user.role === "teacher") navigate("/teacher-dashboard");
    else if (user.role === "student") navigate("/student-dashboard");
    else if (user.role === "parent") navigate("/parent-dashboard");
    else if (user.role === "supplier") navigate("/supplier-dashboard");
    else navigate("/");
  } catch (err) {
    setError(err?.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-md">
      {/* Welcome Section */}
      <h3 className="text-xl font-semibold text-[#124734] mb-2">
        Welcome back!
      </h3>
      <p className="text-sm text-[#5B7065] mb-6">
        Please log in to access your account.
      </p>
      {error ? (
  <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
    {error}
  </div>
) : null}


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        aria-label="Login form"
        autoComplete="on"
      >
        <fieldset className="space-y-4">
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#124734] mb-1"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-2.5 text-[#A7E1B2]"
                aria-hidden="true"
              />
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                inputMode="numeric"
                autoComplete="tel"
                className="w-full pl-10 pr-3 py-2 border border-[#A7E1B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009846] text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#124734] mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-2.5 text-[#A7E1B2]"
                aria-hidden="true"
              />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-3 py-2 border border-[#A7E1B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009846] text-sm"
              />
            </div>

            <div className="text-right mt-1">
              <a
                href="#"
                className="text-xs text-[#009846] hover:underline transition"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-[#009846] border-gray-300 rounded"
            />
            <label htmlFor="remember" className="text-sm text-[#5B7065]">
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#124734] text-white py-2 rounded-lg hover:bg-[#009846] transition-all duration-300 disabled:opacity-60"
  aria-label="Log in to your ProspectEdu account"
>
  {loading ? "Logging in..." : "Log In"}
</button>


          {/* Sign Up */}
          <p className="text-sm text-center text-[#5B7065] mt-4">
            Don’t have an account?{" "}
            <Link
              to="/#dashboard"
              className="text-[#009846] font-medium hover:underline"
              onClick={() => {
                setTimeout(() => {
                  const section = document.getElementById("dashboard");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }, 300);
              }}
            >
              Sign Up
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}
