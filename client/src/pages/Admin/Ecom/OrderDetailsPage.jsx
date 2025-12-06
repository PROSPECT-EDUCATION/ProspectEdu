import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import orders from "../../../data/order";
import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";
import OrderDetailCard from "../../../components/Admin/Ecom/OrderDetails/OrderDetailCard";
import OrderStatusUpdate from "../../../components/Admin/Ecom/OrderDetails/OrderStatusUpdate";
import OrderSummary from "../../../components/Admin/Ecom/OrderDetails/OrderSummary";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === Number(id));
  const [status, setStatus] = useState(order?.status || "Pending");

  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  if (!order) {
    return <p className="text-red-500 p-6">Order not found.</p>;
  }

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      
      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Order Details" />
        </div>

        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/admin/ecom/orders")}
            className="mb-4 text-[#124734] underline"
          >
            ← Back to Orders
          </button>

          {/* ORDER DETAILS SECTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <OrderDetailCard order={order} />
            <OrderStatusUpdate status={status} setStatus={setStatus} />
            <OrderSummary order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}
