import { FileText, ShoppingBag, Mic } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      icon: <FileText size={20} className="text-[#009846]" />,
      title: "Answer Writing",
      time: "11th Nov 2025, 1:55 PM",
    },
    {
      icon: <ShoppingBag size={20} className="text-[#2C2E8A]" />,
      title: "Orders",
      time: "12th Nov 2025, 11:24 AM",
    },
    {
      icon: <Mic size={20} className="text-[#009846]" />,
      title: "Doubts",
      time: "12th Nov 2025, 11:24 AM",
    },
  ];

  return (
    <aside className="bg-white rounded-lg shadow-sm p-4 h-full border border-[#E6F4EC]">
      <h3 className="text-lg font-semibold text-[#124734] mb-4">
        Recent Activity
      </h3>

      <div className="flex flex-col gap-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-md hover:bg-[#F5FBF7] transition-all duration-200 cursor-pointer"
          >
            <div className="p-2 bg-[#E6F4EC] rounded-md">{activity.icon}</div>
            <div>
              <p className="text-sm font-medium text-[#124734]">{activity.title}</p>
              <p className="text-xs text-[#5B7065]">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
