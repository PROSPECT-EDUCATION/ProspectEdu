import { AlertTriangle } from "lucide-react";

export default function UpcomingDueBox({ due }) {
  if (!due) return null;

  return (
    <div className="bg-[#FFF8E1] border border-[#FFE7A0] rounded-xl p-5 mt-5 shadow-sm">
      <div className="flex items-center gap-3">
        <AlertTriangle className="text-[#C47E00]" />

        <div>
          <h3 className="text-lg font-semibold text-[#8B5E00]">Upcoming Due</h3>
          <p className="text-[#8B5E00] mt-1">{due}</p>
        </div>
      </div>
    </div>
  );
}
