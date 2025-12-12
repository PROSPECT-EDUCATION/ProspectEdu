import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderRow({ index, item }) {
  const navigate = useNavigate();

  return (
    <tr
      className="border-t text-sm hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/admin/ecom/orders/${item.id}`)}
    >
      <td className="p-3 text-center">{index}</td>
      <td className="p-3 text-center">{item.orderId}</td>

      <td className="p-3 flex  gap-4 ">
        <img src={item.img} className="w-8 h-8 rounded" />
        {item.product}
      </td>

      <td className="p-3 text-center">{item.date}</td>
      <td className="p-3 text-center">₹{item.price}</td>

      <td className="p-3 text-center">
        <span
          className={`text-sm ${
            item.payment === "Paid" ? "text-[#009846]" : "text-red-500"
          }`}
        >
          ● {item.payment}
        </span>
      </td>

      <td className="p-3 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs 
            ${item.status === "Delivered" && "bg-green-100 text-green-700"}
            ${item.status === "Pending" && "bg-yellow-100 text-yellow-600"}
            ${item.status === "Shipped" && "bg-blue-100 text-blue-600"}
            ${item.status === "Cancelled" && "bg-red-100 text-red-600"}
          `}
        >
          {item.status}
        </span>
      </td>
    </tr>
  );
}
