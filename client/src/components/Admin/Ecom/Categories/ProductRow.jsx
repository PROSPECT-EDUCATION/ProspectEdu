import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function ProductRow({ item, index }) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3 text-center">
        <input type="checkbox" />
      </td>

      <td className="p-3 text-center">{index}</td>

      <td className="p-3 flex items-center gap-3">
        <img src={item.img} className="w-10 h-10 rounded" />
        <span>{item.product}</span>
      </td>

      <td className="p-3 text-center">{item.date}</td>
      <td className="p-3 text-center">{item.order}</td>

      <td className="p-3 text-center flex items-center justify-center gap-3">
        <FiEdit className="cursor-pointer text-[#124734]" />
        <FiTrash2 className="cursor-pointer text-red-500" />
      </td>
    </tr>
  );
}
