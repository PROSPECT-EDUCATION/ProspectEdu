import { Bell } from "lucide-react";

export default function NotificationBell() {
  return (
    <button className="relative p-2 rounded-full hover:bg-[#A7E1B2]/30 transition">
      <Bell size={20} className="text-[#124734]" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-[#009846] rounded-full"></span>
    </button>
  );
}

