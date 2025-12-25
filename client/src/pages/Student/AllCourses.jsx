// src/pages/Student/AllCourses.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";

import EngineeringCoursesList, { engineeringCoursesData } from "../../components/Courses/EngineeringCoursesList";
import ManagementCoursesList, { managementCoursesData } from "../../components/Courses/ManagementCoursesList";
import LawCoursesList, { lawCoursesData } from "../../components/Courses/LawCoursesList";
import MedicalCoursesList, { medicalCoursesData } from "../../components/Courses/MedicalCoursesList";

export default function AllCourses() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  // ✅ NOINDEX for student dashboard pages
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
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </aside>

      {/* Main Content Area */}
      <div
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`,
        }}
      >
        {/* Topbar */}
        <header
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="All Courses" />
        </header>

        {/* Sub-header */}
        <nav
          className="sticky top-[64px] bg-[#F9FAFB] border-b border-[#E6F4EC] px-6 py-3 z-[998]"
          aria-label="Student breadcrumb and filters"
        >
          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start ">
          <p className="text-sm text-[#5B7065] mb-3">
            <span
              onClick={() => navigate("/student-dashboard")}
              className="cursor-pointer hover:text-[#009846] hover:underline"
            >
              Home
            </span>{" "}
            / <span className="text-[#124734] font-medium">All Courses</span>
          </p>
          </div>

          {/* Tabs */}
          <div
            className="flex flex-wrap gap-4 border-b border-[#E6F4EC]"
            role="tablist"
            aria-label="Course categories"
          >
            {[
              ["all", "All Courses"],
              ["engineering", "Engineering Courses"],
              ["management", "Management Courses"],
              ["law", "Law Courses"],
              ["medical", "Medical Courses"],
            ].map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                aria-current={activeTab === id ? "true" : undefined}
                onClick={() => setActiveTab(id)}
                className={`pb-2 text-sm font-medium transition ${
                  activeTab === id
                    ? "text-[#009846] border-b-2 border-[#009846]"
                    : "text-[#5B7065]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Page Body */}
        <main
          className="flex-1 overflow-y-auto px-6"
          style={{ marginTop: "80px" }}
          aria-labelledby="student-all-courses-heading"
        >
          {/* Hidden H1 for semantics */}
          <h1 id="student-all-courses-heading" className="sr-only">
            All Student Courses
          </h1>

          {activeTab === "all" && (
            <div className="space-y-10">
              <EngineeringCoursesList courses={engineeringCoursesData} />
              <ManagementCoursesList courses={managementCoursesData} />
              <LawCoursesList courses={lawCoursesData} />
              <MedicalCoursesList courses={medicalCoursesData} />
            </div>
          )}

          {activeTab === "engineering" && (
            <EngineeringCoursesList courses={engineeringCoursesData} />
          )}

          {activeTab === "management" && (
            <ManagementCoursesList courses={managementCoursesData} />
          )}

          {activeTab === "law" && (
            <LawCoursesList courses={lawCoursesData} />
          )}

          {activeTab === "medical" && (
            <MedicalCoursesList courses={medicalCoursesData} />
          )}
        </main>
      </div>
    </div>
  );
}
