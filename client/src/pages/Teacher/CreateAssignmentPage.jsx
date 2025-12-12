import { useState } from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";

export default function CreateAssignmentPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fileName, setFileName] = useState("");
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
        <TeacherTopbar pageTitle="Create Assignment" />

        {/* PAGE CONTENT */}
        <div className="px-8 pt-[20px] pb-10 overflow-y-auto">
            <div className="w-full flex flex-col items-start ">

          {/* TOP-LEFT BREADCRUMB (NOW MOVED & CLICKABLE) */}
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
              onClick={() => navigate(-1)} // Go back to course management
            >
              Assessments
            </span>
            {" / "}
            <span className="text-[#124734] font-medium">
              Create Assignment
            </span>
          </p>

          {/* MAIN CARD */}
          <div className="bg-white border border-[#A7E1B2] p-6 rounded-xl shadow-sm max-w-3xl">
            <h2 className="text-2xl font-semibold text-[#124734] mb-5">
              Create Assignment
            </h2>

            {/* Assignment Title */}
            <input
              className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-4"
              placeholder="Assignment Title"
            />

            {/* Instructions */}
            <textarea
              className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-4"
              placeholder="Instructions..."
              rows={4}
            />

            {/* Upload file */}
            <label
              className="cursor-pointer bg-[#009846] text-white px-4 py-2 rounded-md flex items-center gap-2 w-fit mb-3"
            >
              <Upload size={16} />
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => setFileName(e.target.files[0]?.name || "")}
              />
            </label>

            {fileName && (
              <p className="text-sm text-[#124734] mb-3">📄 {fileName}</p>
            )}

            {/* Due date */}
            <label className="text-[#124734] font-medium">Due Date</label>
            <input
              type="date"
              className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-4"
            />

            {/* Max Marks */}
            <input
              type="number"
              className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-4"
              placeholder="Maximum Marks"
            />

            {/* Create Button */}
            <button className="bg-[#009846] text-white px-6 py-3 rounded-md hover:bg-[#0d3a28] w-full">
              Create Assignment
            </button>
          </div>
</div>
        </div>
      </div>
    </div>
  );
}
