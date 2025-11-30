import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import { useToast } from "../../context/ToastContext";
export default function AdminEditStudentPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {showToast} = useToast();
  const sidebarWidth = isCollapsed ? 80 : 256;

  // Retrieve passed student data
  const student = location.state?.student;

  useEffect(() => {
    if (!student) navigate("/admin/students");
  }, [student, navigate]);

  // Pre-filled editable data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roll: "",
    className: "",
    mobile: "",
    admission: "",
    parentsName: "",
    parentsMobile: "",
    gender: "",
    address: "",
  });

  // Load existing student values
  useEffect(() => {
    if (student) {
      const fullName = student.name.split(" ");
      setFormData({
        firstName: fullName[0] || "",
        lastName: fullName[1] || "",
        email: student.email,
        roll: student.roll,
        className: student.education,
        mobile: student.mobile,
        admission: student.admission,
        parentsName: "",
        parentsMobile: "",
        gender: "",
        address: "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Student:", formData);
     showToast("Student updated successfully!", "success");
    navigate("/admin/students");
  };

  if (!student) return null;

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
          <AdminTopbar pageTitle="Edit Student" />
        </div>

        {/* PAGE CONTENT */}
        <div className="px-6 pt-[80px] pb-10 overflow-y-auto">

          {/* Breadcrumb */}
          <div className="text-gray-600 text-sm mb-3">
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </span>
            {" / "}
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin/students")}
            >
              Students
            </span>
            {" / "}
            <span className="text-[#124734] font-medium">Edit Student</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-[#124734] mb-6">
            Edit Student Details
          </h2>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-xl shadow-sm p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* First Name */}
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Roll No */}
              <div>
                <label className="text-sm text-gray-600">Roll No</label>
                <input
                  type="text"
                  name="roll"
                  value={formData.roll}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Class */}
              <div>
                <label className="text-sm text-gray-600">Class</label>
                <input
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="text-sm text-gray-600">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              {/* Admission Date */}
              <div>
                <label className="text-sm text-gray-600">Admission Date</label>
                <input
                  type="date"
                  name="admission"
                  value={formData.admission}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

            </div>

            {/* Address */}
            <div className="mt-5">
              <label className="text-sm text-gray-600">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md h-24"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                className="bg-[#124734] text-white px-6 py-2 rounded-md hover:bg-[#0f3a24] transition"
              >
                Update
              </button>

              <button
                type="button"
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
                onClick={() => navigate("/admin/students")}
              >
                Cancel
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
