import { ChevronRight } from "lucide-react";

export default function RoleCard({ title, color }) {
  return (
    <button
      className="w-full text-left px-6 py-4 rounded-md flex justify-between items-center transition-all duration-300 shadow-sm border"
      style={{
        backgroundColor: color,         // Light green card
        borderColor: "#A7E1B2",         // Soft accent border
        color: "#124734",               // Deep green text
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#009846";  // Hover green
        e.currentTarget.style.color = "#FFFFFF";            // White text on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = color;      // Back to light green
        e.currentTarget.style.color = "#124734";            // Deep green text
      }}
    >
      <span className="font-medium">{title}</span>
      <ChevronRight size={20} />
    </button>
  );
}
