import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import LogoutModal from "../../Profile/LogoutModal";

export default function ProfileAvatar() {
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
            <div
              onMouseDown={() => handleNavigate("/student-dashboard")}
              className="px-4 py-3 border-b border-[#A7E1B2]/30 hover:bg-[#F9FAFB] cursor-pointer transition"
            >
              <p className="font-semibold text-[#124734]">Pratima Singh</p>
              <p className="text-sm text-[#5B7065]">+91 98765 43210</p>
            </div>

            <ul className="text-sm text-[#124734]">
              <li
                onMouseDown={() => handleNavigate("/student/edit-profile")}
                className="px-4 py-2 hover:bg-[#A7E1B2]/20 cursor-pointer transition"
              >
                Edit Profile
              </li>

              <li
                onMouseDown={() => handleNavigate("/student/change-password")}
                className="px-4 py-2 hover:bg-[#A7E1B2]/20 cursor-pointer transition"
              >
                Change Password
              </li>

              <li
                onMouseDown={() => handleNavigate("/student/orders")}
                className="px-4 py-2 hover:bg-[#A7E1B2]/20 cursor-pointer transition"
              >
                Orders
              </li>

              <li
                onMouseDown={() => handleNavigate("/student/doubts")}
                className="px-4 py-2 hover:bg-[#A7E1B2]/20 cursor-pointer transition"
              >
                Doubts
              </li>

              {/* Logout using EXISTING LOGOUT MODAL */}
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

      {/* Your existing LogoutModal */}
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
