// src/pages/Teacher/ReviewSubmissionsPageWrapper.jsx

import { useState } from "react";
import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";

import ReviewSubmissionsPage from "../../components/Teacher/Submission/ReviewSubmissionsPage";
import SubmissionListPage from "../../components/Teacher/Submission/SubmissionListPage";
import EvaluateSubmissionModal from "../../components/Teacher/Submission/EvaluateSubmissionModal";

export default function ReviewSubmissionsPageWrapper() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR — FIXED LIKE IN ASSESSMENT PAGE */}
      <div
        className="fixed left-0 top-0 h-full transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN CONTENT — FULL WIDTH */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* TOPBAR — FULL WIDTH WITHOUT CENTERING */}
        <TeacherTopbar pageTitle="Review Submissions" />

        {/* PAGE CONTENT — FULL WIDTH */}
        <div className="p-6 overflow-y-auto">

          {/* 1️⃣ STEP 1 — LIST OF ASSIGNMENTS */}
          {!selectedAssignment && (
            <ReviewSubmissionsPage
              onOpenAssignment={(assignment) =>
                setSelectedAssignment(assignment)
              }
            />
          )}

          {/* 2️⃣ STEP 2 — LIST OF SUBMISSIONS */}
          {selectedAssignment && !selectedSubmission && (
            <SubmissionListPage
              assignment={selectedAssignment}
              onBack={() => setSelectedAssignment(null)}
              onEvaluate={(submission) => setSelectedSubmission(submission)}
            />
          )}

          {/* 3️⃣ STEP 3 — EVALUATION MODAL */}
          {selectedSubmission && (
            <EvaluateSubmissionModal
              submission={selectedSubmission}
              onClose={() => setSelectedSubmission(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
