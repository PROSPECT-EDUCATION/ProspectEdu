import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SupplierSidebar from "../../../components/SupplierEcommerce/Sidebar";
import SupplierTopbar from "../../../components/SupplierEcommerce/Topbar";
import { api } from "../../../lib/api";
import { FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    newP: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const validate = () => {
    if (!form.oldPassword.trim()) return "Old password is required";
    if (!form.newPassword.trim()) return "New password is required";
    if (form.newPassword.length < 6) return "New password must be at least 6 characters";
    if (form.newPassword !== form.confirmPassword) return "Confirm password does not match";
    if (form.oldPassword === form.newPassword) return "New password must be different from old password";
    return "";
  };

  const strengthLabel = (() => {
    const p = form.newPassword || "";
    const score =
      (p.length >= 8 ? 1 : 0) +
      (/[A-Z]/.test(p) ? 1 : 0) +
      (/[0-9]/.test(p) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(p) ? 1 : 0);

    if (!p) return { text: "—", hint: "Start typing a new password" };
    if (score <= 1) return { text: "Weak", hint: "Add length + numbers/symbols" };
    if (score === 2) return { text: "Okay", hint: "Add uppercase or symbol" };
    if (score === 3) return { text: "Strong", hint: "Nice! Almost perfect" };
    return { text: "Very Strong", hint: "Great password ✅" };
  })();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const msg = validate();
    if (msg) return setError(msg);

    setLoading(true);
    try {
      // ✅ backend route: PATCH /api/v1/auth/change-password
      await api.patch("/auth/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      setSuccess("Password changed successfully ✅ Redirecting...");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });

      // ✅ after success go back to supplier page
      setTimeout(() => {
        navigate("/supplier");
      }, 1200);
    } catch (e2) {
      setError(e2?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen text-left">
      <SupplierSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 
          ${isCollapsed ? "ml-20" : "ml-64"} 
          md:ml-0
        `}
      >
        <SupplierTopbar pageTitle="Change Password" />

        <div className="p-4 md:p-8 w-full">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-[#A7E1B2]/30 rounded-2xl shadow-md overflow-hidden">
              {/* Header Banner */}
              <div className="px-6 md:px-8 py-6 bg-gradient-to-r from-[#A7E1B2] to-[#A7E1B2]/40 border-b border-[#A7E1B2]/40">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white shadow flex items-center justify-center">
                    <FiShield className="text-[#124734]" size={20} />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#124734]">
                      Update Your Password
                    </h1>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                      For your security, your old password must be correct.
                    </p>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="px-6 md:px-8 pt-6">
                {error ? (
                  <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                    {error}
                  </div>
                ) : null}

                {success ? (
                  <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800">
                    {success}
                  </div>
                ) : null}
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="px-6 md:px-8 pb-8 space-y-6">
                {/* Old Password */}
                <div>
                  <label className="text-sm font-semibold text-[#124734]">
                    Old Password
                  </label>
                  <div className="mt-2 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <FiLock />
                    </span>
                    <input
                      type={show.old ? "text" : "password"}
                      value={form.oldPassword}
                      onChange={(e) => update("oldPassword", e.target.value)}
                      placeholder="Enter your current password"
                      className="w-full border rounded-xl pl-11 pr-12 py-3 outline-none focus:ring-2 focus:ring-[#124734]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((p) => ({ ...p, old: !p.old }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100"
                      aria-label="Toggle old password visibility"
                    >
                      {show.old ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-sm font-semibold text-[#124734]">
                    New Password
                  </label>
                  <div className="mt-2 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <FiLock />
                    </span>
                    <input
                      type={show.newP ? "text" : "password"}
                      value={form.newPassword}
                      onChange={(e) => update("newPassword", e.target.value)}
                      placeholder="Create a new password"
                      className="w-full border rounded-xl pl-11 pr-12 py-3 outline-none focus:ring-2 focus:ring-[#124734]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((p) => ({ ...p, newP: !p.newP }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100"
                      aria-label="Toggle new password visibility"
                    >
                      {show.newP ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>

                  {/* Strength */}
                  <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#124734]">
                        Strength:
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[#A7E1B2]/30 text-[#124734] font-bold">
                        {strengthLabel.text}
                      </span>
                    </div>
                    
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-semibold text-[#124734]">
                    Confirm New Password
                  </label>
                  <div className="mt-2 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <FiLock />
                    </span>
                    <input
                      type={show.confirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      placeholder="Re-enter the new password"
                      className="w-full border rounded-xl pl-11 pr-12 py-3 outline-none focus:ring-2 focus:ring-[#124734]/30"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShow((p) => ({ ...p, confirm: !p.confirm }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100"
                      aria-label="Toggle confirm password visibility"
                    >
                      {show.confirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-[#124734] text-white font-bold hover:opacity-90 disabled:opacity-60"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/supplier")}
                    className="px-6 py-3 rounded-xl border border-[#124734] text-[#124734] font-bold hover:bg-[#124734]/10"
                  >
                    Cancel
                  </button>
                </div>

               
              </form>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
