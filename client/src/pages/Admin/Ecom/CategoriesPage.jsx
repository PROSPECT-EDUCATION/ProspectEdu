import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";

import CategoryHeader from "../../../components/Admin/Ecom/Categories/CategoryHeader";
import CategorySlider from "../../../components/Admin/Ecom/Categories/CategorySlider";
import CategoryTabs from "../../../components/Admin/Ecom/Categories/CategoryTabs";
import ProductTable from "../../../components/Admin/Ecom/Categories/ProductTable";
import Pagination from "../../../components/Admin/Ecom/Pagination";

import AddCategoryModal from "../../../components/Admin/Ecom/Categories/AddCategoryModal";
import EditCategoryModal from "../../../components/Admin/Ecom/Categories/EditCategoryModal";

import {
  fetchCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
} from "../../../lib/categoryApi";

export default function CategoriesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("All Product ");
  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  // Modal states
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const sidebarWidth = isCollapsed ? 80 : 256;

  const loadCats = async () => {
    setLoadingCats(true);
    try {
      const items = await fetchCategories();
      // map backend => UI shape used in slider/modal
      const mapped = items.map((c) => ({
        id: c._id,
        title: c.name,
        img: c.imageUrl,
      }));
      setCategories(mapped);
    } catch (e) {
      setCategories([]);
    } finally {
      setLoadingCats(false);
    }
  };

  useEffect(() => {
    loadCats();
  }, []);

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
            onEditCategory={() => setOpenEditModal(true)}
          />

          <CategorySlider categories={categories} />
          <p className="text-2xl font-bold text-left">Supplier Products</p>
          <CategoryTabs active={activeTab} setActive={setActiveTab} />
          <ProductTable activeTab={activeTab} />
          <Pagination page={page} setPage={setPage} totalPages={24} />

          {loadingCats ? (
            <div className="text-sm text-gray-500 mt-4">Loading categories...</div>
          ) : null}
        </div>
      </div>

      {/* Add Modal */}
      <AddCategoryModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSave={async ({ name, imageFile }) => {
          await adminCreateCategory({ name, imageFile });
          setOpenAddModal(false);
          loadCats();
        }}
      />

      {/* Edit Modal */}
      <EditCategoryModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        categories={categories}
        onSave={async ({ id, name, imageFile }) => {
          await adminUpdateCategory(id, { name, imageFile });
          setOpenEditModal(false);
          loadCats();
        }}
        onDelete={async ({ id }) => {
          await adminDeleteCategory(id);
          setOpenEditModal(false);
          loadCats();
        }}
      />
    </div>
  );
}
