import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import CoursesList from "../../components/Admin/Courses/CoursesList";
import { useNavigate } from "react-router-dom";

export default function AdminCoursesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth, width: `calc(100vw - ${sidebarWidth}px)` }}
      >
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="All Courses" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">

          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start ">
          <div className="text-gray-600 text-sm mb-6">
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </span>
            {" / "}
            <span className="text-[#124734] font-semibold">Courses</span>
          </div>
</div>
          {/* COURSES LIST COMPONENT */}
          <CoursesList />
        </div>
      </div>
    </div>
  );
}
