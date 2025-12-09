import React, { useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";


const ProductSlider = ({ title, products, navigate }) => {
  const { wishlist, toggleWishlist } = useWishlist();

  // ⭐ Use global cart
  const { cart, addToCart } = useCart();

  const [start, setStart] = useState(0);
  const visibleCount = 5;

  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // ⭐ Slider
  const next = () => setStart((p) => (p + 1) % products.length);
  const prev = () => setStart((p) => (p - 1 + products.length) % products.length);

  const visibleItems = Array.from({ length: visibleCount }).map(
    (_, i) => products[(start + i) % products.length]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-16 mb-20">

      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white shadow-xl px-6 py-2 rounded-full text-[#124734] border z-50">
          {toastMsg}
        </div>
      )}

      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#2E2E2E]">{title}</h2>

        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center border rounded-full text-[#124734] text-2xl hover:bg-[#A7E1B2]"
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center border rounded-full text-[#124734] text-2xl hover:bg-[#A7E1B2]"
          >
            →
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {visibleItems.map((p) => (
          <div
            key={p.id}
            className="group relative border border-gray-300 rounded-xl p-3 shadow-md hover:shadow-xl transition bg-[#A7E1B2]/30"
          >
            {p.outOfStock && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-4 py-1 rounded-md shadow">
                Out of Stock
              </div>
            )}

            <div className="relative mt-4">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-40 object-contain rounded-md"
              />

              {/* Hover Icons */}
              <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">

                {/* Cart */}
                {!p.outOfStock && (
                  <button
                    onClick={() => {
                      addToCart(p);
                      showToast("Added to Cart");
                    }}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  >
                    {cart.some((item) => item.id === p.id) ? (
                      <FaShoppingCart size={18} className="text-green-600" />
                    ) : (
                      <FiShoppingCart size={18} className="text-[#124734]" />
                    )}
                  </button>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(p)}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  {wishlist.some((item) => item.id === p.id) ? (
                    <FaHeart size={18} className="text-green-600" />
                  ) : (
                    <FiHeart size={18} className="text-[#124734]" />
                  )}
                </button>
              </div>

              {/* View Details */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() =>
                    navigate(`/product/${p.title.toLowerCase().replace(/ /g, "-")}`, {
                      state: p,
                    })
                  }
                  className="bg-[#27c060] text-white px-5 py-1 rounded-full text-sm shadow"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Title */}
            <p className="mt-4 text-sm font-medium text-[#222] text-center">
              {p.title}
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-1 text-yellow-500 text-lg mt-1">
              {"★".repeat(5)}
            </div>

            {/* Price */}
            <div className="flex justify-center gap-2 mt-2">
              <span className="line-through text-gray-500 text-sm">₹{p.oldPrice}</span>
              <span className="font-semibold text-[#124734]">₹{p.price}</span>
              <span className="text-green-600 text-sm font-semibold">Save – ₹{p.save}</span>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="flex justify-end mt-2">
        <button
          onClick={() => navigate(`/products/${title.toLowerCase().replace(/ /g, "-")}`)}
          className="text-[#124734] text-xl font-bold hover:underline"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
