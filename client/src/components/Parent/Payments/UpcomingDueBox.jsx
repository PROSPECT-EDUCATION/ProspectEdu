import { CreditCard } from "lucide-react";

export default function UpcomingDueBox() {
  return (
    <div
      className="
        bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm
        w-full 
      "
    >
      <div className="flex items-center justify-center gap-3 mb-3">
        <CreditCard className="text-[#009846]" />
        <h3 className="text-lg font-semibold text-[#124734]">
          Payment Status
        </h3>
      </div>

      <div className="bg-[#F8FFFA] p-4 rounded-lg border border-[#E6F4EC]">
        <p className="text-sm text-[#5B7065]">Next Fee Due</p>
        <p className="text-lg font-semibold text-[#124734] mt-1">₹ 12,500</p>
        <p className="text-xs text-[#D64545] mt-1">Due in 7 days</p>
      </div>
    </div>
  );
}
