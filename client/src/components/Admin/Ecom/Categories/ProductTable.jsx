import React from "react";
import ProductRow from "./ProductRow";
import products from "../../../../data/products"; 
import { FiSearch, FiSliders, FiMoreHorizontal } from "react-icons/fi";

export default function ProductTable() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      
      {/* Top bar with search + icons */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-3">
          {/* Tabs handled above */}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search your product"
              className="border px-4 py-2 rounded-lg w-64"
            />
            <FiSearch className="absolute right-3 top-3 text-gray-600" />
          </div>

          <button className="p-2 border rounded-lg">
            <FiSliders />
          </button>

          <button className="p-2 border rounded-lg">
            <FiMoreHorizontal />
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#ECF5EE] text-left">
            <th className="p-3 text-center"></th>
            <th className="p-3 text-center">No.</th>
            <th className="p-3">Product</th>
            <th className="p-3 text-center">Created Date</th>
            <th className="p-3 text-center">Order</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, i) => (
            <ProductRow key={p.id} item={p} index={i + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
