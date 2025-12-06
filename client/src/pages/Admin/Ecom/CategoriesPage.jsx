import React, { useState } from "react";
import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";

import CategoryHeader from "../../../components/Admin/Ecom/Categories/CategoryHeader";
import CategorySlider from "../../../components/Admin/Ecom/Categories/CategorySlider";
import CategoryTabs from "../../../components/Admin/Ecom/Categories/CategoryTabs";
import ProductTable from "../../../components/Admin/Ecom/Categories/ProductTable";
import Pagination from "../../../components/Admin/Ecom/Pagination";

// ⭐ IMPORT THE MODAL
import AddCategoryModal from "../../../components/Admin/Ecom/Categories/AddCategoryModal";

export default function CategoriesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("All Product (145)");
  const [page, setPage] = useState(1);

  // ⭐ NEW STATE FOR MODAL VISIBILITY
  const [openAddModal, setOpenAddModal] = useState(false);

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] overflow-hidden">

      {/* Sidebar */}
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

      {/* Main Content */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Topbar */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="E-Commerce Categories" />
        </div>

        {/* Scrollable Area */}
        <div className="px-6 pt-[90px] pb-10 overflow-y-auto h-[calc(100vh-64px)]">

          {/* Header with Add Category Button */}
          <CategoryHeader onAddCategory={() => setOpenAddModal(true)} />

          {/* Category Slider */}
          <CategorySlider />

          {/* Tabs */}
          <CategoryTabs active={activeTab} setActive={setActiveTab} />

          {/* Products Table */}
          <ProductTable activeTab={activeTab} />

          {/* Pagination */}
          <Pagination page={page} setPage={setPage} totalPages={24} />
        </div>
      </div>

      {/* ⭐ MODAL (Visible when openAddModal = true) */}
      <AddCategoryModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSave={(category) => {
          console.log("NEW CATEGORY :", category);
          setOpenAddModal(false);
        }}
      />
    </div>
  );
}
