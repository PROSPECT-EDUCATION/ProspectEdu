import { User } from "lucide-react";

export default function StudentCard({ student, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer transition"
    >
      <div className="flex items-center gap-4">
        <div className="bg-[#009846]/10 p-3 rounded-full">
          <User className="text-[#009846]" size={26} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#124734]">{student.name}</h3>
          <p className="text-sm text-[#5B7065]">{student.class}</p>
          <p className="text-xs text-[#98A6A2]">Roll: {student.roll}</p>
        </div>
      </div>
    </div>
  );
}
