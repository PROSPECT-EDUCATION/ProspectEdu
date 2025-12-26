import React, { useState } from "react";
import SupplierSidebar from "../../../components/SupplierEcommerce/Sidebar";
import SupplierTopbar from "../../../components/SupplierEcommerce/Topbar";

export default function AddProduct() {
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


  return (
    <div className="flex bg-[#F9FAFB] min-h-screen text-left">

      {/* SIDEBAR */}
      <SupplierSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <SupplierTopbar pageTitle="Add Product" />

        {/* PAGE CONTENT */}
        <div className="p-8">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-[#124734] mb-6">
            Add New Product
          </h1>

          {/* FORM CARD */}
          <div className="bg-white shadow-lg rounded-xl p-8 border border-[#A7E1B2]/60 max-w-3xl">

            <form className="space-y-6">

              {/* PRODUCT IMAGES */}
             <div>
  <p className="text-base font-semibold text-[#124734] ">Product Images</p>

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

                {/* PRICE */}
                <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
                  <label className="text-base font-medium">Product Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:border-[#124734]"
                    required
                  />
                </div>

                {/* OFFER PRICE */}
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
