import React, { useState } from "react";
import { useParams } from "react-router-dom";

import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";

import customers from "../../../data/customers";
import CustomerInfoCard from "../../../components/Admin/Ecom/CustomerDetails/CustomerInfoCard";
import CustomerStatusUpdate from "../../../components/Admin/Ecom/CustomerDetails/CustomerStatusUpdate";
import CustomerOrdersTable from "../../../components/Admin/Ecom/CustomerDetails/CustomerOrdersTable";

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const customer = customers.find((c) => c.id.toString() === id);

  if (!customer) return <p className="text-red-500 p-6">Customer not found</p>;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
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
          <AdminTopbar pageTitle={`Customer #${customer.customerId}`} />
        </div>

        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">

          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CustomerInfoCard customer={customer} />

            <CustomerStatusUpdate customer={customer} />
          </div>

          {/* Recent Orders */}
          <CustomerOrdersTable customer={customer} />
        </div>
      </div>
    </div>
  );
}
