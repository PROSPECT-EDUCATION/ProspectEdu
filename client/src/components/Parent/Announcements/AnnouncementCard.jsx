import { Calendar, ChevronRight, Megaphone } from "lucide-react";

const categoryColors = {
  Exams: "bg-[#D7F2E4] text-[#124734]",      // soft green
  PTA: "bg-[#DDE9FF] text-[#124734]",        // soft blue
  Holiday: "bg-[#FFF0D7] text-[#8B5E00]",    // soft yellow
  Homework: "bg-[#F3E8FF] text-[#5B2A9A]",   // soft purple
  Events: "bg-[#E7F5FF] text-[#0B4F79]",     // teal blue
  Urgent: "bg-[#FFE0E0] text-[#B20000]",     // soft red
};

export default function AnnouncementCard({ a, onClick }) {
  const categoryStyle = categoryColors[a.category] || "bg-[#E6F4EC] text-[#124734]";

  return (
    <div
      onClick={() => onClick(a)}
      className="bg-white border-2 border-[#E6F4EC] rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer transition transform hover:-translate-y-[2px]"
    >
      {/* ICON + TITLE */}
      <div className="flex items-start gap-3">
        <Megaphone size={24} className="text-[#009846] mt-1" />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#124734]">{a.title}</h3>

          {/* CATEGORY */}
          <span
            className={`inline-block mt-1 px-3 py-[2px] text-xs font-medium rounded-full ${categoryStyle}`}
          >
            {a.category}
          </span>
        </div>

        <ChevronRight className="text-[#124734]" />
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-[#5B7065] mt-3 line-clamp-2">
        {a.description}
      </p>

      {/* DATE + TIME */}
      <div className="flex items-center gap-2 text-xs mt-3 text-[#98A6A2]">
        <Calendar size={14} />
        <span>{a.date}</span>
        <span>•</span>
        <span>{a.time}</span>
      </div>
    </div>
  );
}
