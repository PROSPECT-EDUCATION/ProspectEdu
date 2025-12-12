import React, { useState } from "react";
import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";
import OrderStats from "../../../components/Admin/Ecom/OrderStats";
import OrderTabs from "../../../components/Admin/Ecom/OrderTabs";
import OrderTable from "../../../components/Admin/Ecom/OrderTable";
import Pagination from "../../../components/Admin/Ecom/Pagination"; 
export default function EcomOrdersPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const sidebarWidth = isCollapsed ? 80 : 256;
  const [page, setPage] = useState(1);
  const totalPages = 24;
  // ⭐ moved active tab state here
  const [activeTab, setActiveTab] = useState("All Orders");

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full z-40 transition-all duration-300
        ${isCollapsed ? "w-20" : "w-64"}`}>
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}>
        
        <div className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}>
          <AdminTopbar pageTitle="E-Commerce Orders" />
        </div>

        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">
          
          <OrderStats />

          {/* ⭐ pass state + setter */}
 <OrderTabs 
  active={activeTab} 
  setActive={setActiveTab} 
  search={search}
  setSearch={setSearch}
/>


<OrderTable active={activeTab} page={page} search={search} />

<Pagination page={page} setPage={setPage} totalPages={24} />


        </div>
      </div>
    </div>
  );
}
