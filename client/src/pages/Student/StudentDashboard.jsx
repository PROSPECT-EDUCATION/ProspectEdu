// src/pages/Student/StudentDashboard.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import RecentActivity from "../../components/Student/RecentActivity";
import BannerCarousel from "../../components/Student/BannerCarousel";
import DashboardStats from "../../components/Student/DashboardStats";
import DashboardCharts from "../../components/Student/DashboardCharts";

export default function StudentDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar (fixed) */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-full z-40 transition-all duration-300`}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Section */}
      <div
        className={`flex flex-col flex-1 h-screen transition-all duration-300`}
        style={{
          marginLeft: isCollapsed ? 80 : 256,
          width: `calc(100vw - ${isCollapsed ? 80 : 256}px)`, // ✅ keeps total width = viewport width
        }}
      >
        {/* Fixed Topbar */}
        <div
          className="fixed top-0 z-[999] bg-white shadow-sm h-[64px] transition-all duration-300"
          style={{
            left: sidebarWidthPx,
            right: 0,
          }}
        >
          <StudentTopbar isCollapsed={isCollapsed} />
        </div>

        {/* Body (below topbar) */}
        <div
          className="flex flex-1 overflow-hidden"
          style={{
            marginTop: "64px",
            height: "calc(100vh - 64px)",
          }}
        >
          {/* Center Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 py-4">
            {/* Banner */}
            <div className="mb-6 max-w-5xl mx-auto">
              <BannerCarousel />
            </div>
            <div className="mb-6">
  <DashboardStats />
</div>
<div className="mb-8">
  <DashboardCharts />
</div>

            {/* Dynamic Page Content */}
            <div className="max-w-5xl mx-auto">
              <Outlet />
            </div>
          </main>

          {/* Right Panel - Recent Activity */}
          <aside className="hidden lg:flex flex-col w-80 border-l border-[#E6F4EC] bg-white shadow-sm overflow-y-auto shrink-0">
            <div className="p-4">
              <RecentActivity />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

