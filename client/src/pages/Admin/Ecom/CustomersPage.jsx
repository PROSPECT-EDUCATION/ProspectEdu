import React, { useState } from "react";
import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";

import CustomerStats from "../../../components/Admin/Ecom/Customers/CustomerStats";
import CustomerChart from "../../../components/Admin/Ecom/Customers/CustomerChart";
import CustomerTable from "../../../components/Admin/Ecom/Customers/CustomerTable";
import Pagination from "../../../components/Admin/Ecom/Pagination";

export default function CustomersPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Customers" />
        </div>

       <div className="px-6 pt-[90px] pb-10 overflow-y-auto">

  {/* Stats + Chart Side-by-Side */}
 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 w-full">

  {/* LEFT — Stats (1 column) */}
  <div className="col-span-1 flex flex-col gap-6">
    <CustomerStats />
  </div>

  {/* RIGHT — Chart (3 columns) */}
  <div className="col-span-1 lg:col-span-3">
    <CustomerChart />
  </div>

</div>


  {/* Table */}
  <CustomerTable search={search} setSearch={setSearch} page={page} />

  {/* Pagination */}
  <Pagination page={page} setPage={setPage} totalPages={24} />

</div>

      </div>
    </div>
  );
}
