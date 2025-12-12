import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";
import CourseBasicForm from "../../components/Teacher/CourseBasicForm";
import { useState } from "react";

export default function CreateCourse() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  const handleFormSubmit = (data) => {
    console.log("Course Basic Data:", data);

  };

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-full transition-all`}
      >
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* CONTENT */}
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: sidebarWidthPx }}
      >
        <TeacherTopbar pageTitle="Create Course" />

        <div className="px-8 pt-[90px] pb-10">
          <CourseBasicForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}
