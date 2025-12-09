import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import ProductNoSlider from "../../components/EcommerceHomeSlider/ProductNoSlider";

// PRODUCT DATA IMPORT
import {
  trendingProducts,
  merchandiseProducts,
  EnginneringProducts,
  LawProducts,
  ManagementProducts
} from "../../data/ProductData";

const ProductListPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  // ------- SELECT PRODUCTS BASED ON URL -------
  const getProducts = () => {
    if (type === "trending-products") return trendingProducts;
    if (type === "engineering-products") return EnginneringProducts;
    if (type === "law-products") return LawProducts;
    if (type === "management-products") return ManagementProducts;
    if (type === "merchandise-products") return merchandiseProducts;
    return [];
  };

  const products = getProducts();

  // ------- FORMAT TITLE -------
  const formatTitle = (t) =>
    t.replace("-", " ").replace("-", " ").toUpperCase();

  return (
    <section className="pb-20 pt-36">

      <EcomHeader />

       <div className="max-w-6xl mx-auto px-6 py-10 font-[Open_Sans]">
        {/* Breadcrumb */}
        <p className="text-gray-600 mb-5">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; {type.replace("-", " ")}
        </p>
        {/* Page Title */}

        <h2 className="text-3xl font-bold mb-6 text-[#124734]">
          {formatTitle(type)} ({products.length} Products Found)
        </h2>

         {/* PRODUCT GRID */}
      <ProductNoSlider
  products={products}       // pass product list
  cartItems={[]}            // empty cart for now
  wishlist={[]}             // empty wishlist for now
  onCart={() => {}}         // empty function (no crash)
  onWishlist={() => {}}     // empty function (no crash)
  columns={4}              // 4 columns for product grid
/>


      </div>

     

    </section>
  );
};

export default ProductListPage;
