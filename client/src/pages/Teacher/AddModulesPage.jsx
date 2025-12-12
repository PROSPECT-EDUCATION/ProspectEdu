import React, { useState } from "react";
import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";
import AddModulesForm from "../../components/Teacher/AddModulesForm";
import { useNavigate } from "react-router-dom";

export default function AddModulesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  // When the user finishes Step 2
  const handleSaveModules = (modules) => {
    console.log("Modules Data:", modules);
    navigate("/teacher/publish-course");
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-full z-40 transition-all duration-300`}
      >
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* RIGHT MAIN AREA */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`
        }}
      >
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] z-[999]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <TeacherTopbar pageTitle="Add Modules" isCollapsed={isCollapsed} />
        </div>

        {/* PAGE CONTENT */}
        <div className="px-8 pt-[90px] pb-12 overflow-y-auto">

        <div className="w-full text-left mb-6">

  {/* Breadcrumb */}
  <p className="text-sm text-[#5B7065] mb-2">
    <span
      className="cursor-pointer hover:text-[#009846]"
      onClick={() => navigate("/teacher/create-course")}
    >
      Create Course
    </span>{" "}
    / Add Modules
  </p>

  {/* Title */}
</div>

          {/* FORM COMPONENT */}
          <AddModulesForm onSave={handleSaveModules} />

        </div>
      </div>
    </div>
  );
}
