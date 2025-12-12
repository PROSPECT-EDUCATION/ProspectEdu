import { AlertTriangle } from "lucide-react";

export default function AlertsCard({ student }) {
  return (
    <div className="bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-3">
        <AlertTriangle className="text-[#D64545]" />
        <h3 className="text-lg font-semibold text-[#124734]">Alerts</h3>
      </div>

      <ul className="space-y-3 text-sm text-[#5B7065]">
        <li>⚠ Missing Assignment: Science Project</li>
        <li>⚠ Low Engagement: English Course</li>
        <li>⚠ Test Scheduled: Math on Friday</li>
      </ul>
    </div>
  );
}
