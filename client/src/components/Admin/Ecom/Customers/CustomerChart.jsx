import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

export default function CustomerChart() {
  const [active, setActive] = useState("This week");

  const metrics = [
    { value: "25k", label: "Active Customers" },
    { value: "5.6k", label: "Repeat Customers" },
    { value: "250k", label: "Shop Visitor" },
    { value: "5.5%", label: "Conversion Rate" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 border border-[#A7E1B2]">

      {/* Top Row */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#124734]">Customer Overview</h2>

        <div className="flex items-center gap-3">
          {/* Toggle buttons */}
          <button
            onClick={() => setActive("This week")}
            className={`px-4 py-1 text-sm rounded-md border 
              ${
                active === "This week"
                  ? "bg-[#124734] text-white border-[#124734]"
                  : "bg-white border-gray-300"
              }`}
          >
            This week
          </button>

          <button
            onClick={() => setActive("Last week")}
            className={`px-4 py-1 text-sm rounded-md border 
              ${
                active === "Last week"
                  ? "bg-[#124734] text-white border-[#124734]"
                  : "bg-white border-gray-300"
              }`}
          >
            Last week
          </button>

          <FiMoreVertical className="text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {metrics.map((item, index) => (
          <div key={index}>
            <h1 className="text-xl font-semibold text-[#124734]">{item.value}</h1>
            <p className="text-gray-500 text-sm">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Chart Background */}
      <div className="h-64 bg-gradient-to-b from-[#ECF5EE] to-white rounded-xl flex items-center justify-center text-gray-500 text-sm">
        Chart will be added here
      </div>

    </div>
  );
}

