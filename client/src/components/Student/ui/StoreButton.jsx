import { ShoppingCart } from "lucide-react";

export default function StoreButton() {
  return (
    <button className="flex items-center gap-2 bg-[#A7E1B2]/30 px-4 py-2 rounded-md hover:bg-[#009846]/20 transition">
      <ShoppingCart size={18} className="text-[#124734]" />
      <span className="font-semibold text-[#124734]">Store</span>
    </button>
  );
}
