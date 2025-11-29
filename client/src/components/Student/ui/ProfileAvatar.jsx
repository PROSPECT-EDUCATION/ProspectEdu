import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import LogoutModal from "../../Profile/LogoutModal";

export default function ProfileAvatar({ role = "student" }) {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const close = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const toggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX - 224,
      });
    }
    setOpen((v) => !v);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  // 🔥 MENU LIST BASED ON ROLE
  const MENU_ITEMS =
    role === "teacher"
      ? [
          { label: "Edit Profile", path: "/teacher/edit-profile" },
          { label: "Change Password", path: "/teacher/change-password" },
          { label: "Orders", path: "/teacher/orders" },
          { label: "Doubts", path: "/teacher/queries/doubts" },
        ]
      : role === "parent"
      ? [
          { label: "Edit Profile", path: "/parent/settings" },
          { label: "Payments", path: "/parent/payments" },
          { label: "Change Password", path: "/parent/change-password" },
        ]
      : [
          // STUDENT MENU
          { label: "Edit Profile", path: "/student/edit-profile" },
          { label: "Change Password", path: "/student/change-password" },
          { label: "Orders", path: "/student/orders" },
          { label: "Doubts", path: "/student/doubts" },
        ];

  // 🔥 PROFILE CARD CLICK DESTINATION
  const PROFILE_REDIRECT =
    role === "teacher"
      ? "/teacher-dashboard"
      : role === "parent"
      ? "/parent-dashboard"
      : "/student-dashboard";

  return (
    <>
      {/* Avatar */}
      <div ref={buttonRef}>
        <div
          onClick={toggle}
          className="p-[2px] rounded-full bg-[#A7E1B2]/40 hover:bg-[#009846]/30 cursor-pointer transition"
        >
          <img
            src="/src/assets/profile.png"
            alt="User Avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Dropdown */}
      {open &&
        createPortal(
          <div
            className="w-56 bg-white border border-[#A7E1B2]/30 shadow-lg rounded-lg overflow-hidden"
            style={{
              position: "absolute",
              top: coords.top,
              left: coords.left,
              zIndex: 2000,
            }}
          >
            {/* PROFILE HEADER */}
            <div
              onMouseDown={() => handleNavigate(PROFILE_REDIRECT)}
              className="px-4 py-3 border-b border-[#A7E1B2]/30 hover:bg-[#F9FAFB] cursor-pointer transition"
            >
              <p className="font-semibold text-[#124734]">Pratima Singh</p>
              <p className="text-sm text-[#5B7065]">+91 98765 43210</p>
            </div>

            {/* MENU LIST */}
            <ul className="text-sm text-[#124734]">
              {MENU_ITEMS.map((item, idx) => (
                <li
                  key={idx}
                  onMouseDown={() => handleNavigate(item.path)}
                  className="px-4 py-2 hover:bg-[#A7E1B2]/20 cursor-pointer transition"
                >
                  {item.label}
                </li>
              ))}

              {/* Logout */}
              <li
                onMouseDown={() => {
                  setOpen(false);
                  setShowLogout(true);
                }}
                className="px-4 py-2 hover:bg-[#009846]/20 text-[#D64545] cursor-pointer font-medium transition"
              >
                Logout
              </li>
            </ul>
          </div>,
          document.body
        )}

      {/* Logout Modal */}
      <LogoutModal
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          setShowLogout(false);
          navigate("/");
        }}
      />
    </>
  );
}
