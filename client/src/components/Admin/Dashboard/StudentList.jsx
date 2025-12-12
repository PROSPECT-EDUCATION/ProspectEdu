import React, { useState } from "react";


export default function StudentList() {
  const students = [
    {
      name: "Angelica Ramos",
      coach: "Ashton Cox",
      date: "12 August 2021",
      time: "10:15",
    },
    {
      name: "Bradley Greer",
      coach: "Brenden Wagner",
      date: "11 July 2021",
      time: "10:00",
    },
    {
      name: "Cedric Kelly",
      coach: "Brielle Williamson",
      date: "10 May 2021",
      time: "09:45",
    },
    {
      name: "Caesar Vance",
      coach: "Herrod Chandler",
      date: "09 April 2021",
      time: "09:30",
    },
    {
      name: "Rhona Davidson",
      coach: "Sonya Frost",
      date: "08 March 2021",
      time: "09:15",
    },
  ];
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

const toggleMenu = (index) => {
  setOpenMenuIndex(openMenuIndex === index ? null : index);
};


  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold text-[#124734] mb-4">
        Student List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-[#124734]">
              <th className="py-3 px-3"></th>
              <th className="py-3 px-3 font-semibold">Student Name</th>
              <th className="py-3 px-3 font-semibold">Assigned Coach</th>
              <th className="py-3 px-3 font-semibold">Date</th>
              <th className="py-3 px-3 font-semibold">Time</th>
              <th className="py-3 px-3 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-[#F1F7F4] transition"
              >
                <td className="py-3 px-3">
                  <input type="checkbox" className="cursor-pointer accent-[#124734]" />
                </td>

                <td className="py-3 px-3">{s.name}</td>
                <td className="py-3 px-3">{s.coach}</td>
                <td className="py-3 px-3">{s.date}</td>
                <td className="py-3 px-3">{s.time}</td>

               <td className="py-3 px-3 relative">
  <span
    onClick={() => toggleMenu(idx)}
    className="text-gray-600 cursor-pointer text-xl select-none"
  >
    ⋮
  </span>

  {/* DROPDOWN MENU */}
  {openMenuIndex === idx && (
    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
      <button className="w-full text-left px-4 py-2 hover:bg-[#F1F7F4] text-[#124734]">
        Accept
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-[#F1F7F4] text-[#124734]">
        Detail
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500">
        Cancel
      </button>
    </div>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
