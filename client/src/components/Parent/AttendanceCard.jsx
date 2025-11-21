import { Calendar } from "lucide-react";

export default function AttendanceCard({ student }) {
  return (
    <div className="bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Calendar className="text-[#009846]" />
        <h3 className="text-lg font-semibold text-[#124734]">Attendance</h3>
      </div>

      <p className="text-sm text-[#5B7065]">
        Attendance summary for {student.name}
      </p>

      <div className="mt-4">
        <p className="text-2xl font-semibold text-[#124734]">92%</p>
        <p className="text-xs text-[#5B7065]">This month</p>
      </div>
    </div>
  );
}
