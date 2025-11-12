import {
  LayoutDashboard,
  Video,
  BookOpen,
  FileText,
  Edit3,
  MonitorPlay,
  Layers,
  Library,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function StudentSidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student-dashboard" },
    { label: "Live Classes", icon: Video, path: "/student/live-classes" },
    { label: "My Courses", icon: BookOpen, path: "/student/my-courses" },
    { label: "My Test Series", icon: Layers, path: "/student/test-series" },
    { label: "Answer Writing", icon: Edit3, path: "/student/answer-writing" },
    { label: "Study Materials", icon: Library, path: "/student/study-materials" },
    { label: "Practice", icon: BookOpen, path: "/student/practice" },
  ];

  return (
    <aside
      className={`bg-[#124734] text-white min-h-screen flex flex-col justify-between shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div>
        <div
          className={`flex items-center gap-3 px-6 py-6 border-b border-[#A7E1B2]/40 transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <img
            src="/src/assets/logo.png.jpeg"
            alt="ProspectEdu Logo"
            className="h-10 w-10 rounded-full object-cover border border-[#A7E1B2]/50"
          />
          {!isCollapsed && (
            <h2 className="text-xl font-heading font-semibold text-[#A7E1B2]">
              ProspectEdu
            </h2>
          )}
        </div>

        {/* Menu Items */}
        <nav className="mt-4 space-y-1">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <Link
              key={label}
              to={path}
              className={`flex items-center gap-3 px-6 py-3 w-full text-left transition-all duration-200 font-body ${
                location.pathname === path
                  ? "bg-[#009846]/20 text-[#A7E1B2] border-l-4 border-[#009846]"
                  : "text-[#E6F4EC] hover:bg-[#009846]/10 hover:text-[#A7E1B2]"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <Icon size={18} />
              {!isCollapsed && <span className="text-sm">{label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Collapse Button */}
      <div className="p-4 border-t border-[#A7E1B2]/30 flex justify-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full bg-[#009846]/80 hover:bg-[#009846] transition-all duration-300"
        >
          {isCollapsed ? <ArrowRight size={20} color="#fff" /> : <ArrowLeft size={20} color="#fff" />}
        </button>
      </div>
    </aside>
  );
}
