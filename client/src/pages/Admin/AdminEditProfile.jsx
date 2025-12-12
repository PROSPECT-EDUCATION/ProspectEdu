// src/pages/Admin/EditProfile.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import { useToast } from "../../context/ToastContext";

export default function AdminEditProfile() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
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
          <AdminTopbar isCollapsed={isCollapsed} pageTitle="Admin Profile" />
        </div>

        {/* Subheader */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] border-b border-[#E6F4EC] px-4 py-2 z-[998]"
          style={{ left: sidebarWidth }}
        >
          <div className="w-full flex flex-col items-start">
            {/* Breadcrumb */}
            <p className="text-sm text-[#5B7065] mb-2">
              <span
                className="cursor-pointer hover:text-[#009846] hover:underline"
                onClick={() => navigate("/admin-dashboard")}
              >
                Home
              </span>{" "}
              / Admin Profile /{" "}
              <span className="text-[#124734] font-medium">
                {activeTab === "basic"
                  ? "Basic Details"
                  : "Additional Details"}
              </span>
            </p>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-[#E6F4EC]">
              <button
                onClick={() => setActiveTab("basic")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "basic"
                    ? "text-[#009846] border-b-2 border-[#009846]"
                    : "text-[#5B7065]"
                }`}
              >
                Basic Details
              </button>

              <button
                onClick={() => setActiveTab("additional")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "additional"
                    ? "text-[#009846] border-b-2 border-[#009846]"
                    : "text-[#5B7065]"
                }`}
              >
                Additional Details
              </button>
            </div>
          </div>
        </div>

        {/* Main Form Area */}
        <main
          className="flex-1 overflow-y-auto px-1 py-0"
          style={{ marginTop: "80px" }}
        >
          {/* BASIC DETAILS TAB */}
          {activeTab === "basic" && (
            <div className="max-w-3xl bg-white p-5 rounded-xl shadow-sm border border-[#E6F4EC] ml-4">
              <h2 className="text-2xl font-heading text-[#124734] mb-2">
                Basic Details
              </h2>
              <p className="text-sm text-[#5B7065] mb-6">
                Update admin profile details
              </p>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">
                    * Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">
                    * Gender
                  </label>
                  <select className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none">
                    <option>Select Gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">
                    * Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 bg-[#F3F3F3]"
                    readOnly
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">
                    * Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">
                    * Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                  />
                </div>

                {/* Update Button */}
                <button
  onClick={() => showToast("Basic details updated successfully!", "success")}
  className="mt-8 px-6 py-3 bg-[#009846] text-white rounded-md shadow-sm hover:bg-[#007d39] transition text-sm font-medium"
>
  Update Basic Details
</button>

              </div>
            </div>
          )}

          {/* ADDITIONAL DETAILS TAB */}
          {activeTab === "additional" && (
            <div className="max-w-4xl bg-white p-5 rounded-xl shadow-sm border border-[#E6F4EC] ml-4">
              <h2 className="text-2xl font-heading text-[#124734] mb-3">
                Additional Details
              </h2>

              <p className="text-sm text-[#5B7065] mb-6">
                Fill out more information about the admin
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1 text-[#124734]">
                    * Full Address
                  </label>
                  <textarea
                    rows="3"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                    placeholder="Enter full address"
                  ></textarea>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">
                    * State
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">
                    * City
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">
                    * Pincode
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                  />
                </div>
              </div>

              {/* Update Button */}
             <button
  onClick={() => showToast("Additional details updated successfully!", "success")}
  className="mt-8 px-6 py-3 bg-[#009846] text-white rounded-md shadow-sm hover:bg-[#007d39] transition text-sm font-medium"
>
  Update Additional Details
</button>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
