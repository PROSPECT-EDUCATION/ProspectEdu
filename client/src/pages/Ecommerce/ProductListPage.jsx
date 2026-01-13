import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import ProductNoSlider from "../../components/EcommerceHomeSlider/ProductNoSlider";
import Footer from "../../components/Footer";
import { api } from "../../lib/api"; // ✅ ADDED

// PRODUCT DATA IMPORT (keep trending + management static)
import { trendingProducts } from "../../data/ProductData";

const ProductListPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  // ✅ backend products mapped to same UI shape
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        const res = await api.get("/products"); // /api/v1/products
        const products = res?.data?.products || [];

        const mapped = products.map((p) => {
          const price = Number(p.price || 0);
          const offer = Number(p.offerPrice || 0);
          const oldPrice = price;
          const finalPrice = offer > 0 ? offer : price;

          return {
            id: p._id,
            title: p.name,
            description: p.description || "",
            img:
              (Array.isArray(p.images) && p.images[0]) ||
              "https://via.placeholder.com/300x300?text=Product",
            images: Array.isArray(p.images) ? p.images : [],
            oldPrice,
            price: finalPrice,
            save: Math.max(0, oldPrice - finalPrice),
            outOfStock: Boolean(p.outOfStock) || Number(p.quantity || 0) <= 0,
            category: (p.category || "").trim(),
            customCategory: p.customCategory || "",
          };
        });

        if (!mounted) return;
        setAllProducts(mapped);
      } catch (e) {
        console.error("Failed to load products:", e);
        if (!mounted) return;
        setAllProducts([]);
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const products = useMemo(() => {
    const isCat = (prod, cat) =>
      (prod.category || "").toLowerCase() === cat.toLowerCase();

    if (type === "trending-products") return trendingProducts; // ✅ same
   

    if (type === "engineering-products") {
      // ✅ Home page logic: IT + Electrical + Civil in one list
      return allProducts.filter(
        (p) => isCat(p, "IT Books") || isCat(p, "Electrical Books") || isCat(p, "Civil Books")
      );
    }

    if (type === "law-products") {
      return allProducts.filter((p) => isCat(p, "Law Books"));
    }

    if (type === "medical-products") {
      return allProducts.filter((p) => isCat(p, "Medical Books"));
    }

    if (type === "merchandise-products") {
      return allProducts.filter((p) => isCat(p, "Merchandise"));
    }
    if (type === "management-products") {
      return allProducts.filter((p) => isCat(p, "Management Books"));
    }

    return [];
  }, [type, allProducts]);

  // ------- FORMAT TITLE -------
  const formatTitle = (t) => t.replace("-", " ").replace("-", " ").toUpperCase();

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

        {/* PRODUCT GRID (layout same) */}
        <ProductNoSlider
          products={products}
          cartItems={[]}
          wishlist={[]}
          onCart={() => {}}
          onWishlist={() => {}}
          columns={4} // ⭐ KEEPING DESKTOP EXACTLY SAME
        />
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </section>
  );
};

export default ProductListPage;
