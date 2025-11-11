import { ChevronRight } from "lucide-react";

export default function RoleCard({ title, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-6 py-4 rounded-md font-medium flex justify-between items-center transition duration-300"
      style={{
        backgroundColor: color,
      }}
    >
      <span className="text-[#124734]">{title}</span>
      <span className="text-[#124734] text-lg">›</span>
    </button>
  );
}

