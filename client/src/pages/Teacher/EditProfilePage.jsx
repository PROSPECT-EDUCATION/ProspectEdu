// src/pages/Teacher/EditProfilePage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";
import TeacherEditProfileForm from "../../components/Teacher/EditProfile/TeacherEditProfileForm";

export default function EditProfilePage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Content Area */}
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: sidebarWidth }}
      >

        {/* Topbar */}
        <div
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <TeacherTopbar
            isCollapsed={isCollapsed}
            pageTitle="Edit Profile"
          />
        </div>

        {/* Breadcrumb */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] z-[998] border-b border-[#E6F4EC] px-6 py-3"
          style={{ left: sidebarWidth }}
        >
          <p className="text-sm text-[#5B7065]">
            <span
              className="hover:underline hover:text-[#009846] cursor-pointer"
              onClick={() => navigate("/teacher-dashboard")}
            >
              Home
            </span>{" "}
            / <span className="text-[#124734] font-medium">Edit Profile</span>
          </p>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <TeacherEditProfileForm />
          </div>
        </main>
      </div>
    </div>
  );
}
