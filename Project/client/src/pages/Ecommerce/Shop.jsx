import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import ProductNoSlider from "../../components/EcommerceHomeSlider/ProductNoSlider";

// DATA
import {
  trendingProducts,
  merchandiseProducts,
  EnginneringProducts,
  LawProducts,
  ManagementProducts,
} from "../../data/ProductData";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
const urlParams = new URLSearchParams(location.search);
const initialCategory = urlParams.get("category");


  // All products merged
  const allProducts = [
    ...trendingProducts,
    ...EnginneringProducts,
    ...LawProducts,
    ...ManagementProducts,
    ...merchandiseProducts,
  ];

  // Filters
  const categories = [
    "IT Books",
    "Electrical Books",
    "Civil Books",
    "Law Books",
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

  // Add / Remove Wishlist
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

  const isAllSelected = selectedCategories.includes("All");

  const matchCategory =
    selectedCategories.length === 0 ||                      // no category selected
    (isAllSelected && selectedCategories.length === 1) ||   // ONLY "All" selected
    selectedCategories.includes(p.category);                // normal filtering

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

// Latest → no sorting


  return (
    <section className="pb-20 pt-36">
      <EcomHeader />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <p className="text-gray-600 text-md mb-5">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; Shop
        </p>

        {/* TOP SECTION */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#124734]">All Products</h1>

          <select
            className="border px-4 py-2 rounded-lg"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Latest">Latest</option>
            <option value="HighToLow">Price:High to Low</option>
            <option value="LowToHigh">Price:Low to High</option>
          </select>
        </div>

        {/* GRID (Sidebar + Products) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">

          {/* SIDEBAR */}
          <div className="border rounded-xl p-6 shadow bg-[#A7E1B2] h-fit ">

            <h2 className="text-xl font-bold mb-4">Category</h2>

            {categories.map((cat) => (
              <label key={cat} className="flex gap-2 items-center mt-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                   className="accent-[#124734]"
                />
                {cat}
              </label>
            ))}

            <h2 className="text-xl font-bold mt-6">Price</h2>
            <input
              type="range"
              min="1"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([1, Number(e.target.value)])}
               className="w-full mt-2 accent-[#124734]"
            />
            <p className="mt-2 font-semibold">
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
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Shop;
