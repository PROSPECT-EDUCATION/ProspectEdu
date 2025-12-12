import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import AddTeacherForm from "../../components/Admin/Teachers/AddTeacherForm";

export default function AdminAddTeacherPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
        }}
      >
        {/* Topbar */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] z-[999] flex items-center"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Add Teacher" />
        </div>

        {/* Page Content */}
        <div className="px-6 pt-[80px] pb-10 overflow-y-auto">
          <AddTeacherForm />
        </div>
      </div>
    </div>
  );
}
