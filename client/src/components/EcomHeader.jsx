import React, { useState, useEffect } from "react";
import logoImg from "../assets/logo.webp";
import { FiShoppingBag, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
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
  const [mobileMenu, setMobileMenu] = useState(false);

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

    if (!value.trim()) return setSearchResults([]);

    const results = allProducts.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
  };

  // Detect scrolling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full bg-white fixed top-0 left-0 z-50 shadow-md transition-all duration-300 
      ${isScrolled ? "py-1 shadow-lg" : "py-0"}`}
    >
      {/* Top Bar */}
      {!isScrolled && (
        <div className="w-full bg-[#124734] text-white text-center py-2 text-xs sm:text-sm font-medium">
          Welcome to the Store
        </div>
      )}

      {/* MAIN NAV */}
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between 
        ${isScrolled ? "py-2 px-4" : "py-4 sm:py-6 px-3 sm:px-6"}`}
      >
        {/* LOGO */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={() => navigate("/ecommerce-home")}
        >
          <img
            src={logoImg}
            alt="logo"
            className={`rounded-full transition-all duration-300
            ${isScrolled ? "w-10 h-10 sm:w-12 sm:h-12" : "w-12 h-12 sm:w-16 sm:h-16"}`}
          />
          <h1
            className={`font-bold text-[#124734] transition-all duration-300
            ${isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}
          >
            Prospect Store
          </h1>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenu(true)}
          className="text-3xl text-[#124734] sm:hidden"
        >
          <FiMenu />
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden sm:flex items-center gap-6 text-[#124734] font-medium">

          {/* SEARCH BAR */}
          <div className="relative w-64 md:w-80">
            <div className="flex items-center bg-[#A7E1B2] rounded-full shadow-lg py-2 px-4">
              <IoSearch size={20} className="text-[#124734]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-transparent outline-none px-3"
              />
            </div>

            {/* DESKTOP SEARCH RESULTS */}
            {searchQuery && (
              <div className="absolute left-0 right-0 bg-white shadow-xl rounded-lg mt-2 max-h-64 overflow-y-auto z-[9999]">
                {searchResults.length === 0 ? (
                  <p className="p-4 text-gray-500 text-sm">No product found</p>
                ) : (
                  searchResults.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${p.title.toLowerCase().replace(/ /g, "-")}`, {
                          state: p,
                        });
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                    >
                      <img src={p.img} className="w-10 h-10 object-contain" />
                      <p className="font-medium text-sm">{p.title}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* USER MENU */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-1 bg-[#A7E1B2] px-4 py-2 rounded-full"
            >
              <IoPersonCircle size={22} />
              <span>Akshat</span>
              <span>▼</span>
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border">
                <button onClick={() => navigate("/my-profile")} className="w-full px-4 py-2 text-left hover:bg-[#A7E1B2]">My Profile</button>
                <button onClick={() => navigate("/my-order")} className="w-full px-4 py-2 text-left hover:bg-[#A7E1B2]">My Orders</button>
                <button onClick={() => setShowLogoutPopup(true)} className="w-full px-4 py-2 text-left hover:bg-[#A7E1B2]">Logout</button>
              </div>
            )}
          </div>

          {/* SHOP */}
          <div onClick={() => navigate("/shop")} className="group flex items-center gap-2 cursor-pointer">
            <FiShoppingBag className="group-hover:hidden" />
            <FaShoppingBag className="hidden group-hover:block text-[#1E5631]" />
            <span className="group-hover:text-[#1E5631]">Shop</span>
          </div>

          <div className="w-[2px] h-6 bg-gray-400"></div>

          {/* WISHLIST */}
          <div onClick={() => navigate("/wishlist")} className="group flex items-center gap-2 cursor-pointer">
            <FiHeart className="group-hover:hidden" />
            <FaHeart className="hidden group-hover:block text-[#1E5631]" />
            <span className="group-hover:text-[#1E5631]">Wishlist</span>
          </div>

          <div className="w-[2px] h-6 bg-gray-400"></div>

          {/* CART */}
          <div onClick={() => navigate("/my-cart")} className="group flex items-center gap-2 cursor-pointer">
            <FiShoppingCart className="group-hover:hidden" />
            <FaShoppingCart className="hidden group-hover:block text-[#1E5631]" />
            <span className="group-hover:text-[#1E5631]">My Cart</span>
          </div>
        </div>
      </div>

      {/* ⭐ MOBILE SLIDE MENU ⭐ */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-[9999]">
          <div className="absolute right-0 top-0 w-64 h-full bg-white shadow-xl p-6">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setMobileMenu(false)}
              className="text-2xl text-[#124734] mb-6"
            >
              <FiX />
            </button>

            {/* MOBILE SEARCH */}
            <div className="relative mb-6">
              <div className="w-full bg-[#A7E1B2] flex items-center px-4 py-2 rounded-full">
                <IoSearch size={20} className="text-[#124734]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="bg-transparent w-full outline-none ml-2"
                />
              </div>

              {/* MOBILE SEARCH RESULTS */}
              {searchQuery && (
                <div className="absolute left-0 right-0 bg-white rounded-lg shadow-xl mt-2 max-h-64 overflow-y-auto z-[9999]">
                  {searchResults.length === 0 ? (
                    <p className="p-3 text-gray-500">No product found</p>
                  ) : (
                    searchResults.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          navigate(`/product/${p.title.toLowerCase().replace(/ /g, "-")}`, {
                            state: p,
                          });
                          setMobileMenu(false);
                          setSearchQuery("");
                        }}
                      >
                        <img src={p.img} className="w-10 h-10 object-contain" />
                        <p>{p.title}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* MOBILE MENU LINKS */}
            <div className="flex flex-col gap-5 text-[#124734] text-lg">
              <button onClick={() => navigate("/shop")}>Shop</button>
              <button onClick={() => navigate("/wishlist")}>Wishlist</button>
              <button onClick={() => navigate("/my-cart")}>My Cart</button>
              <button onClick={() => navigate("/my-profile")}>My Profile</button>
              <button onClick={() => navigate("/my-order")}>My Orders</button>
              <button onClick={() => setShowLogoutPopup(true)}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* LOGOUT POPUP */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[300px] sm:w-[340px] text-center">
            <h2 className="text-xl font-bold text-[#124734] mb-3">
              Are you sure you want to logout?
            </h2>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="flex-1 border border-[#124734] text-[#124734] py-2 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutPopup(false);
                  window.location.href = "/ecommerce-home";
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
