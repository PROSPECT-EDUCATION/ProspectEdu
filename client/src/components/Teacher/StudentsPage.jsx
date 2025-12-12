import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StudentProfileModal from "./StudentProfileModal"; 
export default function StudentsPage() {
  const navigate = useNavigate();
const [selectedStudent, setSelectedStudent] = useState(null);
  const students = [
    {
      name: "Riya Sharma",
      email: "riya@gmail.com",
      progress: 80,
      lastActive: "2025-01-16",
    },
    {
      name: "Aman Verma",
      email: "aman.v@gmail.com",
      progress: 20,
      lastActive: "2025-01-12",
    },
  ];

  return (
    <div className="px-2">

      {/* Breadcrumb */}
      <p className="text-sm text-[#5B7065] mb-3">
        <span
          className="hover:text-[#009846] cursor-pointer hover:underline"
          onClick={() => navigate("/teacher-dashboard")}
        >
          Dashboard
        </span>{" "}
        /{" "}
        <span
          className="hover:text-[#009846] cursor-pointer hover:underline"
          onClick={() => navigate("/teacher/courses")}
        >
          Courses
        </span>{" "}
        /{" "}
        <span className="text-[#124734] font-medium">Students</span>
      </p>

      <h2 className="text-2xl font-semibold text-[#124734] mb-5">
        Enrolled Students
      </h2>

      {/* Students Table */}
      <div className="bg-white border border-[#A7E1B2] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E6F4EC] text-[#124734]">
              <th className="p-3 border">Student</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Progress</th>
              <th className="p-3 border">Last Active</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={i} className="text-[#5B7065] hover:bg-[#F9FAFB] transition">
                <td className="p-3 border">{s.name}</td>
                <td className="p-3 border">{s.email}</td>

                <td className="p-3 border">
                  <div className="w-full bg-[#E6F4EC] h-2 rounded-full">
                    <div
                      className="bg-[#009846] h-2 rounded-full"
                      style={{ width: `${s.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs ml-1">{s.progress}%</span>
                </td>

                <td className="p-3 border">{s.lastActive}</td>

                <td className="p-3 border flex gap-3">
                 <button
  className="text-[#009846] hover:underline"
  onClick={() => setSelectedStudent(s)}
>
  View Profile
</button>
                  <button className="text-red-500 hover:underline">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
{selectedStudent && (
  <StudentProfileModal
    student={selectedStudent}
    onClose={() => setSelectedStudent(null)}
  />
)}
        {students.length === 0 && (
          <p className="text-center p-4 text-[#5B7065]">
            No students enrolled yet.
          </p>
        )}
      </div>

    </div>
  );
}
