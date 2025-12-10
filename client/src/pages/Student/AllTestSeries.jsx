// src/pages/Student/AllTestSeries.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import RefreshComponent from "../../components/RefreshComponent";

export default function AllTestSeries() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  const tabs = [
    { key: "all", label: "All Test Series" },
    { key: "online", label: "Online Test Series" },
    { key: "both", label: "Online + Offline Test Series" },
    { key: "offline", label: "Offline Test Series" },
  ];

  // No test series yet → always empty
  const testSeriesList = [];

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
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
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`,
        }}
      >
        {/* Topbar */}
        <div
          className="fixed top-0 z-[999] bg-white shadow-sm h-[64px]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="Test Series" />
        </div>

        {/* Breadcrumb + Tabs */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] z-[998] border-b border-[#E6F4EC] py-3"
          style={{ left: sidebarWidthPx }}
        >
             <div className="w-full flex flex-col items-start pl-5">
          {/* Breadcrumb */}
          <p className="text-sm text-[#5B7065] mb-2">
            <span
              className="hover:underline hover:text-[#009846] cursor-pointer"
              onClick={() => navigate("/student-dashboard")}
            >
              Home
            </span>{" "}
            /{" "}
            <span className="hover:underline hover:text-[#009846] cursor-pointer"
              onClick={() => navigate("/student/all-test-series")}
            >
              Recommended Test Series
            </span>{" "}
            /{" "}
            <span className="text-[#124734] font-medium">
              All Test Series
            </span>
          </p>

          {/* Tabs */}
         {/* Tabs */}
<div className="flex flex-wrap gap-2 w-full">
  {tabs.map((tab) => (
    <button
      key={tab.key}
      onClick={() => setActiveTab(tab.key)}
      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
        activeTab === tab.key
          ? "bg-[#009846] text-white shadow"
          : "bg-white text-[#124734] border border-[#CDE8D5] hover:bg-[#E6F4EC]"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>

        </div>
</div>
        {/* Page Body */}
        <main
          className="flex-1 overflow-y-auto px-6 py-8"
          style={{ marginTop: "128px" }}
        >
          <div className="w-full max-w-6xl mx-auto">
            <RefreshComponent message="No test series available." />
          </div>
        </main>
      </div>
    </div>
  );
}
