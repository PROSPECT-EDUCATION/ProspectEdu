import React, { useEffect, useState } from "react";
import SupplierSidebar from "../../../components/SupplierEcommerce/Sidebar";
import SupplierTopbar from "../../../components/SupplierEcommerce/Topbar";

import {
  trendingProducts,
  EnginneringProducts,
  LawProducts,
  ManagementProducts,
  merchandiseProducts,
} from "../../../data/ProductData";

export default function ProductList() {
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

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      <SupplierSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div
  className={`flex-1 flex flex-col transition-all duration-300 
    ${isCollapsed ? "ml-20 md:ml-0" : "ml-64 md:ml-0"}
  `}
>

        <SupplierTopbar pageTitle="Product List" />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#124734] mb-6">
            All Products
          </h1>

          {/* ================= DESKTOP TABLE (UNCHANGED) ================= */}
          <div className="bg-white rounded-xl shadow-lg border border-[#A7E1B2]/40 overflow-hidden hidden md:block">
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
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-6"></span>
                      </label>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setDeleteId(p.id);
                          setShowDeletePopup(true);
                        }}
                        className="text-[#124734] p-2 rounded-full shadow hover:scale-110 transition"
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                          className="w-7 h-7 opacity-90"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================ MOBILE CARD VIEW (NEW + ATTRACTIVE) ================ */}
          <div className="md:hidden space-y-5 mt-5">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded-xl shadow border border-[#A7E1B2]/40 flex gap-4"
              >
                <img
                  src={p.img}
                  className="w-20 h-20 rounded-xl object-contain bg-[#A7E1B2]/20 p-2"
                />

                <div className="flex-1">
                  <p className="font-semibold text-[#124734] text-lg leading-tight">
                    {p.title}
                  </p>

                  <p className="text-gray-500 text-sm">{p.category}</p>

                  <p className="text-[#124734] font-bold mt-1">
                    ₹{p.price}
                  </p>

                  <div className="mt-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={!p.outOfStock}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 transition"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-200 peer-checked:translate-x-6"></span>
                    </label>
                  </div>

                  <button
                    onClick={() => {
                      setDeleteId(p.id);
                      setShowDeletePopup(true);
                    }}
                    className="text-red-600 underline mt-3 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-[350px] text-center">
            <div className="text-red-500 text-3xl mb-3">⚠️</div>

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
