// src/pages/Student/StudentDashboard.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import RecentActivity from "../../components/Student/RecentActivity";
import BannerCarousel from "../../components/Student/BannerCarousel";
import DashboardStats from "../../components/Student/DashboardStats";
import DashboardCharts from "../../components/Student/DashboardCharts";

export default function StudentDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  // ✅ SEO: prevent indexing (private page)
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);

    return () => document.head.removeChild(meta);
  }, []);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-full z-40 transition-all duration-300`}
        aria-label="Student navigation sidebar"
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </aside>

      {/* Main Section */}
      <div
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: isCollapsed ? 80 : 256,
          width: `calc(100vw - ${isCollapsed ? 80 : 256}px)`,
        }}
      >
        {/* Topbar */}
        <header
          className="fixed top-0 z-[999] bg-white shadow-sm h-[64px]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <StudentTopbar isCollapsed={isCollapsed} />
        </header>

        {/* Body */}
        <div
          className="flex flex-1 overflow-hidden"
          style={{
            marginTop: "64px",
            height: "calc(100vh - 64px)",
          }}
        >
          {/* Main Content */}
          <main
            className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 py-4"
            aria-labelledby="student-dashboard-heading"
          >
            {/* Hidden semantic heading */}
            <h1 id="student-dashboard-heading" className="sr-only">
              Student Dashboard
            </h1>

            <div className="mb-6 max-w-5xl mx-auto">
              <BannerCarousel />
            </div>

            <div className="mb-6">
              <DashboardStats />
            </div>

            <div className="mb-8">
              <DashboardCharts />
            </div>

            <div className="max-w-5xl mx-auto">
              <Outlet />
            </div>

            {/* Mobile Recent Activity */}
            <div className="lg:hidden w-full mt-6">
              <RecentActivity />
            </div>
          </main>

          {/* Desktop Right Panel */}
          <aside
            className="hidden lg:flex flex-col w-80 border-l border-[#E6F4EC] bg-white shadow-sm overflow-y-auto shrink-0"
            aria-label="Recent student activity"
          >
            <div className="p-4">
              <RecentActivity />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
