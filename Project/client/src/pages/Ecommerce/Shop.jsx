import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import ProductNoSlider from "../../components/EcommerceHomeSlider/ProductNoSlider";

// DATA
import {
  merchandiseProducts,
  EnginneringProducts,
  LawProducts,
  ManagementProducts,
  MedicalProducts,
} from "../../data/ProductData";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const initialCategory = urlParams.get("category");

  // All products merged
  const allProducts = [
    ...EnginneringProducts,
    ...LawProducts,
    ...MedicalProducts,
    ...ManagementProducts,
    ...merchandiseProducts,
  ];

  // Filters
  const categories = [
    "IT Books",
    "Electrical Books",
    "Civil Books",
    "Law Books",
    "Medical Books",
    "Management Books",
    "Merchandise",
  ];

  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );

  const [priceRange, setPriceRange] = useState([1, 5000]);
  const [sortOption, setSortOption] = useState("Latest");

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Add to Cart
  const handleCart = (p) => {
    if (!cartItems.includes(p.id)) {
      setCartItems([...cartItems, p.id]);
    }
  };

  // Wishlist
  const handleWishlist = (p) => {
    if (wishlist.includes(p.id)) {
      setWishlist(wishlist.filter((id) => id !== p.id));
    } else {
      setWishlist([...wishlist, p.id]);
    }
  };

  // Category toggle
  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  // Filtering
  let filtered = allProducts.filter((p) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (cat) => p.category.trim().toLowerCase() === cat.trim().toLowerCase()
      );

    const matchPrice = p.price <= priceRange[1];

    return matchCategory && matchPrice;
  });

  // ---- SORTING ----
  if (sortOption === "HighToLow") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }
  if (sortOption === "LowToHigh") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }

  return (
    <section className="pb-20 pt-36">
      <EcomHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Breadcrumb */}
        <p className="text-gray-600 text-sm sm:text-md mb-4 sm:mb-5">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; Shop
        </p>

        {/* TOP SECTION */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#124734]">
            All Products
          </h1>

          <select
            className="border px-3 py-2 rounded-lg w-full sm:w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Latest">Latest</option>
            <option value="HighToLow">Price: High to Low</option>
            <option value="LowToHigh">Price: Low to High</option>
          </select>
        </div>

        {/* LAYOUT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* SIDEBAR */}
          <div className="border rounded-xl p-4 sm:p-6 shadow bg-[#A7E1B2] h-fit md:sticky md:top-36">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Category</h2>

            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex gap-2 items-center text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="accent-[#124734]"
                  />
                  {cat}
                </label>
              ))}
            </div>

            <h2 className="text-lg sm:text-xl font-bold mt-6 mb-2">Price</h2>

            <input
              type="range"
              min="1"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([1, Number(e.target.value)])}
              className="w-full accent-[#124734]"
            />

            <p className="mt-2 font-semibold text-sm sm:text-base">
              ₹1 – ₹{priceRange[1]}
            </p>
          </div>

          {/* PRODUCTS */}
          <div className="md:col-span-3">
            <ProductNoSlider
              products={filtered}
              cartItems={cartItems}
              wishlist={wishlist}
              onCart={handleCart}
              onWishlist={handleWishlist}
              columns={3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
