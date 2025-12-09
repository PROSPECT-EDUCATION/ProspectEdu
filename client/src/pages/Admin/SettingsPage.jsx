// src/pages/Admin/SettingsPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import AdminManagement from "../../components/Admin/Settings/AdminManagement"; 
import { useToast } from "../../context/ToastContext";

export default function SettingsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#124734] transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >

        {/* Topbar */}
        <div
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar isCollapsed={isCollapsed} pageTitle="Settings" />
        </div>

        {/* Subheader */}
       
        <div
          className="sticky top-[64px] bg-[#F9FAFB] border-b border-[#E6F4EC] px-6 py-3 z-[998]"
          style={{ left: sidebarWidth }}
        >
             <div className="w-full flex flex-col items-start ">
          <p className="text-sm text-[#5B7065] mb-1">
            <span
              className="cursor-pointer hover:text-[#009846] hover:underline"
              onClick={() => navigate("/admin-dashboard")}
            >
              Home
            </span>{" "}
            / <span className="text-[#124734] font-medium">Settings</span>
          </p>
        </div>
</div>
        {/* BODY */}
        <main
          className="flex-1 overflow-y-auto px-6 py-6"
          style={{ marginTop: "70px" }}
        >

          {/* ⭐ SECTION 1 — MY PROFILE CARD */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-[#E6F4EC] mb-6 max-w-3xl">
            <h2 className="text-xl font-heading text-[#124734] mb-3">My Profile</h2>

            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Name:</span> Pratima Singh</p>
              <p><span className="font-medium">Email:</span> pratima.admin@example.com</p>
              <p><span className="font-medium">Phone:</span> +91 98765 43210</p>
              <p><span className="font-medium">Role:</span> Admin</p>
            </div>

            <button
              onClick={() => navigate("/admin/edit-profile")}
              className="mt-4 px-5 py-2 bg-[#009846] text-white rounded-lg hover:bg-[#007d39] transition text-sm"
            >
              Edit Profile
            </button>
          </div>

          {/* ⭐ SECTION 2 — ORGANISATION SETTINGS */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-[#E6F4EC] mb-6 max-w-3xl">
            <h2 className="text-xl font-heading text-[#124734] mb-3">Organisation Settings</h2>

            <div className="space-y-4">
              {/* Organisation Name */}
              <div>
                <label className="block text-sm text-[#124734] mb-1">Institute Name</label>
                <input
                  type="text"
                  className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                  defaultValue="Prospect Institute"
                />
              </div>

              {/* Support Email */}
              <div>
                <label className="block text-sm text-[#124734] mb-1">Support Email</label>
                <input
                  type="email"
                  className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                  defaultValue="support@prospectedu.com"
                />
              </div>
            </div>

            <button
              onClick={() => showToast("Organisation settings updated!", "success")}
              className="mt-5 px-5 py-2 bg-[#009846] text-white rounded-lg hover:bg-[#007d39] transition text-sm"
            >
              Save Changes
            </button>
          </div>

          {/* ⭐ SECTION 3 — CHANGE PASSWORD SHORTCUT */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-[#E6F4EC] mb-6 max-w-3xl">
            <h2 className="text-xl font-heading text-[#124734] mb-3">Security</h2>

            <button
              onClick={() => navigate("/admin/change-password")}
              className="px-5 py-2 bg-[#009846] text-white rounded-lg hover:bg-[#007d39] transition text-sm"
            >
              Change Password
            </button>
          </div>

          {/* ⭐ SECTION 4 — ADMIN MANAGEMENT */}
          <AdminManagement />

        </main>
      </div>
    </div>
  );
} 
