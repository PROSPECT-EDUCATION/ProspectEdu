import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import React, { useState } from "react";

export default function AdminDashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`${isCollapsed ? "w-20" : "w-64"} fixed top-0 left-0 h-full z-40 transition-all duration-300`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* RIGHT MAIN AREA */}
      <div
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`
        }}
      >
        {/* TOPBAR */}
     <div
  className="fixed top-0 bg-white shadow-sm h-[64px] z-[999] transition-all duration-300"
  style={{
    left: sidebarWidthPx,
    right: 0
  }}
>
  <AdminTopbar pageTitle="Dashboard" />
</div>


        {/* MAIN CONTENT */}
        <div className="px-6 pt-[80px] pb-10 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        </div>
      </div>
    </div>
  );
}