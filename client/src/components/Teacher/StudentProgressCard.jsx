import { MessageSquare } from "lucide-react";

export default function StudentsProgressCard({ students = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E6F4EC] p-6 mt-6">

      {/* Title Row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#124734]">Students</h2>
      </div>

      {/* Table Header */}
      <div
        className="
          grid grid-cols-2 md:grid-cols-4 
          bg-[#F2F5F3] py-2 px-4 rounded-md 
          text-sm font-semibold text-[#124734] gap-y-2
        "
      >
        <p>Student</p>
        <p className="text-center md:block hidden">Progress</p>
        <p className="text-center md:block hidden">Completion</p>
        <p className="text-center md:block hidden">Comments</p>

        {/* Mobile extra headers */}
        <p className="text-center md:hidden">Progress</p>
        <p className="text-center md:hidden">Completion</p>
      </div>

      {/* Student Rows */}
      <div className="divide-y divide-[#E6F4EC]">
        {students.map((s, index) => (
          <div
            key={index}
            className="
              grid grid-cols-2 md:grid-cols-4 
              py-3 px-4 text-sm items-center gap-y-3
            "
          >
            {/* Student Name */}
            <p className="font-medium text-[#124734]">{s.name}</p>

            {/* Progress Bar */}
            <div className="flex justify-center">
              <div className="w-24 h-[6px] bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#009846] rounded-full"
                  style={{ width: `${s.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Percentage */}
            <p className="text-center text-[#124734] font-medium">
              {s.progress}%
            </p>

            {/* Comments */}
            <div className="flex justify-center">
              <MessageSquare
                size={18}
                className="text-[#5B7065] cursor-pointer hover:text-[#009846]"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
