import React, { useState } from "react";
import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";

import TransactionStats from "../../../components/Admin/Ecom/Transactions/TransactionStats";
import PaymentMethodCard from "../../../components/Admin/Ecom/Transactions/PaymentMethodCard";
import Transaction from "../../../components/Admin/Ecom/Transactions/Transaction";
import Pagination from "../../../components/Admin/Ecom/Pagination";

export default function TransactionsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("All order (240)");
  const [page, setPage] = useState(1);

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      <div className="flex flex-col flex-1" style={{ marginLeft: sidebarWidth }}>
        
        {/* Top Bar */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Transactions" />
        </div>

        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">

        {/* Stats + Payment Card Row */}
{/* Stats + Payment Method */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-start">

  {/* LEFT: Stats Section */}
  <div className="flex justify-start">
    <TransactionStats />
  </div>

  {/* RIGHT: Payment Method (wider) */}
  <div className="flex justify-end">
    <PaymentMethodCard />
  </div>

</div>


<Transaction/>

          {/* Tabs */}
         

          {/* Pagination */}
          <Pagination page={page} setPage={setPage} totalPages={24} />
        </div>
      </div>
    </div>
  );
}
