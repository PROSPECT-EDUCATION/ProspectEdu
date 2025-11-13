// src/pages/Student/AllCourses.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import RefreshComponent from "../../components/RefreshComponent";

export default function AllCourses() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  // Dummy empty arrays — later replace with real courses
  const courseData = {
    all: [],
    engineering: [],
    management: [],
    law: [],
  };

  const currentList = courseData[activeTab];

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
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="All Courses" />
        </div>

        {/* Sub-header */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] z-[998] border-b border-[#E6F4EC] px-6 py-3"
          style={{ left: sidebarWidthPx }}
        >
          <div className="w-full flex flex-col items-start">
            {/* Breadcrumb */}
            <p className="text-sm text-[#5B7065] mb-3">
              <span
                className="hover:underline hover:text-[#009846] cursor-pointer"
                onClick={() => navigate("/student-dashboard")}
              >
                Home
              </span>{" "}
              / <span className="text-[#124734] font-medium">All Courses</span>
            </p>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-[#E6F4EC]">
              {[
                { id: "all", label: "All Courses" },
                { id: "engineering", label: "Engineering Courses" },
                { id: "management", label: "Management Courses" },
                { id: "law", label: "Law Courses" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`pb-2 text-sm font-medium transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "text-[#009846] border-b-2 border-[#009846]"
                      : "text-[#5B7065]"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page Body */}
        <main
          className="flex-1 overflow-y-auto px-4 md:px-6 py-8"
          style={{ marginTop: "128px", height: "calc(100vh - 128px)" }}
        >
          <div className="w-full max-w-6xl mx-auto">
            {currentList.length === 0 ? (
              <RefreshComponent message="No courses available." />
            ) : (
              <div>{/* Later: Card Grid */}</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
