import React, { useState, useEffect } from "react";
import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";
import CourseCard from "../../components/Teacher/CourseCard";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import courseImg from "../../assets/course.webp";

export default function TeacherCoursesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  // Load courses from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("teacherCourses"));

    if (saved && saved.length > 0) {
      setCourses(saved);
    } else {
      // fallback sample data (for testing)
      const sampleCourses = [
  {
    title: "Data Structures",
    students: 45,
    progress: 80,
    description: "Learn Data Structures from basics to advanced",
    category: "IT",
    level: "Beginner",
    duration: "40",
    thumbnail: courseImg,
  },
  {
    title: "DBMS",
    students: 32,
    progress: 65,
    description: "Master Database Management Systems",
    category: "IT",
    level: "Intermediate",
    duration: "35",
    thumbnail: courseImg,
  },
  {
    title: "Operating Systems",
    students: 25,
    progress: 50,
    description: "Core concepts of OS and system design",
    category: "IT",
    level: "Beginner",
    duration: "30",
    thumbnail: courseImg,
  },
];


      localStorage.setItem("teacherCourses", JSON.stringify(sampleCourses));
      setCourses(sampleCourses);
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-full z-40 transition-all`}
      >
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* RIGHT AREA */}
      <div
        className="flex flex-col flex-1 transition-all"
        style={{ marginLeft: sidebarWidthPx }}
      >
        {/* Topbar */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] z-[999]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <TeacherTopbar pageTitle="My Courses" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[80px] pb-10 overflow-y-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-[#5B7065]">
                <span
                  className="hover:text-[#009846] cursor-pointer hover:underline"
                  onClick={() => navigate("/teacher-dashboard")}
                >
                  Dashboard
                </span>{" "}
                / Courses
              </p>

              <h2 className="text-2xl font-semibold text-[#124734]">
                My Courses
              </h2>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} index={index} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
