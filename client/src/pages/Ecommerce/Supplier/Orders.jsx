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

export default function Orders() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const orders = [
    {
      id: "ORD-101",
      product: trendingProducts[0],
      qty: 1,
      amount: trendingProducts[0].price,
      paymentType: "UPI",
      orderDate: "12 Jan 2025",
      paid: true,
      address: {
        name: "Akshat Agrawal",
        street: "Bhopal Bypass Road",
        city: "Bhopal",
        state: "MP",
        pincode: "462038",
        country: "India",
      },
    },
    {
      id: "ORD-102",
      product: LawProducts[0],
      qty: 2,
      amount: LawProducts[0].price * 2,
      paymentType: "Credit Card",
      orderDate: "14 Jan 2025",
      paid: true,
      address: {
        name: "Aditya Singh",
        street: "New Market",
        city: "Bhopal",
        state: "MP",
        pincode: "462001",
        country: "India",
      },
    },
    {
      id: "ORD-103",
      product: merchandiseProducts[0],
      qty: 1,
      amount: merchandiseProducts[0].price,
      paymentType: "COD",
      orderDate: "15 Jan 2025",
      paid: false,
      address: {
        name: "Pratima",
        street: "Kolar Road",
        city: "Bhopal",
        state: "MP",
        pincode: "462042",
        country: "India",
      },
    },
  ];

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

        <SupplierTopbar pageTitle="Order List" />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#124734] mb-6">
            Orders List
          </h1>

          {/* ============ MOBILE VIEW (Attractive Cards) ============ */}
          <div className="md:hidden space-y-6">
            {orders.map((order, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl shadow border border-[#A7E1B2]/40"
              >
                {/* TOP ROW */}
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-[#124734]">
                    #{order.id}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.paid
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {order.paid ? "Paid" : "Pending"}
                  </span>
                </div>

                {/* PRODUCT ROW */}
                <div className="flex gap-4">
                  {/* IMAGE */}
                  <img
                    src={order.product.img}
                    className="w-20 h-20 rounded-lg object-contain bg-[#A7E1B2]/20 p-2"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <p className="text-[#124734] font-semibold text-base leading-tight">
                      {order.product.title}
                    </p>

                    <p className="text-gray-500 text-xs mt-1">
                      {order.product.category}
                    </p>

                    <p className="text-[#124734] font-bold text-sm mt-2">
                      ₹{order.amount} <span className="font-normal">• Qty {order.qty}</span>
                    </p>

                    <p className="text-gray-500 text-xs mt-1">
                      Payment: {order.paymentType}
                    </p>

                    <p className="text-gray-400 text-xs mt-1">
                      {order.orderDate}
                    </p>

                    {/* ADDRESS */}
                    <p className="text-gray-600 mt-2 text-xs leading-4">
                      {order.address.name} , {order.address.city}  – {order.address.pincode} ,{order.address.country}
                      <p className="text-gray-500 mt-1">Date: {order.orderDate}</p>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ============ DESKTOP VIEW (ORIGINAL - UNTOUCHED) ============ */}
          <div className="hidden md:block">
            <div className="space-y-6">
              {orders.map((order, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-2xl shadow-md border border-[#A7E1B2]/40 hover:shadow-lg transition-all duration-200"
                >
                  {/* ORIGINAL DESKTOP TOP ROW (UNCHANGED) */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-[#124734]">
                      #{order.id}
                    </h3>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        order.paid
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {order.paid ? "Paid" : "Pending"}
                    </span>
                  </div>

                  {/* ORIGINAL DESKTOP GRID (UNCHANGED) */}
                  <div className="grid grid-cols-[1fr_2fr_0.7fr_1fr_1.3fr] gap-6 items-center">

                    <img
                      src={order.product.img}
                      alt="product"
                      className="w-20 h-20 rounded-lg object-contain bg-[#A7E1B2]/20 p-2 shadow-sm"
                    />

                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-semibold text-[#124734]">
                        {order.product.title}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Category: {order.product.category}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Payment: {order.paymentType}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <span className="px-3 py-1 text-sm font-semibold rounded-full bg-[#A7E1B2]/60 text-[#124734] shadow-sm">
                        Qty: {order.qty}
                      </span>
                    </div>

                    <div className="text-lg font-extrabold text-[#124734] text-center">
                      ₹{order.amount}
                    </div>

                    <div className="text-sm leading-5 text-gray-700">
                      <p className="font-semibold">{order.address.name}</p>
                      <p>{order.address.street}, {order.address.city}</p>
                      <p>{order.address.state} – {order.address.pincode}</p>
                      <p>{order.address.country}</p>
                      <p className="text-gray-500 mt-1">Date: {order.orderDate}</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {orders.length === 0 && (
            <div className="text-center mt-20 text-gray-500 text-xl">
              No Orders Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
