import { useState } from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { uploadsApi } from "../../services/uploads";
import { assignmentsApi } from "../../services/assignments";
import { useParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext"; // if you have it

import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";

export default function CreateAssignmentPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  // ✅ your route should include :courseId
const { showToast } = useToast();
const { courseId } = useParams();

const [title, setTitle] = useState("");
const [instructions, setInstructions] = useState("");
const [dueDate, setDueDate] = useState("");
const [maxMarks, setMaxMarks] = useState("");
const [file, setFile] = useState(null);
const [submitting, setSubmitting] = useState(false);
const handleCreate = async () => {
  if (!courseId) return showToast("CourseId missing", "error");
  if (!title.trim()) return showToast("Title is required", "error");

  try {
    setSubmitting(true);

    // ✅ SEND AS FORMDATA (IMPORTANT)
    const fd = new FormData();
    fd.append("title", title.trim());
    fd.append("instructions", instructions.trim());
    fd.append("dueDate", dueDate);
    fd.append("maxMarks", maxMarks);

    // ✅ attach file directly
    if (file) {
      fd.append("file", file);
    }

    // ✅ ONE request only
    await assignmentsApi.create(courseId, fd);

    showToast("Assignment created!", "success");
    navigate(-1);
  } catch (e) {
    console.log(e);
    showToast(
      e?.response?.data?.message || "Failed to create assignment",
      "error"
    );
  } finally {
    setSubmitting(false);
  }
};


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
              onClick={() => navigate("/teacher-dashboard")}
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
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>


            {/* Instructions */}
            <textarea
  className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-4"
  placeholder="Instructions..."
  rows={4}
  value={instructions}
  onChange={(e) => setInstructions(e.target.value)}
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
                onChange={(e) => {
  const f = e.target.files?.[0];
  setFile(f || null);
  setFileName(f?.name || "");
}}

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
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
/>

            {/* Max Marks */}
            <input
  type="number"
  className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-4"
  placeholder="Maximum Marks"
  value={maxMarks}
  onChange={(e) => setMaxMarks(e.target.value)}
/>

            {/* Create Button */}
            <button
  disabled={submitting}
  onClick={handleCreate}
  className={`bg-[#009846] text-white px-6 py-3 rounded-md w-full
    ${submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-[#0d3a28]"}`}
>
  {submitting ? "Creating..." : "Create Assignment"}
</button>

  <button
  type="button"
  onClick={() => navigate(`/teacher/assessment/assignments/${courseId}`)}
  className="mt-3 border border-[#A7E1B2] text-[#124734] px-6 py-3 rounded-md w-full hover:bg-[#F2FBF6]"
>
  Show Assignments
</button>

          </div>
</div>
        </div>
      </div>
    

    </div>
    
  );
}
