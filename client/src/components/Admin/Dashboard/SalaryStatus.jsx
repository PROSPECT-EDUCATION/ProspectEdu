import React, { useState } from "react";

export default function SalaryStatus() {
  const [activeTab, setActiveTab] = useState("professors");

  const professors = [
    { name: "Angelica Ramos", status: "Paid", date: "12 August 2021", amount: "$100", transaction: "#42317" },
    { name: "Bradley Greer", status: "Unpaid", date: "11 July 2021", amount: "$200", transaction: "#54682" },
    { name: "Cedric Kelly", status: "Pending", date: "10 May 2021", amount: "$400", transaction: "#57894" },
    { name: "Caesar Vance", status: "Unpaid", date: "09 April 2021", amount: "$300", transaction: "#57864" },
    { name: "Rhona Davidson", status: "Pending", date: "08 March 2021", amount: "$500", transaction: "#56387" },
  ];

  const others = [
    { name: "David Warner", status: "Paid", date: "10 June 2021", amount: "$120", transaction: "#88213" },
  ];

  const rows = activeTab === "professors" ? professors : others;

  const getColor = (status) => {
    switch (status) {
      case "Paid": return "bg-[#4CAF50] text-white";
      case "Pending": return "bg-[#FFB300] text-white";
      case "Unpaid": return "bg-[#E53935] text-white";
      default: return "bg-gray-300";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-6">
      {/* Title */}
      <h2 className="text-center text-2xl font-bold text-[#124734] mb-3">Salary Status</h2>

      {/* TABS */}
      <div className="flex gap-6 border-b border-gray-300 text-sm mb-3">
        <button
          onClick={() => setActiveTab("professors")}
          className={`pb-2 ${activeTab === "professors" ? "text-[#124734] border-b-2 border-[#124734]" : "text-gray-500"}`}
        >
          Professors
        </button>

        <button
          onClick={() => setActiveTab("other")}
          className={`pb-2 ${activeTab === "other" ? "text-[#124734] border-b-2 border-[#124734]" : "text-gray-500"}`}
        >
          Other
        </button>
      </div>

      {/* TABLE - FORCED FIXED LAYOUT */}
      <div className="overflow-x-auto">
        <table
          className="w-full text-sm box-border"
          style={{
            tableLayout: "fixed",
            borderCollapse: "collapse",
          }}
        >
          {/* Explicit, inline widths (browser-respected) */}
          <colgroup>
            <col style={{ width: "60px" }} />
            <col style={{ width: "320px" }} />
            <col style={{ width: "120px" }} />
            <col style={{ width: "180px" }} />
            <col style={{ width: "120px" }} />
            <col style={{ width: "140px" }} />
          </colgroup>

         <thead>
  <tr className="text-gray-600" style={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
    <th className="py-3 px-4 text-left">S.No.</th>
    <th className="py-3 px-4 text-left">Name</th>

    {/* Shift these headings slightly right */}
    <th className="py-3 px-4 pl-12 text-left">Status</th>
    <th className="py-3 px-4 pl-20 text-left">Date</th>
    <th className="py-3 px-4 pl-12 text-left">Amount</th>
    <th className="py-3 px-4 pl-6 text-left">Transaction ID</th>
  </tr>
</thead>


          <tbody className="[&>tr>td]:align-middle">
  {rows.map((row, idx) => (
    <tr
      key={idx}
      className="border-b"
      style={{ display: "table-row", verticalAlign: "middle" }}
    >
      <td className="py-3 px-4">{idx + 1}</td>

      <td className="py-3 px-4 flex items-center gap-3 whitespace-nowrap">
        <div className="h-9 w-9 border border-[#124734] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#124734" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.93 17.93 0 0112 21.75c-2.69 0-5.227-.588-7.5-1.632z"/>
          </svg>
        </div>
        <span className="text-[#124734] font-medium truncate">{row.name}</span>
      </td>

      <td className="-ml-4 pl-0 pr-2">
        <span className={`px-3 py-[4px] rounded-full text-xs font-medium ${getColor(row.status)}`}>
          {row.status}
        </span>
      </td>

      <td className="-ml-4 pl-0 pr-2 whitespace-nowrap">{row.date}</td>
      <td className="-ml-4 pl-0 pr-2 whitespace-nowrap">{row.amount}</td>
      <td className="-ml-4 pl-0 pr-2 whitespace-nowrap">{row.transaction}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}
