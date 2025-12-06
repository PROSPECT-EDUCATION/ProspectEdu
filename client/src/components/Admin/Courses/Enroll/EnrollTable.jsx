import React, { useState } from "react";
import EnrollRow from "./EnrollRow";

export default function EnrollTable() {
  const [search, setSearch] = useState("");

  // Dummy enrollment data
  const [enrolled, setEnrolled] = useState([
    {
      id: 1,
      roll: "101",
      name: "Riya Sharma",
      course: "quantity-surveying",
      date: "01 Dec 2024",
    },
    {
      id: 2,
      roll: "102",
      name: "Aman Verma",
      course: "project-management",
      date: "05 Dec 2024",
    },
  ]);

  return (
    <div className="bg-white shadow rounded-xl p-6">
      {/* Top Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <span>Search:</span>
          <input
            type="text"
            className="border px-3 py-1 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full border">
      <thead>
  <tr className="bg-[#ECF5EE] text-left">
    <th className="p-3  text-center w-40">Roll No</th>
    <th className="p-3  text-center w-40">Name</th>
    <th className="p-3  text-center w-40">Course</th>
    <th className="p-3  text-center w-40">Date</th>
    <th className="p-3 text-center w-32">Actions</th>
  </tr>
</thead>


        <tbody>
          {enrolled
            .filter((s) =>
              s.name.toLowerCase().includes(search.toLowerCase()) ||
              s.roll.includes(search)
            )
            .map((student) => (
              <EnrollRow key={student.id} student={student} setEnrolled={setEnrolled} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
