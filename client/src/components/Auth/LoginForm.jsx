import { useState } from "react";
import { Phone, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ phone: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login submitted (backend to be added later)");
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#124734] mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone
              size={18}
              className="absolute left-3 top-2.5 text-[#A7E1B2]"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full pl-10 pr-3 py-2 border border-[#A7E1B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009846] text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[#124734] mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-2.5 text-[#A7E1B2]"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
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
          className="w-full bg-[#124734] text-white py-2 rounded-lg hover:bg-[#009846] transition-all duration-300"
        >
          Log In
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

      </form>
    </div>
  );
}
