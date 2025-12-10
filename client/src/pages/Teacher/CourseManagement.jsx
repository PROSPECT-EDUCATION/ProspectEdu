import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";

import CourseOverviewTab from "../../components/Teacher/CourseManagementPage/CourseOverviewTab";

import Modules from "../../components/Teacher/Modules";
import AssessmentDashboard from "../../components/Teacher/Assessments/AssessmentDashboard";
import StudentsPage from "../../components/Teacher/StudentsPage";
import CourseSettingsPage from "../../components/Teacher/CourseSettingsPage";

export default function CourseManagementPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [course, setCourse] = useState(null);

  const sidebarWidth = isCollapsed ? 80 : 256;

  // ✅ Load course from localStorage
  useEffect(() => {
    const allCourses = JSON.parse(localStorage.getItem("teacherCourses") || "[]");

    const idx = parseInt(courseId, 10);

    if (Number.isInteger(idx) && allCourses[idx]) {
      setCourse(allCourses[idx]);
    } else {
      setCourse(null);
    }
  }, [courseId]);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div className={`${isCollapsed ? "w-20" : "w-64"} fixed left-0 h-full transition-all`}>
        <TeacherSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col flex-1" style={{ marginLeft: sidebarWidth }}>

        <TeacherTopbar pageTitle="Course Management" />

        <div className="px-8 pt-[10px] pb-10 overflow-y-auto">

          {/* BREADCRUMB */}
          <p className="text-sm text-[#5B7065] mb-3">
            <span
              className="hover:text-[#009846] cursor-pointer hover:underline"
              onClick={() => navigate("/teacher-dashboard")}
            >
              Dashboard
            </span>{" "}
            /{" "}
            <span
              className="hover:text-[#009846] cursor-pointer hover:underline"
              onClick={() => navigate("/teacher/courses")}
            >
              Courses
            </span>{" "}
            /{" "}
            <span className="text-[#124734] font-medium">
              {course?.title || "Untitled Course"}
            </span>
          </p>

          {/* HEADER TITLE */}
          <h2 className="text-2xl font-semibold text-[#124734] mb-5">
            Managing Course: {course?.title || "Untitled"}
          </h2>

          {/* TABS */}
          <div className="flex gap-6 border-b pb-2 mb-6 text-[#124734] font-medium">
            <button onClick={() => setActiveTab("overview")} className={`${activeTab === "overview" && "border-b-2 border-[#009846]"}`}>Overview</button>
            <button onClick={() => setActiveTab("modules")} className={`${activeTab === "modules" && "border-b-2 border-[#009846]"}`}>Modules</button>
            <button onClick={() => setActiveTab("assessments")} className={`${activeTab === "assessments" && "border-b-2 border-[#009846]"}`}>Assessments</button>
            <button onClick={() => setActiveTab("students")} className={`${activeTab === "students" && "border-b-2 border-[#009846]"}`}>Students</button>
            <button onClick={() => setActiveTab("settings")} className={`${activeTab === "settings" && "border-b-2 border-[#009846]"}`}>Settings</button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === "overview" && <CourseOverviewTab />}
          {activeTab === "modules" && <Modules />}
          {activeTab === "assessments" && <AssessmentDashboard />}
          {activeTab === "students" && <StudentsPage />} 
          {activeTab === "settings" && <CourseSettingsPage />}
        </div>
      </div>
    </div>
  );
}

