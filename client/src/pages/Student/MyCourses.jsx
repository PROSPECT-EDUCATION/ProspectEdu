// src/pages/Student/MyCourses.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import RefreshComponent from "../../components/RefreshComponent";

export default function MyCourses() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  const courses = [];
  const currentList = courses; // placeholder logic

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
        className={`flex flex-col flex-1 h-screen transition-all duration-300`}
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`,
        }}
      >
        {/* Topbar */}
        <div
          className="fixed top-0 z-[999] bg-white shadow-sm h-[64px] transition-all duration-300"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="My Courses" />
        </div>

        {/* Sub-header (breadcrumb + tabs) */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] z-[998] border-b border-[#E6F4EC] py-3"
          style={{ left: sidebarWidthPx }}
        >
          <div className="w-full flex flex-col items-start pl-5">
            {/* Breadcrumb */}
            <p className="text-sm text-[#5B7065] mb-2">
              <span
                className="hover:underline hover:text-[#009846] cursor-pointer transition-colors"
                onClick={() => navigate("/student-dashboard")}
              >
                Home
              </span>{" "}
              / My Courses /{" "}
              <span className="text-[#124734] font-medium">
                {activeTab === "all"
                  ? "All"
                  : activeTab === "recent"
                  ? "Recently Added"
                  : activeTab === "ongoing"
                  ? "My Ongoing"
                  : "Expiring Soon"}
              </span>
            </p>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-[#E6F4EC]">
              <button
                className={`pb-2 text-sm font-medium transition-colors duration-300 ${
                  activeTab === "all"
                    ? "text-[#009846] border-b-2 border-[#009846]"
                    : "text-[#5B7065]"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>

              <button
                className={`pb-2 text-sm font-medium transition-colors duration-300 ${
                  activeTab === "recent"
                    ? "text-[#009846] border-b-2 border-[#009846]"
                    : "text-[#5B7065]"
                }`}
                onClick={() => setActiveTab("recent")}
              >
                Recently Added
              </button>

              <button
                className={`pb-2 text-sm font-medium transition-colors duration-300 ${
                  activeTab === "ongoing"
                    ? "text-[#009846] border-b-2 border-[#009846]"
                    : "text-[#5B7065]"
                }`}
                onClick={() => setActiveTab("ongoing")}
              >
                My Ongoing
              </button>

              <button
                className={`pb-2 text-sm font-medium transition-colors duration-300 ${
                  activeTab === "expiring"
                    ? "text-[#009846] border-b-2 border-[#009846]"
                    : "text-[#5B7065]"
                }`}
                onClick={() => setActiveTab("expiring")}
              >
                Expiring Soon
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <main
          className="flex-1 overflow-y-auto px-4 md:px-6 py-8"
          style={{
            marginTop: "128px",
            height: "calc(100vh - 128px)",
          }}
        >
          <div className="w-full max-w-6xl mx-auto">
            {currentList.length === 0 ? (
              <RefreshComponent message="You haven't purchased any courses!" />
            ) : (
              <div>{/* Course cards go here later */}</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
