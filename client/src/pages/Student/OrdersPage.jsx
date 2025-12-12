import { useState } from "react";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import StudentOrders from "../../components/Common/StudentOrders";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

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
        className={`flex flex-col flex-1 h-screen transition-all duration-300`}
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`
        }}
      >
        {/* Fixed Topbar */}
        <div
          className="fixed top-0 z-[999] bg-white shadow-sm h-[64px] transition-all duration-300"
          style={{
            left: sidebarWidthPx,
            right: 0
          }}
        >
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="Orders" />
        </div>

        {/* Sticky Sub-header */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] z-[998] border-b border-[#E6F4EC] px-6 py-3"
          style={{
            left: sidebarWidthPx
          }}
        >
            <div className="w-full flex flex-col items-start ">
          <p className="text-sm text-[#5B7065] ">
            <span
              className="hover:underline hover:text-[#009846] cursor-pointer transition-colors"
              onClick={() => navigate("/student-dashboard")}
            >
              Home
            </span>{" "}
            / <span className="text-[#124734] font-medium">Orders</span>
          </p>
        </div>

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto px-4 md:px-3 py-8"
          style={{ marginTop: "20px", height: "calc(100vh - 128px)" }}
        >
          <div className="w-full max-w-6xl mx-auto">
            <StudentOrders />
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}
