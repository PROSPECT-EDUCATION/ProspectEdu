// src/pages/Admin/AdminAddStudentPage.jsx

import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import AddStudent from "../../components/Admin/Students/AddStudent";
import { useNavigate } from "react-router-dom";

export default function AdminAddStudentPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
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
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
        }}
      >
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Add Student" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">

          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start ">
          <div className="text-gray-600 text-sm mb-4">
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </span>
            {" / "}
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin/students")}
            >
              Students
            </span>
            {" / "}
            <span className="text-[#124734] font-semibold">Add Student</span>
          </div>
          </div>

          {/* Form Component */}
          <AddStudent />
        </div>
      </div>
    </div>
  );
}
