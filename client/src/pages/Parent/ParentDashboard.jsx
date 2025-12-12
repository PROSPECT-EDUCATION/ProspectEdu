// src/pages/Parent/ParentDashboard.jsx

import { useState } from "react";

import ParentSidebar from "../../components/Parent/ParentSidebar";
import ParentTopbar from "../../components/Parent/ParentTopbar";

import StudentCard from "../../components/Parent/StudentCard";
import RecentActivityCard from "../../components/Parent/RecentActivityCard";
import PerformanceSnapshot from "../../components/Parent/PerformanceSnapshot";
import AttendanceCard from "../../components/Parent/AttendanceCard";
import AlertsCard from "../../components/Parent/AlertsCard";
import PaymentStatusCard from "../../components/Parent/Payments/PaymentStatusCard";

export default function ParentDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? 80 : 256;

  // Demo students (later from backend)
  const [students] = useState([
    { id: 1, name: "Aarav Singh", class: "Class 8", roll: "08-23" },
    { id: 2, name: "Sneha Verma", class: "Class 10", roll: "10-15" },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className="fixed left-0 top-0 h-full transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <ParentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <ParentTopbar
          students={students}
          selectedStudent={selectedStudent}
          onSelectStudent={setSelectedStudent}
        />

        <div className="p-6 space-y-6 overflow-y-auto">

          {/* STUDENT CARDS - FULL WIDTH */}
          <section>
            <h2 className="text-lg font-semibold text-[#124734] mb-3">
              Linked Students
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map((s) => (
                <StudentCard
                  key={s.id}
                  student={s}
                  onSelect={() => setSelectedStudent(s)}
                />
              ))}
            </div>
          </section>

          {/* ANALYTICS GRID */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PerformanceSnapshot student={selectedStudent} />
            <AttendanceCard student={selectedStudent} />
            <PaymentStatusCard student={selectedStudent} />
          </section>

          {/* RECENT ACTIVITY + ALERTS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <RecentActivityCard student={selectedStudent} />
            </div>

            <AlertsCard student={selectedStudent} />
          </section>

        </div>
      </div>
    </div>
  );
}
