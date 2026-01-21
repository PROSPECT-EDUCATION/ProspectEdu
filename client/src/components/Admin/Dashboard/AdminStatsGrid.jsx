import React from "react";

export default function AdminStatsGrid({ index }) {
  const stats = [
    {
      title: "Total Students",
      value: "3280",
      progress: "80%",
      barColor: "#1D5C3F",
      text: "80% Increase in 20 Days",
    },
    {
      title: "New Students",
      value: "245",
      progress: "50%",
      barColor: "#E53935",
      text: "50% Increase in 25 Days",
    },
    {
      title: "Total Courses",
      value: "28",
      progress: "76%",
      barColor: "#8BC34A",
      text: "76% Increase in 20 Days",
    },
    {
      title: "Fees Collection",
      value: "25160$",
      progress: "30%",
      barColor: "#4CAF50",
      text: "30% Increase in 30 Days",
    },
  ];

  const item = stats[index];

  return (
  <div className="bg-white rounded-2xl shadow-md p-6 h-[160px] flex flex-col justify-between">

      {/* Title */}
      <h3 className="text-lg font-semibold text-[#124734]">{item.title}</h3>

      {/* Value */}
      <p className="text-3xl font-bold text-[#124734]">{item.value}</p>

      {/* Progress */}
      <div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full rounded-full"
            style={{
              width: item.progress,
              backgroundColor: item.barColor,
            }}
          ></div>
        </div>

        <p className="text-sm text-gray-600 mt-2">{item.text}</p>
      </div>
    </div>
  );
}
