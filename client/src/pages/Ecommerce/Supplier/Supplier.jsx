import React, { useState } from "react";
import SupplierSidebar from "../../../components/SupplierEcommerce/Sidebar";
import SupplierTopbar from "../../../components/SupplierEcommerce/Topbar";

import {
  trendingProducts,
  EnginneringProducts,
  LawProducts,
  ManagementProducts,
  merchandiseProducts,
} from "../../../data/ProductData";

export default function Supplier() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sampleProducts = [
    trendingProducts[0],
    EnginneringProducts[0],
    LawProducts[0],
    ManagementProducts[0],
    merchandiseProducts[0],
  ];

  const supplierProducts =
    JSON.parse(localStorage.getItem("supplierProducts")) || [];

  const allProducts = [...sampleProducts, ...supplierProducts];

  const totalOrders = 24;
  const pendingOrders = 3;
  const totalRevenue = 18590;

  const bestSelling = sampleProducts[0];

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">

      {/* SIDEBAR */}
      <SupplierSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* MAIN AREA */}
    <div
  className={`flex-1 flex flex-col transition-all duration-300 
    ${isCollapsed ? "ml-20" : "ml-64"} 
    md:ml-0
  `}
>


        {/* TOPBAR */}
        <SupplierTopbar pageTitle="Supplier Dashboard" />

        <div className="p-4 md:p-8 w-full">

          {/* MAIN HEADING */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#124734] mb-6 md:mb-8 text-center md:text-left">
            Analytics Overview
          </h1>

          {/* ---------- MOBILE ANALYTICS (NEW ATTRACTIVE) ---------- */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">

            <div className="bg-white p-4 rounded-xl shadow border">
              <p className="text-gray-600 text-sm">Total Products</p>
              <h2 className="text-2xl font-bold text-[#124734]">{allProducts.length}</h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border">
              <p className="text-gray-600 text-sm">Total Orders</p>
              <h2 className="text-2xl font-bold text-[#124734]">{totalOrders}</h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border">
              <p className="text-gray-600 text-sm">Pending Orders</p>
              <h2 className="text-2xl font-bold text-red-600">{pendingOrders}</h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border">
              <p className="text-gray-600 text-sm">Revenue</p>
              <h2 className="text-2xl font-bold text-[#124734]">₹{totalRevenue}</h2>
            </div>
          </div>

          {/* ---------- DESKTOP ANALYTICS (UNCHANGED) ---------- */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">

            <div className="bg-white shadow-md border border-[#A7E1B2]/40 p-4 md:p-6 rounded-xl hover:shadow-lg transition">
              <p className="text-gray-600 text-sm md:text-base">Total Products</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#124734] mt-2">
                {allProducts.length}
              </h2>
            </div>

            <div className="bg-white shadow-md border border-[#A7E1B2]/40 p-4 md:p-6 rounded-xl hover:shadow-lg transition">
              <p className="text-gray-600 text-sm md:text-base">Total Orders</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#124734] mt-2">
                {totalOrders}
              </h2>
            </div>

            <div className="bg-white shadow-md border border-[#A7E1B2]/40 p-4 md:p-6 rounded-xl hover:shadow-lg transition">
              <p className="text-gray-600 text-sm md:text-base">Pending Orders</p>
              <h2 className="text-2xl md:text-3xl font-bold text-red-600 mt-2">
                {pendingOrders}
              </h2>
            </div>

            <div className="bg-white shadow-md border border-[#A7E1B2]/40 p-4 md:p-6 rounded-xl hover:shadow-lg transition">
              <p className="text-gray-600 text-sm md:text-base">Total Revenue</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#124734] mt-2">
                ₹{totalRevenue}
              </h2>
            </div>
          </div>

          {/* ---------- BEST SELLING PRODUCT (unchanged desktop, improved mobile) ---------- */}
          <div className="bg-white border border-[#A7E1B2]/40 rounded-xl p-4 md:p-6 shadow-md mb-10">
            <h2 className="text-lg md:text-xl font-semibold text-[#124734] mb-4">
              Best Selling Product
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={bestSelling.img}
                className="w-24 h-24 md:w-28 md:h-28 object-contain bg-[#A7E1B2]/20 p-2 rounded-xl"
              />

              <div>
                <p className="text-lg font-bold text-[#124734]">{bestSelling.title}</p>
                <p className="text-gray-600">{bestSelling.category}</p>
                <p className="mt-1 text-green-700 font-semibold">
                  Revenue Generated: ₹5990
                </p>
              </div>
            </div>
          </div>

          {/* ---------- STOCK OVERVIEW CARDS (unchanged desktop) ---------- */}
          <div className="bg-white border border-[#A7E1B2]/40 rounded-xl p-4 md:p-8 shadow-md mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-[#124734] mb-6">
              Stock Overview
            </h2>

            {/* MOBILE STOCK CARDS (stacked) */}
            <div className="grid sm:hidden grid-cols-1 gap-4 mb-8">
              <div className="p-4 bg-[#E9F8EF] rounded-xl shadow">
                <p className="text-gray-600 text-sm">Total Products</p>
                <h2 className="text-2xl font-bold text-[#124734]">{allProducts.length}</h2>
              </div>

              <div className="p-4 bg-[#FFF6D9] rounded-xl shadow">
                <p className="text-gray-600 text-sm">Low Stock</p>
                <h2 className="text-2xl font-bold text-orange-600">
                  {allProducts.filter((p) => (p.stock || 20) < 10).length}
                </h2>
              </div>

              <div className="p-4 bg-[#FFE5E5] rounded-xl shadow">
                <p className="text-gray-600 text-sm">Out of Stock</p>
                <h2 className="text-2xl font-bold text-red-600">
                  {allProducts.filter((p) => (p.stock || 20) === 0).length}
                </h2>
              </div>
            </div>

            {/* DESKTOP STOCK GRID (unchanged) */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="p-6 bg-[#E9F8EF] rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 text-sm md:text-base">Total Products</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#124734]">{allProducts.length}</h2>
              </div>

              <div className="p-6 bg-[#FFF6D9] rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 text-sm md:text-base">Low Stock Items</p>
                <h2 className="text-2xl md:text-3xl font-bold text-orange-600">
                  {allProducts.filter((p) => (p.stock || 20) < 10).length}
                </h2>
              </div>

              <div className="p-6 bg-[#FFE5E5] rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 text-sm md:text-base">Out of Stock</p>
                <h2 className="text-2xl md:text-3xl font-bold text-red-600">
                  {allProducts.filter((p) => (p.stock || 20) === 0).length}
                </h2>
              </div>
            </div>

            {/* PRODUCT STOCK TABLE (desktop unchanged, mobile stacked) */}
            <h3 className="text-lg md:text-xl font-semibold text-[#124734] mb-4">
              Product Stock Details
            </h3>

            <div className="border rounded-xl overflow-hidden">
              
              {/* MOBILE VERSION */}
              <div className="sm:hidden space-y-4">
                {allProducts.map((p, i) => (
                  <div key={i} className="bg-white p-4 shadow rounded-xl border space-y-2">
                    <div className="flex gap-4">
                      <img
                        src={p.img}
                        className="w-16 h-16 object-contain bg-[#A7E1B2]/20 rounded-lg p-2"
                      />
                      <div>
                        <p className="font-semibold text-[#124734]">{p.title}</p>
                        <p className="text-gray-600 text-sm">{p.category}</p>
                      </div>
                    </div>

                    <div>
                      {p.stock === 0 ? (
                        <span className="px-3 py-1 rounded-full bg-red-200 text-red-800 text-sm">
                          Out of Stock
                        </span>
                      ) : (p.stock || 20) < 10 ? (
                        <span className="px-3 py-1 rounded-full bg-orange-200 text-orange-800 text-sm">
                          Low Stock ({p.stock || 20})
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-green-200 text-green-800 text-sm">
                          In Stock ({p.stock || 20})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP VERSION (unchanged) */}
              <div className="hidden sm:block">
                {allProducts.map((p, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b last:border-none hover:bg-[#A7E1B2]/10 transition"
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <img
                        src={p.img}
                        className="w-14 h-14 rounded-lg bg-[#A7E1B2]/20 p-2 object-contain"
                      />
                      <div>
                        <p className="font-semibold text-[#124734]">{p.title}</p>
                        <p className="text-gray-600 text-sm">{p.category}</p>
                      </div>
                    </div>

                    <div className="text-sm md:text-base">
                      {p.stock === 0 ? (
                        <span className="px-3 py-1 rounded-full bg-red-200 text-red-800 font-semibold">
                          Out of Stock
                        </span>
                      ) : (p.stock || 20) < 10 ? (
                        <span className="px-3 py-1 rounded-full bg-orange-200 text-orange-800 font-semibold">
                          Low Stock ({p.stock || 20})
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-green-200 text-green-800 font-semibold">
                          In Stock ({p.stock || 20})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
