import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-[#A7E1B2]/30 transition"
      >
        <Bell size={20} className="text-[#124734]" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-[#009846] rounded-full"></span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-[#A7E1B2]/40 rounded-md p-4 text-sm text-[#124734]">
          No new notifications
        </div>
      )}
    </div>
  );
}
