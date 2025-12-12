import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";

import {
  trendingProducts,
  EnginneringProducts,
  LawProducts,
  ManagementProducts,
  merchandiseProducts,
} from "../../../data/productData";

export default function EcomProductList() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const supplierProducts =
      JSON.parse(localStorage.getItem("supplierProducts")) || [];

    const sampleProducts = [
      trendingProducts[0],
      EnginneringProducts[0],
      LawProducts[0],
      ManagementProducts[0],
      merchandiseProducts[3],
    ];

    setProducts([...sampleProducts, ...supplierProducts]);
  }, []);

  const removeProduct = (id) => {
    const supplierProducts =
      JSON.parse(localStorage.getItem("supplierProducts")) || [];

    const updatedSupplier = supplierProducts.filter((p) => p.id !== id);
    localStorage.setItem("supplierProducts", JSON.stringify(updatedSupplier));

    setProducts((prev) => prev.filter((p) => p.id !== id));
    setShowDeletePopup(false);
  };

  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] overflow-hidden">

      {/* FIXED SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#124734] transition-all duration-300 z-40 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: sidebarWidth }}
      >

        {/* FIXED TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar
            isCollapsed={isCollapsed}
            pageTitle="Product List"
          />
        </div>

        {/* PAGE CONTENT */}
        <div className="p-8 mt-[80px]"> 
          <h1 className="text-3xl font-bold text-[#124734] mb-6">
            All Products
          </h1>

          {/* TABLE CARD */}
          <div className="bg-white rounded-xl shadow-lg border border-[#A7E1B2]/40 overflow-hidden">

            <table className="w-full text-left">
              <thead className="bg-[#A7E1B2] text-[#124734]">
                <tr>
                  <th className="px-6 py-3 font-semibold">Product</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Price</th>
                  <th className="px-6 py-3 font-semibold">In Stock</th>
                  <th className="px-6 py-3 font-semibold">Remove</th>
                </tr>
              </thead>

              <tbody className="text-gray-700 text-sm">
                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500 text-lg"
                    >
                      No products added yet.
                    </td>
                  </tr>
                )}

                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t hover:bg-[#A7E1B2]/10 transition"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={p.img}
                        className="w-16 h-16 object-contain border border-gray-300 rounded-lg p-1"
                      />
                      <span className="font-medium text-[#124734]">
                        {p.title}
                      </span>
                    </td>

                    <td className="px-6 py-4">{p.category}</td>

                    <td className="px-6 py-4 font-semibold text-[#124734]">
                      ₹{p.price}
                    </td>

                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={!p.outOfStock}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 transition"></div>
                        <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-6"></span>
                      </label>
                    </td>

                    <td className="px-6 py-4 text-left">
                      <button
                        onClick={() => {
                          setDeleteId(p.id);
                          setShowDeletePopup(true);
                        }}
                        className="text-[#124734] p-2 rounded-full shadow hover:scale-110 transition"
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                          alt="delete"
                          className="w-7 h-7 opacity-90 hover:opacity-100"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      {/* DELETE POPUP */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <div className="bg-white p-8 rounded-xl shadow-xl w-[350px] text-center">
            <div className="text-red-500 text-3xl mb-3">⚠</div>

            <p className="text-lg font-semibold mb-6">
              Are you sure you want to remove this product?
            </p>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="w-full border px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => removeProduct(deleteId)}
                className="w-full bg-[#124734] text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
