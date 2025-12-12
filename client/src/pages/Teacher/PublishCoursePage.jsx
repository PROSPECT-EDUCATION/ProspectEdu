import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";
import PublishCourseReview from "../../components/Teacher/PublishCourseReview";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PublishCoursePage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  // Dynamic data coming from AddModulesPage
  const courseData = location.state?.courseData || {};
  const modules = location.state?.modules || [];

  const handlePublish = (settings) => {
    const newCourse = {
      ...courseData,
      modules,
      settings,
      createdAt: new Date(),
    };

    // Store in localStorage (temp backend)
    const existing = JSON.parse(localStorage.getItem("teacherCourses") || "[]");
    existing.push(newCourse);
    localStorage.setItem("teacherCourses", JSON.stringify(existing));

    alert("Course Published!");
    navigate("/teacher/courses");
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      <div className={`${isCollapsed ? "w-20" : "w-64"} fixed top-0 left-0 h-full`}>
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      <div className="flex flex-col flex-1" style={{ marginLeft: sidebarWidthPx }}>
        <TeacherTopbar pageTitle="Publish Course" />

        <div className="px-8 pt-[90px] pb-12 overflow-y-auto">
          <PublishCourseReview
            courseData={courseData}
            modules={modules}
            defaultSettings={{ live: true, doubts: true }}
            onPublish={handlePublish}
            onBack={() =>
              navigate("/teacher/add-modules", {
                state: { courseData },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
