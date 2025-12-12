import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";
import AssessmentDashboard from "../../components/Teacher/Assessments/AssessmentDashboard";
import { useState } from "react";

export default function AssessmentDashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      
      {/* SIDEBAR */}
      <div
        className="fixed left-0 top-0 h-full transition-all"
        style={{ width: sidebarWidth }}
      >
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN CONTENT */}
      <div
        className="flex flex-col flex-1 transition-all"
        style={{ marginLeft: sidebarWidth }}
      >
        <TeacherTopbar pageTitle="Assessments" />

        <div className="p-6">
          <AssessmentDashboard />
        </div>
      </div>
    </div>
  );
}
