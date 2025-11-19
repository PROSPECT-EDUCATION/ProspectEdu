import { Bell, FileCheck, MessageSquare, ClipboardList } from "lucide-react";

export default function NotificationsCard({ notifications = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E6F4EC] p-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-[#124734] mb-4">
        Notifications
      </h2>

      {/* If no notifications */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Bell size={40} className="text-[#A7E1B2] mb-3" />
          <p className="text-lg text-[#124734] font-medium">No New Alerts</p>
          <p className="text-sm text-[#5B7065]">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-4 py-3 rounded-lg border border-[#A7E1B2]/30
                         hover:bg-[#F2FBF6] transition cursor-pointer"
            >
              {/* Dynamic Icons */}
              <div className="bg-[#009846]/10 p-3 rounded-full">
                {note.type === "submission" && (
                  <FileCheck size={22} className="text-[#009846]" />
                )}
                {note.type === "doubt" && (
                  <MessageSquare size={22} className="text-[#009846]" />
                )}
                {note.type === "assessment" && (
                  <ClipboardList size={22} className="text-[#009846]" />
                )}
              </div>

              {/* Notification Text */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-[#124734]">
                  {note.title}
                </p>
                <p className="text-xs text-[#5B7065]">{note.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
