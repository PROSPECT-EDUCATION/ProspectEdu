import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import Footer from "../../components/Footer";
import { api } from "../../lib/api"; // ✅ add

const Categories = () => {
  const navigate = useNavigate();

  // ✅ admin-created categories from backend
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    const palette = [
      "#800040",
      "#004d4d",
      "#222c7a",
      "#001F54",
      "#7A0900",
      "#054C29",
      "#660000",
      "#005566",
    ];

    const load = async () => {
      try {
        const res = await api.get("/categories"); // /api/v1/categories
        const items = res?.data?.categories || [];

        const mapped = items.map((c, idx) => ({
          name: c.name,
          img: c.imageUrl,
          color: palette[idx % palette.length],
        }));

        if (!mounted) return;
        setCategories(mapped);
      } catch (e) {
        if (!mounted) return;
        setCategories([]);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className=" pt-36">
      <EcomHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pb-20 text-left">
        {/* Breadcrumb */}
        <p className="text-gray-600 text-xs sm:text-sm mb-6">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; Categories
        </p>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#2E2E2E] mb-10">
          Explore All Categories ({categories.length} Categories Found)
        </h2>

        {/* Categories GRID */}
        <div
          className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          gap-6 sm:gap-10
        "
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="text-center cursor-pointer"
              onClick={() => navigate(`/shop?category=${cat.name}`)}
            >
              <div
                className="
                  mx-auto rounded-full flex items-center justify-center shadow-md 
                  w-20 h-20 
                  sm:w-24 sm:h-24 
                  md:w-28 md:h-28
                "
                style={{ backgroundColor: cat.color }}
              >
                {/* ✅ ONLY change: icon -> image (layout same) */}
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                />
              </div>

              <p className="mt-3 font-medium text-[#2E2E2E] text-sm sm:text-base">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-10">
        {" "}
        <Footer />
      </div>
    </section>
  );
};

export default Categories;
