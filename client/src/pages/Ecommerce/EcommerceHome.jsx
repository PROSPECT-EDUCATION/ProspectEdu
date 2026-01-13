import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiHeart } from "react-icons/fi";
import EcomHeader from "../../components/EcomHeader";
import img1 from "../../assets/EcommerceHome-carousel/c1.webp";
import img2 from "../../assets/EcommerceHome-carousel/c1.webp";
import img3 from "../../assets/EcommerceHome-carousel/c1.webp";
import contact from "../../assets/contact.webp";
import ProductSlider from "../../components/EcommerceHomeSlider/ProductSlider";
import Footer from "../../components/Footer";

import { api } from "../../lib/api"; // ✅ ADDED

import {
  trendingProducts,
} from "../../data/ProductData";

const categories = [
  { name: "Merchandise", color: "#800040", icon: "👕" },
  { name: "All", color: "#004d4d", icon: "📘" },
  { name: "IT Books", color: "#222c7a", icon: "💻" },
  { name: "Electrical Books", color: "#001F54", icon: "⚡" },
  { name: "Civil Books", color: "#7A0900", icon: "🏗️" },
  { name: "Law Books", color: "#054C29", icon: "⚖️" },
  { name: "Medical Books", color: "#660000", icon: "🩺" },
  { name: "Management Books", color: "#005566", icon: "📊" },
];

const Ecommerce = () => {
  const navigate = useNavigate();
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  // CATEGORY SLIDER STATES
  const [start, setStart] = useState(0);
  const visible = 5;

  const nextSlide = () => setStart((prev) => (prev + 1) % categories.length);
  const prevSlide = () =>
    setStart((prev) => (prev - 1 + categories.length) % categories.length);

  const visibleCategories = Array.from({ length: visible }).map(
    (_, i) => categories[(start + i) % categories.length]
  );

  // ✅ BACKEND PRODUCTS FOR HOME SLIDERS
  const [engineeringProducts, setEngineeringProducts] = useState([]);
  const [lawProducts, setLawProducts] = useState([]);
  const [medicalProducts, setMedicalProducts] = useState([]);
  const [merchandiseProducts, setMerchandiseProducts] = useState([]);
  const [managementProducts, setManagementProducts] = useState([]);

  // Auto slide banner
  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(slide);
  }, []);

  const goToSlide = (index) => setCurrent(index);

  // ✅ Load products for Engineering/Law/Medical sliders
  useEffect(() => {
    let mounted = true;

    const loadHomeSliders = async () => {
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

        const isCat = (prod, cat) =>
          (prod.category || "").toLowerCase() === cat.toLowerCase();

        const eng = mapped.filter(
          (p) =>
            isCat(p, "IT Books") ||
            isCat(p, "Electrical Books") ||
            isCat(p, "Civil Books")
        );

        const law = mapped.filter((p) => isCat(p, "Law Books"));
        const med = mapped.filter((p) => isCat(p, "Medical Books"));
        const merch = mapped.filter((p) => isCat(p, "Merchandise"));
        const manage = mapped.filter((p) => isCat(p, "Management Books"));

        if (!mounted) return;
        setEngineeringProducts(eng);
        setLawProducts(law);
        setMedicalProducts(med);
        setMerchandiseProducts(merch);
        setManagementProducts(manage);
      } catch (e) {
        console.error("Failed to load home slider products:", e);
        if (!mounted) return;
        setEngineeringProducts([]);
        setLawProducts([]);
        setMedicalProducts([]);
        setMerchandiseProducts([]);
        setManagementProducts([]);
      }
    };

    loadHomeSliders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className=" pt-36">
      <EcomHeader />

      <section className="max-w-7xl mx-auto px-4 mt-5 pb-20 text-left">
        {/* ---------- CAROUSEL ---------- */}
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
                className="w-full h-[200px] sm:h-[300px] md:h-[350px] object-cover flex-shrink-0"
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

        {/* ---------- CATEGORIES ---------- */}
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

          {/* responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {visibleCategories.map((cat, index) => (
              <div
                key={index}
                className="text-center cursor-pointer"
                onClick={() => navigate(`/shop?category=${cat.name}`)}
              >
                <div
                  className="mx-auto rounded-full flex items-center justify-center shadow-md
                  w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                  style={{ backgroundColor: cat.color }}
                >
                  <span className="text-white text-4xl sm:text-5xl md:text-6xl">
                    {cat.icon}
                  </span>
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

        {/* ---------- PRODUCT SLIDERS ---------- */}
        <ProductSlider title="Trending Products" products={trendingProducts} navigate={navigate} />

        {/* ✅ CHANGED: Engineering = IT + Electrical + Civil (from backend) */}
        <ProductSlider title="Engineering Products" products={engineeringProducts} navigate={navigate} />

        {/* ✅ CHANGED: Law (from backend) */}
        <ProductSlider title="Law Products" products={lawProducts} navigate={navigate} />

        <ProductSlider title="Management Products" products={managementProducts} navigate={navigate} />

        {/* ✅ CHANGED: Medical (from backend) */}
        <ProductSlider title="Medical Products" products={medicalProducts} navigate={navigate} />

        <ProductSlider title="Merchandise Products" products={merchandiseProducts} navigate={navigate} />

        {/* ---------- ASK QUESTIONS SECTION ---------- */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-[#A7E1B2]/30 shadow-md rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between border">
            {/* Left */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#124734] leading-snug">
                Ask Questions, <span className="text-gray-500">get help go beyond.</span>
              </h2>

              <p className="text-gray-600 mt-4 text-lg">
                Our experts can answer all your questions regarding Prospect Ecommerce Products.
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
              <img src={contact} alt="Ask Questions" className="w-48 sm:w-60 md:w-80" />
            </div>
          </div>
        </div>

        {/* ---------- SUPPLIER BOX ---------- */}
        <div className="mt-10 mx-auto max-w-xl p-4 sm:p-6 rounded-2xl shadow-md border border-[#A7E1B2]/40 bg-white text-center">
          <h3 className="text-xl font-semibold text-[#124734] mb-2">
            Want to Sell Your Products?
          </h3>
          <p className="text-gray-600 mb-4">
            Join us as a supplier and grow your business with our platform.
          </p>

          <button
            onClick={() => {
              const accessToken = sessionStorage.getItem("accessToken");
              const user = JSON.parse(sessionStorage.getItem("user") || "null");

              // ✅ pehle check login hai ya nahi
              if (!accessToken || !user) {
                // login page redirect + mark that user came from become supplier
                return navigate("/login", { state: { from: "become-supplier" } });
              }

              // ✅ agar login hai toh role check
              if (user.role === "supplier") {
                return navigate("/supplier");
              }

              return navigate("/supplier/apply");
            }}
            className="px-7 py-3 bg-[#124734] text-white font-semibold rounded-xl shadow hover:bg-[#0f3928] transition"
          >
            Become a Supplier
          </button>
        </div>
      </section>
      <div className="pt-10">
        <Footer />
      </div>
    </section>
  );
};

export default Ecommerce;
