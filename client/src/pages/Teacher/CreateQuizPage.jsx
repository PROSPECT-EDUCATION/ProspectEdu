import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";

export default function CreateQuizPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`${isCollapsed ? "w-20" : "w-64"} fixed left-0 top-0 h-full transition-all`}
      >
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* TOPBAR */}
        <TeacherTopbar pageTitle="Create Quiz" />

        {/* PAGE CONTENT */}
        <div className="px-8 pt-[20px] pb-10 overflow-y-auto">
            <div className="w-full flex flex-col items-start ">
          {/* Breadcrumb */}
          <p className="text-sm text-[#5B7065] mb-6">
            <span
              className="hover:text-[#009846] cursor-pointer hover:underline"
              onClick={() => navigate("/teacher-dashboard")}
            >
              Dashboard
            </span>
            {" / "}
            <span
              className="hover:text-[#009846] cursor-pointer hover:underline"
              onClick={() => navigate("/teacher/courses")}
            >
              Courses
            </span>
            {" / "}
            <span
              className="hover:text-[#009846] cursor-pointer hover:underline"
              onClick={() => navigate(-1)}
            >
              Assessments
            </span>
            {" / "}
            <span className="text-[#124734] font-medium">Create Quiz</span>
          </p>

          {/* MAIN CARD */}
          <div className="bg-white border border-[#A7E1B2] p-6 rounded-xl shadow-sm max-w-3xl">
            <h2 className="text-2xl font-semibold text-[#124734] mb-5">
              Create Quiz
            </h2>

            {/* Quiz Title */}
            <input
              className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-4"
              placeholder="Quiz Title"
            />

            {/* Timer */}
            <input
              type="number"
              className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-4"
              placeholder="Timer (minutes)"
            />

            {/* Add Question Button */}
            <button className="bg-[#009846] text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#007a39] w-full justify-center">
              <Plus size={18} /> Add Question
            </button>
          </div>
</div>
        </div>
      </div>
    </div>
  );
}
