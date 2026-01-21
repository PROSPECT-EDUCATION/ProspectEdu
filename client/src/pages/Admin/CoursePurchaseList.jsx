import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";

export default function PurchaseList() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  // Dummy data (replace with API later)
  const purchases = [
    {
      id: 1,
      student: "Riya Sharma",
      course: "Full Stack Development",
      amount: 1499,
      transactionId: "TXN9828731",
      date: "2025-02-20",
      method: "UPI",
    },
    {
      id: 2,
      student: "Aman Verma",
      course: "DSA Mastery Course",
      amount: 999,
      transactionId: "TXN9828602",
      date: "2025-02-19",
      method: "Credit Card",
    },
    {
      id: 3,
      student: "Neha Singh",
      course: "Java Zero to Hero",
      amount: 1299,
      transactionId: "TXN9829401",
      date: "2025-02-18",
      method: "UPI",
    },
  ];

  const totalEarnings = purchases.reduce((sum, p) => sum + p.amount, 0);
  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#124734] transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar
            isCollapsed={isCollapsed}
            pageTitle="Course Purchase List"
          />
        </div>

        {/* PAGE CONTENT */}
        <div className="px-6 py-10 mt-[50px]">

          {/* TOTAL EARNINGS CARD */}
          <div className="bg-white p-6 rounded-xl shadow border border-[#A7E1B2]/50 max-w-sm mb-8">
            <p className="text-[#5B7065] text-sm">Total Earnings</p>
            <h2 className="text-3xl font-bold text-[#124734] mt-1">
              ₹{totalEarnings}
            </h2>
          </div>

          {/* PURCHASE TABLE */}
          <div className="bg-white shadow-lg rounded-xl border border-[#A7E1B2]/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#E6F4EC] text-[#124734] text-sm">
                    <th className="px-4 py-3 text-center">S.No</th>
                    <th className="px-4 py-3 text-center">Student Name</th>
                    <th className="px-4 py-3 text-center">Course Name</th>
                    <th className="px-4 py-3 text-center">Amount Paid</th>
                    <th className="px-4 py-3 text-center">Transaction ID</th>
                    <th className="px-4 py-3 text-center">Date</th>
                    <th className="px-4 py-3 text-center">Method</th>
                  </tr>
                </thead>

                <tbody>
                  {purchases.map((p, index) => (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedPurchase(p)}
                      className="border-t border-[#E6F4EC] hover:bg-[#F1FFF6] cursor-pointer transition"
                    >
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm">{p.student}</td>
                      <td className="px-4 py-3 text-sm">{p.course}</td>
                      <td className="px-4 py-3 text-sm font-medium text-[#124734]">
                        ₹{p.amount}
                      </td>
                      <td className="px-4 py-3 text-sm">{p.transactionId}</td>
                      <td className="px-4 py-3 text-sm">{p.date}</td>
                      <td className="px-4 py-3 text-sm">{p.method}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedPurchase && (
        <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl border border-[#A7E1B2]">
            <h2 className="text-xl font-semibold text-[#124734] mb-4">Purchase Details</h2>

            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Student:</span> {selectedPurchase.student}</p>
              <p><span className="font-medium">Course:</span> {selectedPurchase.course}</p>
              <p><span className="font-medium">Amount Paid:</span> ₹{selectedPurchase.amount}</p>
              <p><span className="font-medium">Transaction ID:</span> {selectedPurchase.transactionId}</p>
              <p><span className="font-medium">Date:</span> {selectedPurchase.date}</p>
              <p><span className="font-medium">Payment Method:</span> {selectedPurchase.method}</p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedPurchase(null)}
                className="px-5 py-2 bg-[#124734] text-white rounded-lg hover:bg-[#0f3a29] transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
