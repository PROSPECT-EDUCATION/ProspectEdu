// src/pages/Student/EditProfile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";

export default function EditProfile() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#124734] transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Topbar */}
        <div
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="My Profile" />
        </div>

        {/* Subheader */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] border-b border-[#E6F4EC] px-4 py-2 z-[998]"
          style={{ left: sidebarWidth }}
        >
            <div className="w-full flex flex-col items-start ">
          {/* Breadcrumb */}
          <p className="text-sm text-[#5B7065] mb-2">
            <span
              className="cursor-pointer hover:text-[#009846] hover:underline"
              onClick={() => navigate("/student-dashboard")}
            >
              Home
            </span>{" "}
            / Profile /{" "}
            <span className="text-[#124734] font-medium">
              {activeTab === "basic" ? "Basic Details" : "Education Details"}
            </span>
          </p>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#E6F4EC]">
            <button
              onClick={() => setActiveTab("basic")}
              className={`pb-2 text-sm font-medium ${
                activeTab === "basic"
                  ? "text-[#009846] border-b-2 border-[#009846]"
                  : "text-[#5B7065]"
              }`}
            >
              Basic Details
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`pb-2 text-sm font-medium ${
                activeTab === "education"
                  ? "text-[#009846] border-b-2 border-[#009846]"
                  : "text-[#5B7065]"
              }`}
            >
              Education Details
            </button>
          </div>
        </div>
        </div>
        {/* Main Form Area */}
        <main
          className="flex-1 overflow-y-auto px-1 py-0"
          style={{ marginTop: "80px" }}
        >
          {/* BASIC DETAILS FORM */}
          {activeTab === "basic" && (
            <div className="max-w-3xl  bg-white p-5 rounded-xl shadow-sm border border-[#E6F4EC] ml-4">
              <h2 className="text-2xl font-heading text-[#124734] mb-2">
                Basic Details
              </h2>
              <p className="text-sm text-[#5B7065] mb-6">
                Edit your Basic Details in the fields below
              </p>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">* Name</label>
                  <input
                    type="text"
                    defaultValue="Pratima Kumari"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">* Select Gender</label>
                  <select className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none">
                    <option>Others</option>
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>

                {/* Interested */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">* Interested</label>
                  <select className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none">
                    <option>Please select your interest</option>
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">
                    * Highest Education
                  </label>
                  <select className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none">
                    <option>Please select your Education</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">* Email Address</label>
                  <input
                    type="email"
                    defaultValue="kumaripratima337@gmail.com"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 bg-[#F3F3F3] outline-none"
                    readOnly
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm mb-1 text-[#124734]">* Phone Number</label>
                  <input
                    type="text"
                    defaultValue="+91 9876543210"
                    className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
                  />
                </div>

                {/* Update Button */}
                <button className="mt-8 px-6 py-3 bg-[#009846] text-white rounded-md shadow-sm hover:bg-[#007d39] transition text-sm font-medium">
                  Update Basic Details
                </button>
              </div>
            </div>
          )}

          {/* EDUCATION TAB PLACEHOLDER */}
          {activeTab === "education" && (
  <div className="max-w-5xl  bg-white p-8 rounded-xl shadow-sm border border-[#E6F4EC] ml-4">
    <h2 className="text-2xl font-heading text-[#124734] mb-2">
      Education Details
    </h2>

    <p className="text-sm text-[#5B7065] mb-6">
      Edit your Education Details in below fields
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Currently Pursuing */}
      <div>
        <label className="block text-sm mb-1 text-[#124734]">
          * Currently Pursuing
        </label>
        <input
          type="text"
          className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
        />
      </div>

      {/* Preparing For */}
      <div>
        <label className="block text-sm mb-1 text-[#124734]">
          * Preparing For
        </label>
        <input
          type="text"
          className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
        />
      </div>

      {/* Occupation */}
      <div>
        <label className="block text-sm mb-1 text-[#124734]">
          * Occupation
        </label>
        <input
          type="text"
          className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
        />
      </div>

      {/* Last Exam Name */}
      <div>
        <label className="block text-sm mb-1 text-[#124734]">
          * Last Exam Name
        </label>
        <input
          type="text"
          className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
        />
      </div>

      {/* Last Exam Year */}
      <div>
        <label className="block text-sm mb-1 text-[#124734]">
          * Last Exam Year
        </label>
        <input
          type="text"
          className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
        />
      </div>

      {/* How long preparing */}
      <div>
        <label className="block text-sm mb-1 text-[#124734]">
          * How long you are preparing for
        </label>
        <input
          type="text"
          className="w-full border border-[#A7E1B2] rounded-lg px-4 py-2 outline-none"
        />
      </div>
    </div>

    {/* Button */}
    <button className="mt-8 px-6 py-3 bg-[#009846] text-white rounded-md shadow-sm hover:bg-[#007d39] transition text-sm font-medium">
      Update Education Details
    </button>
  </div>
)}
        </main>
      </div>
    </div>
  );
}
