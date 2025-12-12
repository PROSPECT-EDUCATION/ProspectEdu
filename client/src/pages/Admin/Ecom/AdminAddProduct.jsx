// src/pages/Admin/Ecom/AddProduct.jsx
import React, { useState } from "react";
import AdminSidebar from "../../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../../components/Admin/Layout/AdminTopbar";

export default function AdminAddProduct() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [images, setImages] = useState([null, null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const updated = [...images];
    updated[index] = url;
    setImages(updated);
  };

  // compute sidebar width to push main content
  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      {/* FIXED SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#124734] transition-all duration-300 z-40 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: sidebarWidth, minHeight: "100vh" }}
      >
        {/* TOPBAR (fixed) */}
        <div
          className="fixed top-0 right-0 left-0 z-30"
          style={{ left: sidebarWidth }}
        >
          <AdminTopbar pageTitle="Add Product" isCollapsed={isCollapsed} />
        </div>

        {/* PAGE CONTENT */}
        <div
          className="pt-[80px] p-8 pb-16" /* padding-top to leave space for fixed topbar */
          style={{ minHeight: "calc(100vh - 80px)" }}
        >

          <div className="bg-white shadow-lg rounded-xl p-8 border border-[#A7E1B2]/60 max-w-3xl">
            <form className="space-y-6">
              {/* PRODUCT IMAGES */}
              <div>
                <p className="text-base font-semibold text-[#124734]">Product Images</p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {images.map((img, index) => (
                    <label key={index} htmlFor={`image${index}`}>
                      <input
                        type="file"
                        accept="image/*"
                        id={`image${index}`}
                        hidden
                        onChange={(e) => handleImageChange(e, index)}
                      />
                      <img
                        src={
                          img ||
                          "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                        }
                        alt="upload"
                        width={100}
                        height={100}
                        className="cursor-pointer rounded-lg hover:scale-105 transition shadow"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* PRODUCT NAME */}
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:border-[#124734]"
                  required
                />
              </div>

              {/* PRODUCT DESCRIPTION */}
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Description</label>
                <textarea
                  rows={4}
                  placeholder="Enter product description"
                  className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 resize-none focus:border-[#124734]"
                ></textarea>
              </div>

              {/* CATEGORY */}
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Category</label>
                <select className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:border-[#124734]">
                  <option>Select Category</option>
                  <option>IT Books</option>
                  <option>Civil Books</option>
                  <option>Electrical Books</option>
                  <option>Law Books</option>
                  <option>Management Books</option>
                  <option>Merchandise</option>
                </select>
              </div>

              {/* PRICING SECTION */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
                  <label className="text-base font-medium">Product Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:border-[#124734]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
                  <label className="text-base font-medium">Offer Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:border-[#124734]"
                    required
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="px-10 py-3 bg-[#124734] text-white rounded-lg font-semibold shadow hover:bg-[#0f3a23] transition"
              >
                ADD PRODUCT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
