import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import CourseDetail from "../../components/Admin/Courses/CourseDetail";

export default function AdminCourseDetailPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
 const { courseId } = useParams();
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex bg-[#F9FAFB] h-screen overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full transition-all ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN */}
      <div
        className="flex-1 flex flex-col transition-all"
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`
        }}
      >
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Course Details" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start ">
          <div className="text-gray-600 text-sm mb-4">
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </span>
            {" / "}
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin/courses")}
            >
              Courses
            </span>
            {" / "}
            <span className="text-[#124734] font-semibold">Course Details</span>
          
          </div>
</div>
          {/* MAIN CONTENT COMPONENT */}
         <CourseDetail courseId={courseId} />
        </div>
      </div>
    </div>
  );
}
