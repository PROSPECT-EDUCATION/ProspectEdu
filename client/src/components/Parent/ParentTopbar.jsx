import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import StoreButton from "../Student/ui/StoreButton";      
import NotificationBell from "../Student/ui/NotificationBell"; 
import ProfileAvatar from "../Student/ui/ProfileAvatar";   

export default function ParentTopbar({
  pageTitle = "Dashboard",
  students = [],
  selectedStudent,
  onSelectStudent,
  showStudentSwitcher = true
}) {
  const navigate = useNavigate();

  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const studentRef = useRef(null);
  const profileRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const close = (e) => {
      if (studentRef.current && !studentRef.current.contains(e.target)) {
        setStudentDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="w-full h-[64px] bg-white shadow-sm flex items-center justify-between px-6">

      {/* LEFT — Parent Welcome */}
      <div>
        <p className="text-sm text-[#5B7065]">
          Welcome back, <span className="text-[#124734] font-semibold">Parent !</span>
        </p>
        <h2 className="text-lg font-semibold text-[#124734] -mt-1">
          {pageTitle || "Dashboard"}
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* ✅ FIXED: SHOW ONLY WHEN enabled */}
        {showStudentSwitcher && (
          <div className="relative" ref={studentRef}>
            <button
              onClick={() => setStudentDropdownOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-2 border rounded-md text-[#124734] bg-[#F8FFFA] hover:bg-[#E6F4EC] transition"
            >
              {selectedStudent?.name || "Select Student"}
              <svg
                className={`h-4 w-4 transition-transform ${
                  studentDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {studentDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white shadow-lg border border-[#E6F4EC] rounded-lg p-2 z-[2000]"
                style={{ top: "100%" }}
              >
                {students.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectStudent(s);
                      setStudentDropdownOpen(false);
                    }}
                    className="px-3 py-2 rounded-md hover:bg-[#F2FBF6] cursor-pointer text-sm text-[#124734]"
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STORE BUTTON */}
        <StoreButton />

        {/* NOTIFICATION ICON */}
        <NotificationBell onClick={() => navigate("/parent/announcements")} />

        {/* PROFILE DROPDOWN */}
        <ProfileAvatar role="parent" />
      </div>
    </header>
  );
}
