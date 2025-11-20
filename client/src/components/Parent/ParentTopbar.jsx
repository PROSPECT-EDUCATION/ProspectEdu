import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

export default function ParentTopbar({ students = [], selectedStudent, onSelectStudent }) {
  const navigate = useNavigate();

  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const studentRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdown on outside click
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

      {/* LEFT SIDE — Parent Welcome */}
      <div>
        <p className="text-sm text-[#5B7065]">
          Welcome, <span className="text-[#124734] font-semibold">Parent</span>
        </p>
        <h2 className="text-lg font-semibold text-[#124734] -mt-1">
          Dashboard
        </h2>
      </div>

      {/* RIGHT SIDE CONTROLS */}
      <div className="flex items-center gap-6">

        {/* STUDENT SWITCH DROPDOWN */}
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

          {studentDropdownOpen &&
            createPortal(
              <div
                className="absolute right-0 mt-2 w-56 bg-white shadow-lg border border-[#E6F4EC] rounded-lg p-2 z-[2000]"
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
              </div>,
              document.body
            )}
        </div>

        {/* NOTIFICATION ICON */}
        <button
          onClick={() => navigate("/parent/announcements")}
          className="relative p-2 bg-[#F8FFFA] hover:bg-[#E6F4EC] rounded-full"
        >
          <Bell className="text-[#124734]" size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* PROFILE AVATAR */}
        <div className="relative" ref={profileRef}>
          <img
            onClick={() => setProfileOpen((v) => !v)}
            src="/src/assets/profile.png"
            className="h-9 w-9 rounded-full cursor-pointer border border-[#A7E1B2]"
          />

          {profileOpen &&
            createPortal(
              <div
                className="absolute right-0 mt-2 w-56 bg-white border border-[#A7E1B2]/40 rounded-lg shadow-lg z-[2000]"
              >
                {/* Parent info */}
                <div
                  onClick={() => navigate("/parent/settings")}
                  className="px-4 py-3 border-b border-[#E6F4EC] hover:bg-[#F9FAFB] cursor-pointer"
                >
                  <p className="font-semibold text-[#124734]">Parent User</p>
                  <p className="text-sm text-[#5B7065]">+91 98765 43210</p>
                </div>

                {/* Menu Items */}
                <ul className="text-sm text-[#124734]">
                  <li
                    onClick={() => navigate("/parent/settings")}
                    className="px-4 py-2 hover:bg-[#F2FBF6] cursor-pointer"
                  >
                    Settings
                  </li>

                  <li
                    onClick={() => navigate("/parent/payments")}
                    className="px-4 py-2 hover:bg-[#F2FBF6] cursor-pointer"
                  >
                    Payments
                  </li>

                  <li
                    onClick={() => navigate("/")}
                    className="px-4 py-2 text-[#D64545] hover:bg-red-50 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>,
              document.body
            )}
        </div>
      </div>
    </header>
  );
}
