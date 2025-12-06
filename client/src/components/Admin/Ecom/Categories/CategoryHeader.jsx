import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export default function CategoryHeader({ onAddCategory }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold text-[#124734]">Discover</h1>

      <div className="flex items-center gap-3">
       
        <button
          className="bg-[#124734] text-white px-4 py-2 rounded-md"
          onClick={onAddCategory}   // ⭐ TRIGGER MODAL
        >
          Add Category
        </button>
         <button className="bg-[#124734] text-white px-4 py-2 rounded-md">
          Edit Category 
        </button>

      </div>
    </div>
  );
}
