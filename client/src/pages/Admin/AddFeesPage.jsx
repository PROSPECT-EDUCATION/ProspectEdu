import React from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import AddFeesForm from "../../components/Admin/Fees/AddFeesForm";
import { useNavigate } from "react-router-dom";

export default function AddFeesPage() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
        }}
      >
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Add Fees" />
        </div>

        {/* PAGE CONTENT */}
        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">
          <AddFeesForm />
        </div>
      </div>
    </div>
  );
}
