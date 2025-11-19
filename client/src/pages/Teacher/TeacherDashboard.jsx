import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import React, { useState } from "react";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";
import CoursesCard from "../../components/Teacher/CoursesCard";
import QuickActionsCard from "../../components/Teacher/QuickActionsCard";
import NotificationsCard from "../../components/Teacher/NotificationCard";
import StudentsProgressCard from "../../components/Teacher/StudentProgressCard";

export default function TeacherDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidthPx = isCollapsed ? 80 : 256;

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
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`
        }}
      >
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] z-[999] transition-all duration-300"
          style={{
            left: sidebarWidthPx,
            right: 0
          }}
        >
          <TeacherTopbar pageTitle="Dashboard" isCollapsed={isCollapsed} />
        </div>

        {/* MAIN CONTENT */}
        <div className="px-6 pt-[80px] pb-10 overflow-y-auto">

  {/* GRID STRUCTURE */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

    {/* ROW 1 — Courses (2/3 width) */}
    <div className="lg:col-span-2">
      <CoursesCard
        courses={[
          { name: "Data Structures", students: 45 },
          { name: "DBMS", students: 32 },
          { name: "Operating Systems", students: 25 },
          { name: "Java Programming", students: 40 },
          { name: "Computer Networks", students: 28 },
        ]}
      />
    </div>

    {/* Quick Actions (1/3) */}
    <div className="lg:col-span-1">
      <QuickActionsCard />
    </div>

    {/* ROW 2 — Students Progress (2/3 width) */}
    <div className="lg:col-span-2">
      <StudentsProgressCard
        students={[
          { name: "Taylor, M.", progress: 75 },
          { name: "Collins, J.", progress: 60 },
          { name: "Nguyen, L.", progress: 60 },
          { name: "Ross, E.", progress: 50 },
        ]}
      />
    </div>

    {/* Notifications (1/3 width) */}
    <div className="lg:col-span-1">
      <NotificationsCard
        notifications={[
          {
            type: "submission",
            title: "New assignment submission from Taylor",
            time: "10 mins ago",
          },
          {
            type: "doubt",
            title: "Student asked a new doubt in DBMS",
            time: "45 mins ago",
          },
          {
            type: "assessment",
            title: "You created a new quiz for DSA",
            time: "Yesterday",
          },
        ]}
      />
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
