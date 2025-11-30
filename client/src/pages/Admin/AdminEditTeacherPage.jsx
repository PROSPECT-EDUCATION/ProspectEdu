import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import EditTeacherForm from "../../components/Admin/Teachers/EditTeacherForm";
import { useNavigate } from "react-router-dom";

export default function AdminEditTeacherPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;
  const navigate = useNavigate();

  // Mock existing data (replace with API later)
  const initialData = {
    firstName: "Angelica",
    lastName: "Ramos",
    department: "Computer Science",
    gender: "Female",
    education: "M.Tech, Ph.D",
    mobile: "9876543210",
    email: "angelica@example.com",
    joiningDate: "2020-06-15",
    salary: "75000",
    address: "New York, USA",
    photo: null,
  };

  const handleUpdate = (updatedData) => {
    console.log("Teacher Updated:", updatedData);

    setTimeout(() => {
      navigate("/admin/teachers");
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ${
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
          width: `calc(100vw - ${sidebarWidth}px)`
        }}
      >

        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] z-[999] flex items-center"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Edit Teacher" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[80px] pb-10 overflow-y-auto">

          {/* Breadcrumb */}
          <div className="text-gray-600 text-sm mb-4">
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </span>{" / "}
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin/teachers")}
            >
              Teachers
            </span>{" / "}
            <span className="text-[#124734] font-medium">Edit Teacher</span>
          </div>

          {/* FORM COMPONENT */}
          <EditTeacherForm
            initialData={initialData}
            onSubmit={handleUpdate}
          />

        </div>
      </div>
    </div>
  );
}
