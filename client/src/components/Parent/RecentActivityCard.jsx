import { Clock } from "lucide-react";

export default function RecentActivityCard({ student }) {
  return (
    <div className="bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-3">
        <Clock className="text-[#009846]" />
        <h3 className="text-lg font-semibold text-[#124734]">Recent Activity</h3>
      </div>

      <ul className="space-y-3 text-sm text-[#5B7065]">
        <li>• Submitted Assignment 2</li>
        <li>• Scored 85% in Quiz 4</li>
        <li>• Watched 3 modules today</li>
        <li>• Teacher: Good improvement!</li>
      </ul>
    </div>
  );
}
