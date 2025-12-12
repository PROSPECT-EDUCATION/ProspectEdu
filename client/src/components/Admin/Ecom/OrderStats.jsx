import React from "react";

export default function OrderStats() {
  const stats = [
    { label: "Total Orders", value: 1240, change: "+14.4%", color: "text-[#009846]" },
    { label: "New Orders", value: 240, change: "+20%", color: "text-[#009846]" },
    { label: "Completed Orders", value: 960, change: "+8.5%", color: "text-[#009846]" },
    { label: "Cancelled Orders", value: 87, change: "-5%", color: "text-red-500" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label}
          className="bg-white p-5 rounded-xl shadow flex flex-col">
          
          <p className="text-sm text-gray-600">{s.label}</p>
          <h2 className="text-2xl font-bold text-[#124734]">{s.value}</h2>
          <span className={`text-xs ${s.color}`}>{s.change}</span>
        </div>
      ))}
    </div>
  );
}
