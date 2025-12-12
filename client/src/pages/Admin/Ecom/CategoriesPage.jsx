import React, { useState } from "react";
import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";

import CategoryHeader from "../../../components/Admin/Ecom/Categories/CategoryHeader";
import CategorySlider from "../../../components/Admin/Ecom/Categories/CategorySlider";
import CategoryTabs from "../../../components/Admin/Ecom/Categories/CategoryTabs";
import ProductTable from "../../../components/Admin/Ecom/Categories/ProductTable";
import Pagination from "../../../components/Admin/Ecom/Pagination";
import categoryData from "../../../data/categories";

import AddCategoryModal from "../../../components/Admin/Ecom/Categories/AddCategoryModal";
import EditCategoryModal from "../../../components/Admin/Ecom/Categories/EditCategoryModal";

export default function CategoriesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("All Product (145)");
  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState(categoryData);

  // Modal states
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] overflow-hidden">

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

      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="E-Commerce Categories" />
        </div>

        <div className="px-6 pt-[90px] pb-10 overflow-y-auto h-[calc(100vh-64px)]">

          {/* Header */}
          <CategoryHeader 
            onAddCategory={() => setOpenAddModal(true)}
            onEditCategory={() => setOpenEditModal(true)}  // ⭐ IMPORTANT
          />

          <CategorySlider categories={categories} />
          <CategoryTabs active={activeTab} setActive={setActiveTab} />
          <ProductTable activeTab={activeTab} />
          <Pagination page={page} setPage={setPage} totalPages={24} />
        </div>
      </div>

      {/* Add Modal */}
      <AddCategoryModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSave={(newCategory) => {
          setCategories([...categories, newCategory]);
          setOpenAddModal(false);
        }}
      />

      {/* ⭐ EDIT MODAL */}
      <EditCategoryModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        categories={categories}
        onSave={(updatedList) => {
          setCategories(updatedList);
          setOpenEditModal(false);
        }}
        onDelete={(updatedList) => {
          setCategories(updatedList);
          setOpenEditModal(false);
        }}
      />
      
    </div>
  );
}
