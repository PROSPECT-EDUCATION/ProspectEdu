import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import TeachersTable from "../../components/Admin/Teachers/TeachersTable";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/profile.webp"
export default function AdminAllTeachersPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? 80 : 256;
  const [searchQuery, setSearchQuery] = useState("");

  const teachers = [
    {
      profile: profile,
      name: "Tiger Nixon",
      department: "Architect",
      gender: "Male",
      education: "M.COM., P.H.D.",
      mobile: "123 456 7890",
      email: "info@example.com",
      joining: "2011/04/25",
      salary: "$5000", 
    },
    {
      profile: profile,
      name: "Garrett Winters",
      department: "Accountant",
      gender: "Female",
      education: "M.COM., P.H.D.",
      mobile: "987 654 3210",
      email: "info@example.com",
      joining: "2011/07/25",
       salary: "$4000", 
    }
  ];

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth, width: `calc(100vw - ${sidebarWidth}px)` }}
      >
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Teachers" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[70px] pb-10 overflow-y-auto">

          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start ">
          <div className="text-gray-600 text-sm mb-2 cursor-pointer">
            <span onClick={() => navigate("/admin-dashboard")} className="hover:text-[#124734]">
              Dashboard
            </span>
            {" / "}
            <span className="text-[#124734] font-medium">Teachers</span>
          </div>
</div>
          {/* Title + Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#124734]">All Teachers</h2>

            <button
              className="bg-[#124734] text-white px-4 py-2 rounded-md hover:bg-[#0f3a24] transition"
              onClick={() => navigate("/admin/teachers/add")}
            >
              + Add New
            </button>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span>Show</span>

              <select className="border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#124734]">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>

              <span>entries</span>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-3 py-1 rounded-md focus:outline-none
                         focus:ring-2 focus:ring-[#124734] focus:border-[#124734]"
            />
          </div>

          {/* TABLE */}
          <TeachersTable teachers={filteredTeachers} />
        </div>
      </div>
    </div>
  );
}
