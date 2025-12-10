// src/pages/Student/AllCourses.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";

import EngineeringCoursesList, { engineeringCoursesData } from "../../components/Courses/EngineeringCoursesList";
import ManagementCoursesList, { managementCoursesData } from "../../components/Courses/ManagementCoursesList";
import LawCoursesList, { lawCoursesData } from "../../components/Courses/LawCoursesList";
import MedicalCoursesList, {medicalCoursesData} from "../../components/Courses/MedicalCoursesList";

export default function AllCourses() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Content Area */}
      <div
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`,
        }}
      >
        {/* Topbar */}
        <div
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="All Courses" />
        </div>

        {/* Sub-header */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] border-b border-[#E6F4EC] px-6 py-3 z-[998]"
          style={{ left: sidebarWidthPx }}
        >
          <div className="w-full flex flex-col items-start">
            {/* Breadcrumb */}
            <p className="text-sm text-[#5B7065] mb-3">
              <span
                onClick={() => navigate("/student-dashboard")}
                className="cursor-pointer hover:text-[#009846] hover:underline"
              >
                Home
              </span>{" "}
              / <span className="text-[#124734] font-medium">All Courses</span>
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap gap-4 border-b border-[#E6F4EC] w-full">
  {[
    ["all", "All Courses"],
    ["engineering", "Engineering Courses"],
    ["management", "Management Courses"],
    ["law", "Law Courses"],
    ["medical", "Medical Courses"]
  ].map(([id, label]) => (
    <button
      key={id}
      onClick={() => setActiveTab(id)}
      className={`pb-2 text-sm font-medium whitespace-nowrap transition ${
        activeTab === id
          ? "text-[#009846] border-b-2 border-[#009846]"
          : "text-[#5B7065]"
      }`}
    >
      {label}
    </button>
  ))}
</div>

          </div>
        </div>

        {/* Page Body */}
        <main
          className="flex-1 overflow-y-auto px-6 py-0"
          style={{ marginTop: "80px" }}
        >
          {/* ALL COURSES */}
          {activeTab === "all" && (
            <div className="space-y-10">
              <EngineeringCoursesList courses={engineeringCoursesData} />
              <ManagementCoursesList courses={managementCoursesData} />
              <LawCoursesList courses={lawCoursesData} />
            </div>
          )}

          {/* Engineering Only */}
          {activeTab === "engineering" && (
            <EngineeringCoursesList courses={engineeringCoursesData} />
          )}

          {/* Management Only */}
          {activeTab === "management" && (
            <ManagementCoursesList courses={managementCoursesData} />
          )}

          {/* Law Only */}
          {activeTab === "law" && (
            <LawCoursesList courses={lawCoursesData} />
          )}
          {activeTab==="medical" && (
            <MedicalCoursesList courses={medicalCoursesData}/>
          )

          }
        </main>
      </div>
    </div>
  );
}
