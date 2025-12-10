import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default function SupplierTopbar({ pageTitle }) {
  return (
    <header
      className="bg-white px-4 md:px-6 py-3 flex items-center justify-between shadow-sm w-full 
      sticky top-0 z-40"
    >
      {/* LEFT SECTION */}
      <div className="flex flex-col leading-tight">
        <h2 className="text-base md:text-lg font-semibold text-[#124734]">
          {pageTitle || "Your Dashboard Today"}
        </h2>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* STORE BUTTON */}
        <button
          onClick={() => window.location.href = "/shop"}
          className="flex items-center gap-2 bg-[#A7E1B2]/30 px-3 md:px-4 py-2 
          rounded-md hover:bg-[#009846]/20 transition text-sm md:text-base"
        >
          <FaShoppingCart size={18} className="text-[#124734]" />
          <span className="font-semibold text-[#124734] hidden sm:inline">
            Store
          </span>
        </button>

        {/* PROFILE ICON */}
        <button className="p-2 bg-[#A7E1B2]/40 rounded-full hover:bg-[#A7E1B2]">
          <FaUserCircle className="text-[#124734]" size={22} />
        </button>

      </div>
    </header>
  );
}
