import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/profile.png";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
export default function AdminStudentsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const sidebarWidth = isCollapsed ? 80 : 256;
  const [confirmOpen, setConfirmOpen] = useState(false);
 const [selectedStudent, setSelectedStudent] = useState(null);


  const handleConfirmDelete = () => {
  console.log("Student removed:", selectedStudent);
  setConfirmOpen(false);
};

  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    {
      profile:  profileImg,
      roll: "01",
      name: "Tiger Nixon",
      education: "M.COM., P.H.D.",
      mobile: "123 456 7890",
      email: "info@example.com",
      admission: "2011/04/25",
    },
    {
      profile:  profileImg,
      roll: "02",
      name: "Garrett Winters",
      education: "M.COM., P.H.D.",
      mobile: "987 654 3210",
      email: "info@example.com",
      admission: "2011/07/25",
    },
    {
      profile:  profileImg,
      roll: "03",
      name: "Ashton Cox",
      education: "B.COM., M.COM.",
      mobile: "(123) 4567 890",
      email: "info@example.com",
      admission: "2009/01/12",
    },
    {
      profile:  profileImg,
      roll: "04",
      name: "Cedric Kelly",
      education: "B.COM., M.COM.",
      mobile: "123 456 7890",
      email: "info@example.com",
      admission: "2012/03/29",
    },
  ];

  // ✅ SEARCH FILTER LOGIC (added)
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.education.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
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
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Students" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[70px] pb-10 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start">
            <div className="text-gray-600 text-sm mb-1 mt-1">
              <span
                className="cursor-pointer hover:text-[#124734] transition"
                onClick={() => navigate("/admin-dashboard")}
              >
                Dashboard
              </span>
              {" / "}
              <span className="text-[#124734] font-medium">Students</span>
            </div>
          </div>

          {/* Title + Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#124734]">All Students List</h2>
           <button
  onClick={() => navigate("/admin/students/add")}
  className="bg-[#124734] text-white px-4 py-2 rounded-md hover:bg-[#0f3a24] transition"
>
  + Add New
</button>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mb-4">
            {/* Left: Show Entries */}
            <div className="flex items-center gap-2 text-sm">
              <span>Show</span>

              <select
                className="border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#124734] focus:border-[#124734]"
              >
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>

              <span>entries</span>
            </div>

            {/* Right: Search */}
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
          <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left border-b text-gray-600">
                  <th className="py-3 px-2">Profile</th>
                  <th className="py-3 px-2 ">Roll No.</th>
                  <th className="py-3 px-2 pl-12">Name</th>
                  <th className="py-3 px-2 pl-12">Education</th>
                  <th className="py-3 px-2 pl-12">Mobile</th>
                  <th className="py-3 px-2 pl-14">Email</th>
                  <th className="py-3 px-2 pl-12">Admission Date</th>
                  <th className="py-3 px-2 ">Action</th>
                </tr>
              </thead>

              <tbody>
                {/* 🔥 UPDATED — using filteredStudents */}
                {filteredStudents.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <img
                        src={s.profile}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-3 px-1">{s.roll}</td>
                    <td className="py-3 px-1">{s.name}</td>
                    <td className="py-3 px-1">{s.education}</td>
                    <td className="py-3 px-1">{s.mobile}</td>
                    <td className="py-3 px-1">{s.email}</td>
                    <td className="py-3 px-1">{s.admission}</td>
                    <td className="py-3 px-1 flex gap-3">
                     <button
  className="text-green-600 hover:text-green-800"
  onClick={() =>
    navigate("/admin/students/edit", {
      state: { student: s },   // pass the student object
    })
  }
>
  <FiEdit2 size={18} />
</button>

                     <button
  className="text-red-600 hover:text-red-800"
  onClick={() => {
    setSelectedStudent(s);
    setConfirmOpen(true);
  }}
>
  <RiDeleteBin6Line size={18} />
</button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
      <ConfirmDialog
  open={confirmOpen}
  title="Remove Student"
  message={`Are you sure you want to delete ${selectedStudent?.name}?`}
  onCancel={() => setConfirmOpen(false)}
  onConfirm={handleConfirmDelete}
/>

    </div>
  );
}
