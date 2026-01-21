import React, { useState } from "react";
import { useToast } from "../../../context/ToastContext";

export default function AddTeacherForm() {
  const { showToast } = useToast();   // ✅ use the ToastContext

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    department: "",
    gender: "",
    education: "",
    mobile: "",
    email: "",
    joiningDate: "",
    salary: "",
    address: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Teacher Data:", form);

    // ✅ Show success toast globally
    showToast("Teacher added successfully!", "success");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">

      {/* SECTION TITLE */}
      <h2 className="text-xl font-semibold text-[#124734] mb-4">
        Basic Info
      </h2>

      {/* FORM GRID */}
      <div className="grid grid-cols-2 gap-6">
        
        {/* First Name */}
        <div>
          <label className="text-sm text-gray-600">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-sm text-gray-600">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
          />
        </div>

        {/* Department */}
        <div>
          <label className="text-sm text-gray-600">Department</label>
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm text-gray-600">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="text-sm text-gray-600">Education</label>
          <input
            type="text"
            name="education"
            value={form.education}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm text-gray-600">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
          />
        </div>

        {/* Joining Date */}
        <div>
          <label className="text-sm text-gray-600">Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="text-sm text-gray-600">Salary</label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
          />
        </div>

      </div>

      {/* Address */}
      <div className="mt-4">
        <label className="text-sm text-gray-600">Address</label>
        <textarea
          name="address"
          rows="3"
          value={form.address}
          onChange={handleChange}
          className="border w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-[#124734]"
        ></textarea>
      </div>

      {/* Photo Upload */}
      <div className="mt-4">
        <label className="text-sm text-gray-600">Upload Photo</label>
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          className="border w-full px-3 py-2 rounded-md"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="bg-[#124734] text-white px-6 py-2 rounded-md hover:bg-[#0f3a24] transition"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
