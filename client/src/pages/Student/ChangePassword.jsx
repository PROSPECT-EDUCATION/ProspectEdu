import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";

export default function ChangePassword() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? 80 : 256;

  // ✅ Prevent indexing of private student pages
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);

    return () => document.head.removeChild(meta);
  }, []);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </aside>

      {/* Main Content */}
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: sidebarWidth }}
      >

        {/* Topbar */}
        <header
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <StudentTopbar
            isCollapsed={isCollapsed}
            pageTitle="Change Password"
          />
        </header>

        {/* Sub-header / Breadcrumb */}
        <nav
          className="sticky top-[64px] bg-[#F9FAFB] z-[998] border-b border-[#E6F4EC] px-6 py-3"
          aria-label="Student breadcrumb"
          style={{ left: sidebarWidth }}
        >
          <p className="text-sm text-[#5B7065] mb-3">
            <span
              className="cursor-pointer hover:text-[#009846] hover:underline"
              onClick={() => navigate("/student-dashboard")}
            >
              Home
            </span>{" "}
            / <span className="text-[#124734] font-medium">Change Password</span>
          </p>
        </nav>

        {/* Page Body */}
        <main
          className="flex-1 overflow-y-auto px-6 py-10"
          style={{ marginTop: "50px" }}
          aria-labelledby="student-change-password-heading"
        >
          {/* Hidden H1 for semantics */}
          <h1 id="student-change-password-heading" className="sr-only">
            Change Student Account Password
          </h1>

          <ChangePasswordForm />
        </main>
      </div>
    </div>
  );
}
