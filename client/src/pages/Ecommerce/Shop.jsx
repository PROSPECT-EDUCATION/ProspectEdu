import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import ProductNoSlider from "../../components/EcommerceHomeSlider/ProductNoSlider";
import Footer from "../../components/Footer";
import { api } from "../../lib/api";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const initialCategory = urlParams.get("category");

  // ✅ same as backend predefined + Other
  const categories = [
    "IT Books",
    "Electrical Books",
    "Civil Books",
    "Law Books",
    "Medical Books",
    "Management Books",
    "Merchandise",
    "Other",
  ];

  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );

  const [priceRange, setPriceRange] = useState([1, 5000]);
  const [sortOption, setSortOption] = useState("Latest");

  // ✅ products from backend
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products for everyone
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/products"); // => /api/v1/products (based on your api baseURL)

        const products = (res?.data?.products || []).map((p) => {
          const price = Number(p.price || 0);
          const offer = Number(p.offerPrice || 0);

          // oldPrice show as price, and offer as current (like your UI)
          const oldPrice = price;
          const finalPrice = offer > 0 ? offer : price;

          return {
            id: p._id,
            title: p.name,
            img: (p.images && p.images[0]) || "https://via.placeholder.com/300x300?text=Product",
            images: Array.isArray(p.images) ? p.images : [],
            oldPrice: oldPrice,
            price: finalPrice,
            save: Math.max(0, oldPrice - finalPrice),
            outOfStock: Boolean(p.outOfStock) || Number(p.quantity || 0) <= 0,
            category: (p.category || "").trim(), // predefined OR "Other"
            customCategory: p.customCategory || "",
            description: p.description || "",
          };
        });

        if (mounted) setAllProducts(products);
      } catch (e) {
        console.error("Failed to load products:", e);
        if (mounted) setAllProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Category toggle
  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some(
          (cat) => (p.category || "").toLowerCase() === cat.toLowerCase()
        );

      const matchPrice = Number(p.price || 0) <= priceRange[1];
      return matchCategory && matchPrice;
    });

    if (sortOption === "HighToLow") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    if (sortOption === "LowToHigh") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    return list;
  }, [allProducts, selectedCategories, priceRange, sortOption]);

  return (
    <section className="pt-36">
      <EcomHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-left pb-20">
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
                <label
                  key={cat}
                  className="flex gap-2 items-center text-sm sm:text-base"
                >
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
            {loading ? (
              <div className="p-6 text-[#124734] font-semibold">Loading products...</div>
            ) : (
              <ProductNoSlider products={filtered} columns={3} />
            )}
          </div>
        </div>
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </section>
  );
};

export default Shop;
