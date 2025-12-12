import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import EnrollForm from "../../components/Admin/Courses/Enroll/EnrollForm";
import EnrollTable from "../../components/Admin/Courses/Enroll/EnrollTable";
import { useNavigate } from "react-router-dom";

export default function EnrollStudentsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 
        ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth, width: `calc(100vw - ${sidebarWidth}px)` }}
      >
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Course Enrollment" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">

          {/* BREADCRUMB */}
          <div className="text-gray-600 text-sm mb-4">
            <span className="cursor-pointer" onClick={() => navigate("/admin-dashboard")}>
              Dashboard
            </span>
            {" / "}
            <span className="cursor-pointer" onClick={() => navigate("/admin/courses")}>
              Courses
            </span>
            {" / "}
            <span className="font-semibold text-[#124734]">Enroll Students</span>
          </div>

          {/* FORM + TABLE */}
          <EnrollForm />
          <EnrollTable />

        </div>
      </div>
    </div>
  );
}
