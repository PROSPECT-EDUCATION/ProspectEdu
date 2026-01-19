// src/components/Student/DashboardStats.jsx
import { BookOpen, PlayCircle, FileText, MonitorPlay } from "lucide-react";

export default function DashboardStats() {
  const stats = [
    {
      title: "Enrolled Courses",
      value: 0,
      icon: <BookOpen size={22} className="text-[#2C2E8A]" />,
      bg: "bg-[#E6E8FA]",
    },
    {
      title: "Lecture Watch",
      value: 0,
      icon: <PlayCircle size={22} className="text-[#009846]" />,
      bg: "bg-[#E8F8EF]",
    },
    {
      title: "My Submission",
      value: 0,
      icon: <FileText size={22} className="text-[#F7A600]" />,
      bg: "bg-[#FEF6E8]",
    },
    {
      title: "Live Classes",
      value: 0,
      icon: <MonitorPlay size={22} className="text-[#8A8AFF]" />,
      bg: "bg-[#EEF0FF]",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold text-[#124734] mb-4">
        Dashboard Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-lg p-4 ${s.bg} shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <div>
              <p className="text-sm font-medium text-[#333]">{s.title}</p>
              <h3 className="text-xl font-bold text-[#124734] mt-1">
                {s.value}
              </h3>
            </div>
            <div className="p-3 bg-white rounded-full shadow-sm">{s.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

