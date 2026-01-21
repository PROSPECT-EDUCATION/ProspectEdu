// src/components/Admin/Students/AddStudent.jsx

import React from "react";

export default function AddStudent() {
  return (
    <div className="bg-white shadow-sm border rounded-xl p-6">

      <h2 className="text-xl font-bold text-[#124734] mb-4">Basic Info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* FIRST NAME */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">First Name</label>
          <input type="text" className="border rounded-md px-3 py-2" />
        </div>

        {/* LAST NAME */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Last Name</label>
          <input type="text" className="border rounded-md px-3 py-2" />
        </div>

        {/* EMAIL */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Email</label>
          <input type="email" className="border rounded-md px-3 py-2" />
        </div>

        {/* REGISTRATION DATE */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Registration Date</label>
          <input type="date" className="border rounded-md px-3 py-2" />
        </div>

        {/* ROLL NO */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Roll No</label>
          <input type="text" className="border rounded-md px-3 py-2" />
        </div>

        {/* CLASS */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Class</label>
          <select className="border rounded-md px-3 py-2">
            <option>Select Class</option>
            <option>10th</option>
            <option>12th</option>
          </select>
        </div>

        {/* GENDER */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Gender</label>
          <select className="border rounded-md px-3 py-2">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* MOBILE */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Mobile Number</label>
          <input type="text" className="border rounded-md px-3 py-2" />
        </div>

        {/* PARENT NAME */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Parents Name</label>
          <input type="text" className="border rounded-md px-3 py-2" />
        </div>

        {/* PARENT MOBILE */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Parents Mobile Number</label>
          <input type="text" className="border rounded-md px-3 py-2" />
        </div>

        {/* BLOOD GROUP */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Blood Group</label>
          <input type="text" className="border rounded-md px-3 py-2" />
        </div>

        {/* ADDRESS — FULL WIDTH */}
        <div className="col-span-2 flex flex-col">
          <label className="text-sm mb-1 text-gray-600">Address</label>
          <textarea className="border rounded-md px-3 py-2 h-24"></textarea>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button className="bg-[#124734] text-white px-4 py-2 rounded-md">
          Submit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
