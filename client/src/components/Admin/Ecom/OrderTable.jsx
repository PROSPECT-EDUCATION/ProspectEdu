import React from "react";
import orders from "../../../data/order";
import OrderRow from "./OrderRow";

export default function OrderTable({ active, page, search, itemsPerPage = 10 }) {

  // ⭐ Search + Filter Logic
  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (active === "All Orders") return true;
    if (active === "Completed") return o.status === "Delivered";
    if (active === "Pending") return o.status === "Pending";
    if (active === "Cancelled") return o.status === "Cancelled";

    return true;
  });

  // ⭐ Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = filtered.slice(startIndex, endIndex);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <table className="w-full">
        <thead>
          <tr className="bg-[#ECF5EE] text-left">
            <th className="p-3 text-center">No.</th>
            <th className="p-3 text-center">Order ID</th>
            <th className="p-3 text-center">Product</th>
            <th className="p-3 text-center">Date</th>
            <th className="p-3 text-center">Price</th>
            <th className="p-3 text-center">Payment</th>
            <th className="p-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((o, i) => (
            <OrderRow
              key={o.id}
              index={startIndex + i + 1}   // Proper numbering across pages
              item={o}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
