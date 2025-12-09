import React, { useState, useEffect } from "react";
import logoImg from "../assets/logo.jpg";
import { FiShoppingBag, FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaShoppingBag, FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoSearch, IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  trendingProducts,
  merchandiseProducts,
  EnginneringProducts,
  LawProducts,
  ManagementProducts,
} from "../data/ProductData";



const EcomHeader = () => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState([]);


  const [openMenu, setOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const allProducts = [
  ...trendingProducts,
  ...EnginneringProducts,
  ...LawProducts,
  ...ManagementProducts,
  ...merchandiseProducts,
];
const handleSearch = (value) => {
  setSearchQuery(value);

  if (!value.trim()) {
    setSearchResults([]);
    return;
  }

  const results = allProducts.filter((p) =>
    p.title.toLowerCase().includes(value.toLowerCase())
  );

  setSearchResults(results);
};


  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full bg-white fixed top-0 left-0 z-50 transition-all duration-300 shadow-md 
      ${isScrolled ? "py-1 shadow-lg" : "py-0"}`}
    >

      {/* --- Top Welcome Bar --- */}
      {!isScrolled && (
        <div className="w-full bg-[#124734] text-white text-center py-2 text-sm font-medium">
          Welcome to the Store
        </div>
      )}

      {/* --- Main Header --- */}
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 
        ${isScrolled ? "py-2 px-4" : "py-6 px-6"}`}
      >

        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/ecommerce-home")}
        >
          <img
            src={logoImg}
            alt="Logo"
            className={`rounded-full transition-all duration-300 
            ${isScrolled ? "w-12 h-12" : "w-16 h-16"}`}
          />

          <h1
            className={`font-bold text-[#124734] leading-none transition-all duration-300
            ${isScrolled ? "text-xl" : "text-2xl"}`}
          >
            Prospect Store
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative ">
  <div
  className={`flex items-center bg-[#A7E1B2] rounded-full shadow-lg transition-all duration-300
  ${isScrolled ? "py-1 px-3 max-w-sm mx-4" : "py-3 px-5 max-w-lg mx-8"}`}
>
  <IoSearch size={isScrolled ? 20 : 28} className="text-[#124734]" />
  <input
    type="text"
    placeholder="Search for a product..."
    value={searchQuery}
    onChange={(e) => handleSearch(e.target.value)}
    className="w-full bg-transparent outline-none px-3 text-[#124734]"
  />
</div>

  {/* ------- SEARCH RESULTS BOX ------- */}
  {searchQuery && (
    <div className="absolute left-0 right-0 bg-white shadow-xl rounded-lg mt-2 max-h-80 overflow-y-auto z-50">

      {searchResults.length === 0 ? (
        <p className="p-4 text-gray-500">No product found</p>
      ) : (
        searchResults.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              navigate(`/product/${p.title.toLowerCase().replace(/ /g, "-")}`, {
                state: p,
              });
              setSearchQuery("");
              setSearchResults([]);
            }}
          >
            <img src={p.img} className="w-12 h-12 object-contain" />
            <p className="font-medium">{p.title}</p>
          </div>
        ))
      )}
    </div>
  )}
</div>


        {/* Right Side Icons */}
        <div
          className={`flex items-center gap-6 text-[#124734] font-medium transition-all duration-300
          ${isScrolled ? "text-sm" : "text-base"}`}
        >

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className={`flex items-center gap-1 bg-[#A7E1B2] rounded-full shadow transition-all duration-300
              ${isScrolled ? "px-2 py-1" : "px-4 py-2"}`}
            >
              <IoPersonCircle size={isScrolled ? 20 : 24} />
              <span>Akshat</span>
              <span>▼</span>
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50">
                <button
                  onClick={() => navigate("/my-profile")}
                  className="w-full text-left px-4 py-2 hover:bg-[#A7E1B2]"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate("/my-order")}
                  className="w-full text-left px-4 py-2 hover:bg-[#A7E1B2]"
                >
                  My Orders
                </button>
               <button
                  onClick={() => setShowLogoutPopup(true)}
                  className="w-full text-left px-4 py-2 hover:bg-[#A7E1B2]">
                  Logout
                </button>

              </div>
            )}
          </div>

          {/* SHOP */}
          <div 
          onClick={() => navigate("/shop")}
          className="group flex items-center gap-2 cursor-pointer">
             
            <FiShoppingBag size={isScrolled ? 20 : 26} className="group-hover:hidden" />
            <FaShoppingBag size={isScrolled ? 20 : 26} className="hidden group-hover:block text-[#1E5631]" />
            <span className="group-hover:text-[#1E5631] transition">Shop</span>
          </div>

          <div className="w-[2px] h-7 bg-gray-400"></div>

          {/* WISHLIST */}
          <div
           onClick={() => navigate("/wishlist")} 
          className="group flex items-center gap-2 cursor-pointer">
            <FiHeart size={isScrolled ? 20 : 26} className="group-hover:hidden" />
            <FaHeart size={isScrolled ? 20 : 26} className="hidden group-hover:block text-[#1E5631]" />
            <span className="group-hover:text-[#1E5631] transition">
              My Wishlist
            </span>
          </div>

          <div className="w-[2px] h-7 bg-gray-400"></div>

          {/* CART */}
          <div 
           onClick={() => navigate("/my-cart")} 
          className="group flex items-center gap-2 cursor-pointer">
            <FiShoppingCart size={isScrolled ? 20 : 26} className="group-hover:hidden" />
            <FaShoppingCart size={isScrolled ? 20 : 26} className="hidden group-hover:block text-[#1E5631]" />
            <span className="group-hover:text-[#1E5631] transition">My Cart</span>
          </div>
        </div>
      </div>
      {showLogoutPopup && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
    
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[340px] text-center animate-fadeIn">

      <div className="text-4xl mb-3 text-[#124734]">⚠️</div>

      <h2 className="text-xl font-bold text-[#124734] mb-3">
        Are you sure you want to logout?
      </h2>

      <p className="text-gray-600 mb-6">
        You will be redirected to the home page.
      </p>

      <div className="flex gap-4">
        
        <button
          onClick={() => setShowLogoutPopup(false)}
          className="flex-1 border border-[#124734] text-[#124734] py-2 rounded-xl hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setShowLogoutPopup(false);
            window.location.href = "/ecommerce-home"; // you can change this
          }}
          className="flex-1 bg-[#124734] text-white py-2 rounded-xl hover:bg-[#0f3a23]"
        >
          Logout
        </button>

      </div>
    </div>
  </div>
)}

    </header>
  );
};

export default EcomHeader;
