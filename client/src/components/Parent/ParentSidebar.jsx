import {
  LayoutDashboard,
  Users2,
  BarChart3,
  MessageSquare,
  Bell,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function ParentSidebar({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/parent/dashboard",
    },
    {
      label: "My Students",
      icon: <Users2 size={20} />,
      path: "/parent/students",
    },
    {
      label: "Progress Reports",
      icon: <BarChart3 size={20} />,
      path: "/parent/reports",
    },
    {
      label: "Messages",
      icon: <MessageSquare size={20} />,
      path: "/parent/messages",
    },
    {
      label: "Announcements",
      icon: <Bell size={20} />,
      path: "/parent/announcements",
    },
    {
      label: "Payments",
      icon: <CreditCard size={20} />,
      path: "/parent/payments",
    },
    {
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/parent/settings",
    },
  ];

  return (
    <div
      className={`h-full bg-white border-r border-[#DDEFE4] shadow-sm flex flex-col transition-all duration-300`}
      style={{ width: isCollapsed ? 80 : 256 }}
    >
      {/* LOGO AREA */}
      <div className="h-[64px] flex items-center justify-between px-4 border-b border-[#E6F4EC]">
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-[#124734]">Parent Portal</h1>
        )}

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="p-2 rounded-md hover:bg-[#E6F4EC]"
        >
          <svg
            className={`w-5 h-5 text-[#124734] transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* MENU LIST */}
      <div className="flex-1 overflow-y-auto py-4">
        {menu.map((item) => {
          const active = location.pathname.startsWith(item.path);

          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center gap-3 px-4 py-3 cursor-pointer rounded-r-full
                transition-all duration-200
                ${
                  active
                    ? "bg-[#E6F4EC] text-[#124734] font-semibold border-r-4 border-[#009846]"
                    : "text-[#5B7065] hover:bg-[#F2FBF6]"
                }
              `}
            >
              <div className="text-[#124734]">{item.icon}</div>

              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </div>
          );
        })}
      </div>

      {/* LOGOUT BUTTON */}
      <div
        onClick={() => navigate("/")}
        className="
          flex items-center gap-3 px-4 py-3 mb-4 cursor-pointer 
          text-[#D64545] hover:bg-red-50 rounded-r-full
        "
      >
        <LogOut size={20} />
        {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
      </div>
    </div>
  );
}
