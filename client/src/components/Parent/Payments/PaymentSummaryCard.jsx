import { Wallet, CheckCircle, Clock } from "lucide-react";

export default function PaymentSummaryCard({ title, value, icon }) {
  const Icon = icon;

  return (
    <div className="bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-[#E6F4EC] rounded-xl">
        <Icon size={28} className="text-[#124734]" />
      </div>

      <div>
        <p className="text-sm text-[#5B7065]">{title}</p>
        <p className="text-xl font-semibold text-[#124734]">{value}</p>
      </div>
    </div>
  );
}
