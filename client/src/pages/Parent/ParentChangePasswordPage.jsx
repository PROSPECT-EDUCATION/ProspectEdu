import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ParentSidebar from "../../components/Parent/ParentSidebar";
import ParentTopbar from "../../components/Parent/ParentTopbar";

import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";

export default function ParentChangePasswordPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <ParentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: sidebarWidth }}
      >

        {/* Topbar */}
        <div
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <ParentTopbar
            pageTitle="Change Password"
            showStudentSwitcher={false}
          />
        </div>

        {/* Sub-header */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] z-[998] border-b border-[#E6F4EC] px-6 py-3"
          style={{ left: sidebarWidth }}
        >
          <div className="w-full flex flex-col items-start">

            {/* Breadcrumb */}
            <p className="text-sm text-[#5B7065] mb-3">
              <span
                className="cursor-pointer hover:text-[#009846] hover:underline"
                onClick={() => navigate("/parent-dashboard")}
              >
                Home
              </span>{" "}
              / <span className="text-[#124734] font-medium">Change Password</span>
            </p>

          </div>
        </div>

        {/* Body */}
        <main
          className="flex-1 overflow-y-auto px-6 py-10"
          style={{ marginTop: "50px" }}
        >
          <ChangePasswordForm />
        </main>
      </div>
    </div>
  );
}
