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

  // SAMPLE + SUPPLIER PRODUCTS
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

  // SAMPLE ANALYTICS DATA
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
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <SupplierTopbar pageTitle="Supplier Dashboard" />

        <div className="p-8">

          {/* MAIN HEADING */}
          <h1 className="text-3xl font-bold text-[#124734] mb-8">
            Analytics Overview
          </h1>

          {/* TOP ANALYTIC CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

            {/* Total Products */}
            <div className="bg-white shadow-md border border-[#A7E1B2]/40 p-6 rounded-xl hover:shadow-lg transition">
              <p className="text-gray-600">Total Products</p>
              <h2 className="text-3xl font-bold text-[#124734] mt-2">
                {allProducts.length}
              </h2>
            </div>

            {/* Total Orders */}
            <div className="bg-white shadow-md border border-[#A7E1B2]/40 p-6 rounded-xl hover:shadow-lg transition">
              <p className="text-gray-600">Total Orders</p>
              <h2 className="text-3xl font-bold text-[#124734] mt-2">
                {totalOrders}
              </h2>
            </div>

            {/* Pending Orders */}
            <div className="bg-white shadow-md border border-[#A7E1B2]/40 p-6 rounded-xl hover:shadow-lg transition">
              <p className="text-gray-600">Pending Orders</p>
              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {pendingOrders}
              </h2>
            </div>

            {/* Total Revenue */}
            <div className="bg-white shadow-md border border-[#A7E1B2]/40 p-6 rounded-xl hover:shadow-lg transition">
              <p className="text-gray-600">Total Revenue</p>
              <h2 className="text-3xl font-bold text-[#124734] mt-2">
                ₹{totalRevenue}
              </h2>
            </div>
          </div>

          {/* BEST SELLING PRODUCT */}
          <div className="bg-white border border-[#A7E1B2]/40 rounded-xl p-6 shadow-md mb-10">
            <h2 className="text-xl font-semibold text-[#124734] mb-4">
              Best Selling Product
            </h2>

            <div className="flex items-center gap-6">
              <img
                src={bestSelling.img}
                className="w-28 h-28 bg-[#A7E1B2]/20 object-contain rounded-lg shadow-sm p-2"
                alt={bestSelling.title}
              />

              <div>
                <p className="text-lg font-bold text-[#124734]">
                  {bestSelling.title}
                </p>
                <p className="text-gray-600">{bestSelling.category}</p>
                <p className="mt-1 text-green-700 font-semibold">
                  Revenue Generated: ₹5990
                </p>
              </div>
            </div>
          </div>

          {/* STOCK OVERVIEW SECTION */}
          <div className="bg-white border border-[#A7E1B2]/40 rounded-xl p-8 shadow-md mb-10">
            <h2 className="text-2xl font-semibold text-[#124734] mb-6">
              Stock Overview
            </h2>

            {/* STOCK SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              {/* Total Stock */}
              <div className="p-6 bg-[#E9F8EF] rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 text-sm">Total Products</p>
                <h2 className="text-3xl font-bold text-[#124734]">
                  {allProducts.length}
                </h2>
              </div>

              {/* Low Stock */}
              <div className="p-6 bg-[#FFF6D9] rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 text-sm">Low Stock Items</p>
                <h2 className="text-3xl font-bold text-orange-600">
                  {allProducts.filter((p) => (p.stock || 20) < 10).length}
                </h2>
              </div>

              {/* Out of Stock */}
              <div className="p-6 bg-[#FFE5E5] rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 text-sm">Out of Stock</p>
                <h2 className="text-3xl font-bold text-red-600">
                  {allProducts.filter((p) => (p.stock || 20) === 0).length}
                </h2>
              </div>

            </div>

            {/* PRODUCT STOCK TABLE */}
            <h3 className="text-xl font-semibold text-[#124734] mb-4">
              Product Stock Details
            </h3>

            <div className="border rounded-xl overflow-hidden">

              {allProducts.map((p, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 border-b last:border-none hover:bg-[#A7E1B2]/10 transition"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={p.img}
                      className="w-14 h-14 rounded-lg bg-[#A7E1B2]/20 p-2 object-contain"
                      alt={p.title}
                    />
                    <div>
                      <p className="font-semibold text-[#124734]">{p.title}</p>
                      <p className="text-gray-600 text-sm">{p.category}</p>
                    </div>
                  </div>

                  {/* STOCK BADGE */}
                  <div>
                    {p.stock === 0 ? (
                      <span className="px-3 py-1 text-sm rounded-full bg-red-200 text-red-800 font-semibold">
                        Out of Stock
                      </span>
                    ) : (p.stock || 20) < 10 ? (
                      <span className="px-3 py-1 text-sm rounded-full bg-orange-200 text-orange-800 font-semibold">
                        Low Stock ({p.stock || 20})
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm rounded-full bg-green-200 text-green-800 font-semibold">
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
  );
}
