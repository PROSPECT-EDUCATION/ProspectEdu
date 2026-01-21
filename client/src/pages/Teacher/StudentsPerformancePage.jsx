// src/pages/Teacher/StudentsPerformancePage.jsx

import { useMemo, useState } from "react";

// Layout Components
import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";

// Performance Components
import PerformanceStats from "../../components/Teacher/Performance/PerformanceStats";
import SearchBar from "../../components/Teacher/Performance/SearchBar";
import StudentsTable from "../../components/Teacher/Performance/StudentsTable";
import StudentDetailModal from "../../components/Teacher/Performance/StudentDetailModal";

export default function StudentsPerformancePage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const [query, setQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Example dataset
  const [students] = useState([
    {
      id: 1,
      name: "Riya Sharma",
      roll: "IT-23-001",
      email: "riya@example.com",
      assignments: [
        { id: "a1", title: "DSA Assignment 1", score: 78 },
        { id: "a2", title: "Trees & Graphs", score: 85 },
      ],
      quizzes: [
        { id: "q1", title: "Stack Quiz", score: 80 },
        { id: "q2", title: "Queue Quiz", score: 72 },
      ],
      attendance: 92,
      progress: 68,
    },
    {
      id: 2,
      name: "Rahul Jain",
      roll: "IT-23-002",
      email: "rahul@example.com",
      assignments: [
        { id: "a1", title: "DSA Assignment 1", score: 92 },
        { id: "a2", title: "Trees & Graphs", score: 88 },
      ],
      quizzes: [
        { id: "q1", title: "Stack Quiz", score: 90 },
        { id: "q2", title: "Queue Quiz", score: 94 },
      ],
      attendance: 98,
      progress: 90,
    },
  ]);

  // Filter logic
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.roll.toLowerCase().includes(query.toLowerCase()) ||
      s.email.toLowerCase().includes(query.toLowerCase())
  );

  // Metrics
  const metrics = useMemo(() => {
    const avg = (arr) =>
      Math.round(arr.reduce((a, b) => a + b, 0) / (arr.length || 1));

    const assignmentScores = students.flatMap((s) =>
      s.assignments.map((a) => a.score)
    );

    const quizScores = students.flatMap((s) =>
      s.quizzes.map((q) => q.score)
    );

    return {
      avgAssignment: avg(assignmentScores),
      avgQuiz: avg(quizScores),
      completionRate: avg(students.map((s) => s.progress)),
      activeCount: students.length,
    };
  }, [students]);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* FIXED SIDEBAR */}
      <div
        className="fixed left-0 top-0 h-full transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN CONTENT */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* FULL-WIDTH TOPBAR */}
        <TeacherTopbar pageTitle="Students · Performance" />

        {/* PAGE CONTENT */}
        <div className="p-6 overflow-y-auto max-h-screen">
          <p className="text-sm text-[#5B7065] mb-6">
            Full overview of academic performance
          </p>

          <PerformanceStats metrics={metrics} />

          <SearchBar query={query} setQuery={setQuery} />

          <StudentsTable students={filtered} onSelect={setSelectedStudent} />

          {selectedStudent && (
            <StudentDetailModal
              student={selectedStudent}
              onClose={() => setSelectedStudent(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
