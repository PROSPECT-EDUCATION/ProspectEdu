import { CheckCircle, BarChart2, User } from "lucide-react";

export default function PerformanceStats({ metrics }) {
  const cards = [
    {
      label: "Avg Assignment",
      value: metrics.avgAssignment + "%",
      icon: <CheckCircle size={18} className="text-[#124734]" />,
      bg: "bg-[#F5FBF7]",
    },
    {
      label: "Avg Quiz",
      value: metrics.avgQuiz + "%",
      icon: <BarChart2 size={18} className="text-[#124734]" />,
      bg: "bg-[#F9FAFB]",
    },
    {
      label: "Course Completion",
      value: metrics.completionRate + "%",
      icon: <User size={18} className="text-[#124734]" />,
      bg: "bg-[#F5FFF2]",
    },
    {
      label: "Active Students",
      value: metrics.activeCount,
      icon: <User size={18} className="text-[#124734]" />,
      bg: "bg-[#FFFDF6]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      {cards.map((c, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border border-[#E6F4EA] ${c.bg}`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-white border border-[#DFF6E6]">
              {c.icon}
            </div>
            <div>
              <div className="text-xs text-[#5B7065]">{c.label}</div>
              <div className="text-lg font-semibold text-[#124734]">{c.value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

