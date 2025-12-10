import React from "react";
import { useNavigate } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";

const categories = [
  { name: "Merchandise", color: "#800040", icon: "👕" },
  { name: "All", color: "#004d4d", icon: "📖" },
  { name: "IT Books", color: "#222c7a", icon: "💻" },
  { name: "Electrical Books", color: "#001F54", icon: "⚡" },
  { name: "Civil Books", color: "#7A0900", icon: "🏗️" },
  { name: "Law Books", color: "#054C29", icon: "⚖️" },
  { name: "Medical Books", color: "#660000", icon: "🩺" },
  { name: "Management Books", color: "#005566", icon: "📊" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="pb-20 pt-36">
      <EcomHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">

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
        <div className="
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
                <span className="text-white text-2xl sm:text-3xl md:text-4xl">
                  {cat.icon}
                </span>
              </div>

              <p className="mt-3 font-medium text-[#2E2E2E] text-sm sm:text-base">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
