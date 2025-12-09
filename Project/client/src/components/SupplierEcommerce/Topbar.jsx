import React from "react";
import { FaShoppingCart } from "react-icons/fa";

import { FaBell, FaSearch, FaStore, FaUserCircle, FaCaretDown } from "react-icons/fa";

export default function SupplierTopbar({ pageTitle }) {
  return (
    <header className="bg-white px-6 py-3 flex items-center justify-between shadow-sm w-full">

      {/* LEFT SECTION */}
      <div className="flex flex-col leading-tight">
       

        <h2 className="text-lg font-semibold text-[#124734] -mt-1">
          {pageTitle || "Your Dashboard Today"}
        </h2>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        

      

        {/* STORE BUTTON */}
        <button
            onClick={() => window.location.href = "/shop"}
      className="flex items-center gap-2 bg-[#A7E1B2]/30 px-4 py-2 rounded-md hover:bg-[#009846]/20 transition"
    >
     <FaShoppingCart size={20} className="text-[#124734]" />

      <span className="font-semibold text-[#124734]">Store</span>
    </button>



        {/* PROFILE ICON */}
        <button className="p-2 bg-[#A7E1B2]/40 rounded-full hover:bg-[#A7E1B2]">
          <FaUserCircle className="text-[#124734]" size={24} />
        </button>

      </div>
    </header>
  );
}
