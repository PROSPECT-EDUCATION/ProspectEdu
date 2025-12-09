import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiHeart, } from "react-icons/fi";

import EcomHeader from "../../components/EcomHeader";
 


import img1 from "../../assets/EcommerceHome-carousel/c1.png";
import img2 from "../../assets/EcommerceHome-carousel/c2.png";
import img3 from "../../assets/EcommerceHome-carousel/c3.png";
import contact from "../../assets/contact.png";
import ProductSlider from "../../components/EcommerceHomeSlider/ProductSlider";
import { trendingProducts, merchandiseProducts,EnginneringProducts,LawProducts,ManagementProducts } from "../../data/ProductData";




const categories = [
  { name: "Merchandise", color: "#800040", icon: "👕" },
  { name: "All", color: "#004d4d", icon: "📘" },
  { name: "IT Books", color: "#222c7a", icon: "💻" },
  { name: "Electrical Books", color: "#001F54", icon: "⚡" },
  { name: "Civil Books", color: "#7A0900", icon: "🏗️" },
  { name: "Law Books", color: "#054C29", icon: "⚖️" },
  { name: "Management Books", color: "#005566", icon: "📊" },
];

const Ecommerce = () => {
  const navigate = useNavigate();
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  // CATEGORY SLIDER STATES
  const [start, setStart] = useState(0);
  const visible = 5;

  const nextSlide = () => {
    setStart((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setStart((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const visibleCategories = Array.from({ length: visible }).map(
    (_, i) => categories[(start + i) % categories.length]
  );

  // Auto slide for banner
  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

  
    return () => clearInterval(slide);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  

  return (
    <section className="pb-20 pt-36">
      <EcomHeader />

      {/* --------- CAROUSEL --------- */}
      <section className="max-w-7xl mx-auto px-4 mt-5">

        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">

          <div
            className="flex transition-all duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="banner"
                className="w-full h-[350px] object-cover flex-shrink-0"
              />
            ))}
          </div>

          <div className="absolute bottom-4 w-full flex justify-center gap-3">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  current === i ? "bg-[#124734]" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

        </div>

        {/* --------- BROWSE CATEGORIES --------- */}
        <div className="max-w-7xl mx-auto px-4 mt-10 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#2E2E2E]">
              Browse By Categories
            </h2>

            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center border rounded-full text-[#124734] text-2xl hover:bg-[#A7E1B2]"
              >
                ←
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center border rounded-full text-[#124734] text-2xl hover:bg-[#A7E1B2]"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {visibleCategories.map((cat, index) => (
  <div
    key={index}
    className="text-center cursor-pointer"
      onClick={() => {
        navigate(`/shop?category=${cat.name}`);

      }}
  >
    <div
      className="w-35 h-35 mx-auto rounded-full flex items-center justify-center shadow-md"
      style={{ backgroundColor: cat.color }}
    >
      <span className="text-white text-6xl">{cat.icon}</span>
    </div>

    <p className="mt-3 font-medium text-[#2E2E2E]">{cat.name}</p>
  </div>
))}

          </div>

          {/* View All */}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => navigate("/categories")}
              className="text-[#124734] text-xl font-bold hover:underline"
            >
              View All
            </button>
          </div>

        </div>
        {/* --------- PRODUCT SLIDERS --------- */}
        {/* --------- Trending Products --------- */}
        <ProductSlider title="Trending Products" products={trendingProducts} navigate={navigate} />
         {/* --------- Enginnering Products --------- */}
        <ProductSlider title="Engineering Products" products={EnginneringProducts} navigate={navigate} />
        {/* --------- Law Products --------- */}
        <ProductSlider title="Law Products" products={LawProducts} navigate={navigate} />
        {/* --------- Managemet Products --------- */}
        <ProductSlider title="Management Products" products={ManagementProducts} navigate={navigate} />
          {/* --------- Merchandise Products --------- */}
        <ProductSlider title="Merchandise Products" products={merchandiseProducts} navigate={navigate} />

        {/* ---------------- ASK QUESTIONS SECTION ---------------- */}
<div className="max-w-7xl mx-auto px-6 py-16">
  <div className="bg-[#A7E1B2]/30 shadow-md rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between border ">

    {/* Left Text */}
    <div className="w-full md:w-1/2">
      <h2 className="text-4xl font-bold text-[#124734] leading-snug">
        Ask Questions, <span className="text-gray-500">get help go beyond.</span>
      </h2>

      <p className="text-gray-600 mt-4 text-lg">
        Our experts can answer all your questions regarding any Prospect Ecommerce Products over a phone call.
      </p>

      <div className="mt-6">
        <p className="text-[#124734] font-semibold text-xl">Call us</p>
        <p className="text-[#124734] text-2xl font-bold mt-1 flex items-center gap-2">
          📞 +91 9752812898
        </p>
      </div>
    </div>

    {/* Right Image */}
    <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
      <img
        src={contact}
        alt="Ask Questions"
        className="w-72 md:w-96"
      />
    </div>

  </div>
</div>

     <div className="mt-10 mx-auto max-w-xl p-6 rounded-2xl shadow-md border border-[#A7E1B2]/40 bg-white text-center">
  <h3 className="text-xl font-semibold text-[#124734] mb-2">
    Want to Sell Your Products?
  </h3>
  <p className="text-gray-600 mb-4">
    Join us as a supplier and grow your business with our platform.
  </p>

  <button
    onClick={() => navigate("/supplier")}
    className="px-7 py-3 bg-[#124734] text-white font-semibold rounded-xl shadow hover:bg-[#0f3928] transition"
  >
    Become a Supplier
  </button>
</div>



      </section>
    </section>
  );
};

export default Ecommerce;
