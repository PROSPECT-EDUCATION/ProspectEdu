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


export default function ProductList() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
const [deleteId, setDeleteId] = useState(null);


  // ⭐ Load products from localStorage (added by supplier)
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const supplierProducts =
    JSON.parse(localStorage.getItem("supplierProducts")) || [];

  // ⭐ ONLY SOME SAMPLE ITEMS
  const sampleProducts = [
    trendingProducts[0],
    EnginneringProducts[0],
    LawProducts[0],
    ManagementProducts[0],
    merchandiseProducts[3],
  ];

  // ⭐ MERGE SAMPLE + SUPPLIER
  setProducts([...sampleProducts, ...supplierProducts]);
}, []);

const removeProduct = (id) => {
  const supplierProducts =
    JSON.parse(localStorage.getItem("supplierProducts")) || [];

  const updatedSupplier = supplierProducts.filter((p) => p.id !== id);
  localStorage.setItem("supplierProducts", JSON.stringify(updatedSupplier));

  // Remove from visible list
  setProducts((prev) => prev.filter((p) => p.id !== id));

  setShowDeletePopup(false);
};



  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">

      {/* SIDEBAR */}
      <SupplierSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        <SupplierTopbar pageTitle="Product List" />

        <div className="p-8">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-[#124734] mb-6">
            All Products
          </h1>

          {/* Table Card */}
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
                    <td colSpan="4" className="text-center py-10 text-gray-500 text-lg">
                      No products added yet.
                    </td>
                  </tr>
                )}

                {products.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-[#A7E1B2]/10 transition">
                    
                    {/* Product Image + Name */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={p.img}
                        className="w-16 h-16 object-contain border border-gray-300 rounded-lg p-1"
                      />
                      <span className="font-medium text-[#124734]">{p.title}</span>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">{p.category}</td>

                    {/* Price */}
                    <td className="px-6 py-4 font-semibold text-[#124734]">
                      ₹{p.price}
                    </td>

                    {/* Stock Toggle */}
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
                      className="  text-[#124734] p-2 rounded-full shadow transition transform hover:scale-110"
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
      {showDeletePopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
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