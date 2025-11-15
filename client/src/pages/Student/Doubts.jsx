import React, { useState } from "react";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import DoubtCard from "../../components/Student/DoubtCard";
import { useNavigate } from "react-router-dom";

export default function Doubts() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const sidebarWidthPx = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F7FAFF] overflow-hidden">

      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-full z-40 transition-all duration-300`}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Section */}
      <div
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`
        }}
      >
        {/* Topbar */}
        <div
          className="fixed top-0 z-[999] bg-white shadow-sm h-[64px]"
          style={{
            left: sidebarWidthPx,
            right: 0
          }}
        >
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="Doubts" />
        </div>

        {/* Header: Breadcrumb + Title + Button */}
        <div
          className="sticky top-[64px] bg-[#F7FAFF] z-[998] border-b border-[#E6F4EC] px-6 py-3"
          style={{ left: sidebarWidthPx }}
        >
          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start ">
          <p className="text-sm text-[#5B7065] mb-2">
            <span
              className="hover:text-[#009846] cursor-pointer"
              onClick={() => navigate("/student-dashboard")}
            >
              Home
            </span>{" "}
            / Doubts
          </p>

          {/* Row: Title (left) & Button (right) */}
          <div className="flex justify-between items-center w-full">
            <h2 className="text-base font-medium text-[#124734] border-b-2 border-[#009846] inline-block pb-1">
              Asked Doubt
            </h2>

            {/* Ask Doubt Button */}
            <button
              onClick={() => navigate("/student/ask-doubt")}
              className="bg-[#009846] hover:bg-[#007d39] transition text-white px-5 py-2 rounded-lg text-sm shadow transition"
            >
              Ask Your Doubt
            </button>
          </div>
        </div>
</div>
        {/* Page Body */}
        <main
          className="flex-1 overflow-y-auto px-6 py-8"
          style={{ marginTop: "60px", height: "calc(100vh - 128px)" }}
        >
          <div className="w-full">

            <DoubtCard
              title="General Enquiry"
              doubtType="Batch Related"
              query="I want to know about recent..."
              date="15th Nov 2025"
              onViewAttachment={() => console.log("Attachment clicked")}
              onViewResponse={() => console.log("View response clicked")}
            />

          </div>
        </main>
      </div>
    </div>
  );
}
