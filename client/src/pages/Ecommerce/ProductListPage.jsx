import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import ProductNoSlider from "../../components/EcommerceHomeSlider/ProductNoSlider";
import Footer from "../../components/Footer";

// PRODUCT DATA IMPORT
import {
  trendingProducts,
  merchandiseProducts,
  EnginneringProducts,
  LawProducts,
  ManagementProducts,
  MedicalProducts
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
    if (type === "medical-products") return MedicalProducts;
    return [];
  };

  const products = getProducts();

  // ------- FORMAT TITLE -------
  const formatTitle = (t) =>
    t.replace("-", " ").replace("-", " ").toUpperCase();

  return (
    <section className=" pt-36">
      <EcomHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 font-[Open_Sans] pb-20 text-left">

        {/* Breadcrumb */}
        <p className="text-gray-600 mb-4 sm:mb-5 text-sm sm:text-base">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; {type.replace("-", " ")}
        </p>

        {/* Page Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#124734]">
          {formatTitle(type)} ({products.length} Products Found)
        </h2>

        {/* PRODUCT GRID */}
        {/* DESKTOP VIEW: SAME AS CURRENT (4 columns) */}
        {/* MOBILE/TABLET ONLY: internal component will auto wrap */}
        <ProductNoSlider
          products={products}
          cartItems={[]}
          wishlist={[]}
          onCart={() => {}}
          onWishlist={() => {}}
          columns={4}   // ⭐ KEEPING DESKTOP EXACTLY SAME
        />

      </div>
       <div className="pt-10"> <Footer /></div>
    </section>
  );
};

export default ProductListPage;
