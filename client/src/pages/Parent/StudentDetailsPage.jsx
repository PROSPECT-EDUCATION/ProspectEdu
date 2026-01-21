import { useParams, useNavigate } from "react-router-dom";
import ParentSidebar from "../../components/Parent/ParentSidebar";
import ParentTopbar from "../../components/Parent/ParentTopbar";
import { ArrowLeft } from "lucide-react";
import { parentStudents } from "../../data/parentStudents";
import { useState } from "react";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  // Fetch student from data
  const student = parentStudents.find((s) => s.id === Number(id));

  if (!student)
    return <p className="p-6 text-red-500">Student not found.</p>;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className="fixed top-0 left-0 h-full transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <ParentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        
        {/* TOPBAR */}
        <ParentTopbar pageTitle="Student Profile" showStudentSwitcher={false} />

        {/* BREADCRUMB */}
        <div className="px-6 py-3 bg-[#F9FAFB]">
            <div className="w-full flex flex-col items-start ">
          <p className="text-sm text-[#5B7065]">
            <span
              className="cursor-pointer hover:underline hover:text-[#009846]"
              onClick={() => navigate("/parent/students")}
            >
              My Students
            </span>
            {" / "}
            <span className="text-[#124734] font-medium">
              {student.name}
            </span>
          </p>
        </div>
</div>
        {/* CONTENT */}
        <div className="p-6 overflow-y-auto">

          {/* HEADER CARD */}
          {/* HEADER CARD */}
<div className="
  bg-white rounded-2xl shadow-md p-6 
  flex flex-col sm:flex-row 
  sm:items-center items-start 
  gap-4 sm:gap-6 
  border border-[#E6F4EC]
">
  
  {/* Avatar */}
  <img
    src={student.avatar}
    className="h-20 w-20 rounded-full border-2 border-[#009846] mx-auto sm:mx-0"
  />

  {/* Text Section */}
  <div className="space-y-1 w-full">
    <h1 className="text-2xl font-bold text-[#124734]">
      {student.name}
    </h1>

    <p className="text-[#5B7065]">
      Class {student.class} • Roll: {student.roll}
    </p>

    {/* Stats Row */}
    <div className="flex flex-col xs:flex-row gap-2 sm:gap-6 mt-2">
      <p className="text-sm text-[#124734]">
        <b>Attendance:</b> {student.attendance}%
      </p>
      <p className="text-sm text-[#124734]">
        <b>Progress:</b> {student.overallProgress}%
      </p>
    </div>
  </div>
</div>


          {/* GRID - TWO COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* ACADEMIC DETAILS */}
         {/* ACADEMIC OVERVIEW */}
<div className="bg-white p-6 rounded-xl shadow-md border border-[#E6F4EC]">
  <h2 className="text-xl font-semibold text-[#124734] mb-4">Academic Overview</h2>

  <div className="space-y-2 text-[#5B7065]">
    <p><b>Class:</b> {student.class}</p>
    <p><b>Roll Number:</b> {student.roll}</p>
    <p><b>Attendance:</b> {student.attendance}%</p>
    <p><b>Last Exam Score:</b> {student.lastScore}</p>
    <p><b>Overall Progress:</b> {student.overallProgress}%</p>
    <p><b>Assignments Score:</b> {student.performance.assignments}%</p>
    <p><b>Quizzes Score:</b> {student.performance.quizzes}%</p>
    <p><b>Course Progress:</b> {student.performance.courseProgress}%</p>
  </div>
</div>


            {/* SUBJECT PERFORMANCE */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-[#E6F4EC]">
              <h2 className="text-xl font-semibold text-[#124734] mb-4">Subject Performance</h2>

              <div className="space-y-3">
                {[
                  { name: "Math", score: "85%" },
                  { name: "Science", score: "72%" },
                  { name: "English", score: "91%" },
                  { name: "Social Science", score: "78%" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between border-b py-2">
                    <span className="text-[#124734]">{s.name}</span>
                    <span className="font-semibold text-[#009846]">{s.score}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RECENT ACTIVITY */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-md border border-[#E6F4EC]">
            <h2 className="text-xl font-semibold text-[#124734] mb-4">Recent Activity</h2>

            <div className="space-y-3 text-[#5B7065] pl-1">
  {[
    "Submitted: Science Assignment 3",
    "Completed: English MCQ Test",
    "Viewed: Chapter 4 Notes",
    "Login at 8:40 AM",
  ].map((a, i) => (
    <p key={i} className="text-sm">{a}</p>
  ))}
</div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex gap-4">
            <button className="bg-[#124734] text-white px-5 py-2 rounded-lg hover:bg-[#0e3a29] transition">
              View Full Report
            </button>
            <button className="bg-[#009846] text-white px-5 py-2 rounded-lg hover:bg-[#007d3a] transition">
              Message Teacher
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
