import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerRow({ item }) {
  const navigate = useNavigate();

  return (
    <tr
      className="border-t hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/admin/ecom/customers/${item.id}`)}
    >
      <td className="p-3">{item.customerId}</td>
      <td className="p-3">{item.name}</td>
      <td className="p-3">{item.phone}</td>
      <td className="p-3">{item.orderCount}</td>
      <td className="p-3">₹{item.totalSpend}</td>

      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-xs 
          ${
            item.status === "Active"
              ? "bg-green-100 text-green-700"
              : item.status === "VIP"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {item.status}
        </span>
      </td>

      <td className="p-3">⋮</td>
    </tr>
  );
}
