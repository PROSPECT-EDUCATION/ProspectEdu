import { useState } from "react";
import ParentSidebar from "../../components/Parent/ParentSidebar";
import ParentTopbar from "../../components/Parent/ParentTopbar";
import StudentsGrid from "../../components/Parent/Students/StudentsGrid";
import { parentStudents } from "../../data/parentStudents";
import { useNavigate } from "react-router-dom";

export default function ParentStudentsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filtered = parentStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: sidebarWidth }}
      >
<ParentTopbar pageTitle="My Students" showStudentSwitcher={false} />


        {/* ---- BREADCRUMB ---- */}
        <div className="w-full flex flex-col items-start ">
        <div className="px-6 py-3  bg-[#F9FAFB]">
          <p className="text-sm text-[#5B7065]">
            <span
              className="cursor-pointer hover:underline hover:text-[#009846]"
              onClick={() => navigate("/parent-dashboard")}
            >
              Home
            </span>
            {" / "}
            <span className="text-[#124734] font-medium">
              My Students
            </span>
          </p>
        </div>
</div>
        {/* ---- CONTENT ---- */}
        <div className="px-6 pt-4 pb-10 overflow-y-auto">
          <StudentsGrid
            students={filtered}
            onSelect={(id) => navigate(`/parent/students/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}
