import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "../../context/ToastContext";   // ✅ added

export default function ChangePasswordForm() {
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const { showToast } = useToast();   // ✅ added toast hook

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const toggle = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleChange = (field, value) =>
    setPasswords((p) => ({ ...p, [field]: value }));

  const handleSubmit = () => {
    if (!passwords.old || !passwords.new || !passwords.confirm) {
      showToast("Please fill all fields", "error");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      showToast("New passwords do not match", "error");
      return;
    }

    if (passwords.new.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    showToast("Password updated successfully!", "success");

    // reset fields after success
    setPasswords({ old: "", new: "", confirm: "" });
  };

  return (
    <div className="max-w-3xl bg-white p-8 rounded-xl shadow-sm border border-[#E6F4EC]">
      <h2 className="text-2xl font-heading text-[#124734] mb-2">
        Change Password
      </h2>
      <p className="text-sm text-[#5B7065] mb-6">
        Edit your Password Details
      </p>

      <div className="space-y-6">

        <div>
          <label className="block text-sm mb-1 text-[#124734]">* Old Password</label>
          <div className="relative">
            <input
              type={show.old ? "text" : "password"}
              placeholder="Please enter your old password"
              value={passwords.old}
              onChange={(e) => handleChange("old", e.target.value)}
              className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-[#5B7065]"
              onClick={() => toggle("old")}
            >
              {show.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 text-[#124734]">* New Password</label>
          <div className="relative">
            <input
              type={show.new ? "text" : "password"}
              placeholder="Please enter your new password"
              value={passwords.new}
              onChange={(e) => handleChange("new", e.target.value)}
              className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-[#5B7065]"
              onClick={() => toggle("new")}
            >
              {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 text-[#124734]">* Confirm New Password</label>
          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              placeholder="Please enter your new password again"
              value={passwords.confirm}
              onChange={(e) => handleChange("confirm", e.target.value)}
              className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-[#5B7065]"
              onClick={() => toggle("confirm")}
            >
              {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 px-6 py-3 bg-[#009846] text-white rounded-md shadow-sm hover:bg-[#007d39] transition text-sm font-medium"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
