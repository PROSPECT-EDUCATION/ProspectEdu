import React, { useState, useEffect } from "react";
import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";
import CourseCard from "../../components/Teacher/CourseCard";
import { useNavigate } from "react-router-dom";
import { coursesApi } from "../../services/courses";

export default function TeacherCoursesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const sidebarWidthPx = isCollapsed ? 80 : 256;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await coursesApi.teacherMyCourses();
        setCourses(res.data.courses || []);
      } catch (err) {
        console.log(err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* SIDEBAR */}
      <div className={`${isCollapsed ? "w-20" : "w-64"} fixed top-0 left-0 h-full z-40 transition-all`}>
        <TeacherSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* RIGHT AREA */}
      <div className="flex flex-col flex-1 transition-all" style={{ marginLeft: sidebarWidthPx }}>
        {/* Topbar */}
        <div className="fixed top-0 bg-white shadow-sm h-[64px] z-[999]" style={{ left: sidebarWidthPx, right: 0 }}>
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

              <h2 className="text-2xl font-semibold text-[#124734]">My Courses</h2>
            </div>

            
          </div>

          {/* Loading / Empty / Grid */}
          {loading ? (
            <div className="text-[#5B7065]">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="text-[#5B7065]">No courses assigned to you yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} id={course._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
