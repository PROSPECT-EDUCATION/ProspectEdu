import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import logo from "../../assets/logo.webp";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import ProductSlider from "../../components/EcommerceHomeSlider/ProductSlider";
import book from "../../assets/book.webp";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Footer from "../../components/Footer";

const ProductDetail = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const { state: product } = useLocation();

  React.useEffect(() => {
  const first = product?.images?.[0] || product?.img;
  setThumbnail(first);
}, [product]);


  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
        product.title
      )}`,
      "_blank"
    );
  };

  const [thumbnail, setThumbnail] = React.useState(product?.img);
  const [quantity, setQuantity] = React.useState(1);

  const [toast, setToast] = React.useState("");
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  if (!product) {
    return (
      <div className="pt-36 px-6 text-xl text-red-600">
        No product data found.
      </div>
    );
  }

  const images =
  product?.images && product.images.length > 0
    ? product.images
    : [product.img];


  const trendingProducts = [
    { id: 1, title: "IT Books", img: book, price: 299, oldPrice: 499, save: 200, outOfStock: false },
    { id: 2, title: "Electrical Books", img: book, price: 249, oldPrice: 349, save: 100, outOfStock: false },
    { id: 3, title: "Civil Books", img: book, price: 199, oldPrice: 299, save: 100, outOfStock: true },
    { id: 4, title: "Law Books", img: book, price: 399, oldPrice: 499, save: 100, outOfStock: false },
    { id: 5, title: "Management Books", img: book, price: 299, oldPrice: 399, save: 100, outOfStock: false },
    { id: 6, title: "Notebooks", img: book, price: 299, oldPrice: 399, save: 100, outOfStock: false }
  ];

  return (
    <section className="pt-36">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white shadow-xl px-6 py-2 rounded-full text-[#124734] border z-[9999]">
          {toast}
        </div>
      )}

      <EcomHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20 text-left">

        {/* Breadcrumb */}
        <p className="text-gray-600 mb-3 sm:mb-5 text-sm sm:text-base">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; {product.title}
        </p>

        <div className="flex flex-col md:flex-row gap-10 sm:gap-16 mt-4">

          {/* LEFT IMAGE SECTION */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 order-2 sm:order-1 justify-center">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border w-20 h-20 sm:w-24 sm:h-24 border-gray-300 rounded cursor-pointer"
                >
                  <img src={image} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="order-1 sm:order-2 border border-gray-300 w-full sm:w-80 md:w-96 rounded overflow-hidden mx-auto">
              <img src={thumbnail} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="w-full md:w-1/2">

            {/* Title + Heart */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>

              <button
                onClick={() => toggleWishlist(product,navigate)}
                className="p-2 rounded-full bg-[#A7E1B2]/40 hover:bg-[#A7E1B2] transition"
              >
                {wishlist.some((item) => item.id === product.id) ? (
                  <FaHeart className="text-[#124734] text-2xl" />
                ) : (
                  <FiHeart className="text-[#124734] text-2xl" />
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-700 mt-2 text-sm sm:text-base">
              {product.description}
            </p>

            {/* Rating + Stock */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-yellow-500 text-lg">
                {"★".repeat(5)}
              </div>
              <p>(5)</p>

              {product.outOfStock ? (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                  ✖ Out of stock
                </span>
              ) : (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  ✔ In stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                ₹{product.price}.00
                <span className="text-gray-400 line-through text-lg sm:text-xl">
                  ₹{product.oldPrice}.00
                </span>
              </p>

              <p className="text-gray-600 mt-2 text-sm sm:text-md">
                Inclusive of all taxes (Includes applicable duties)
              </p>
            </div>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">
              <p className="text-base sm:text-lg font-semibold">Quantity:</p>

              <input
                type="number"
                min="1"
                max="5"
                value={quantity}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "") return setQuantity("");
                  const n = Number(v);
                  if (n >= 1 && n <= 5) setQuantity(n);
                }}
                disabled={product.outOfStock}
                className={`w-20 px-3 py-2 rounded-lg border ${
                  product.outOfStock
                    ? "bg-gray-100 text-red-500 cursor-not-allowed"
                    : "bg-white border-[#124734]"
                }`}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {product.outOfStock ? (
                <button
                  onClick={() => showToast("We will notify you when the product arrives")}
                  className="w-full py-3 bg-red-200 text-red-700 rounded hover:bg-red-300"
                >
                  Notify Me 🔔
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      const accessToken = sessionStorage.getItem("accessToken");
                      if (!accessToken) return navigate("/login");

                     const pid = String(product.id || product._id || "");
                        const exists = cart.some((item) => String(item.id) === pid);

                        if (exists) return showToast("❗ Already in cart");

                        // ✅ ensure cart item shape matches Cart.jsx usage
                        addToCart(
                          {
                            id: pid,
                            title: product.title || product.name || "",
                            img: product.img || (product.images && product.images[0]) || "",
                            images: product.images || [],
                            price: product.price,
                            oldPrice: product.oldPrice,
                            outOfStock: product.outOfStock,
                            category: product.category,
                            description: product.description,
                            quantity,
                          },
                          navigate
                        );

                        showToast("✅ Added to cart");

                    }}
                    className="w-full py-3 bg-[#A7E1B2] text-gray-800 rounded hover:bg-gray-300"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      navigate("/checkout", {
                        state: { product: { ...product, quantity } },
                      })
                    }
                    className="w-full py-3 bg-[#124734] text-white rounded hover:bg-[#124734]/90"
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>

            {/* Extra Info */}
            <div className="mt-8 space-y-3 text-sm sm:text-base">
              <p className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">🏷️</span>
                Total price includes all taxes
              </p>

              <p className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">🚚</span>
                Free shipping on orders above ₹1000
              </p>

              {/* Share */}
              <div className="flex items-center gap-4 mt-5">
                <span className="font-semibold">Share:</span>

                <button onClick={shareFacebook} className="w-10 h-10 flex items-center justify-center rounded-md bg-[#A7E1B2]">
                  <FaFacebookF className="text-indigo-700" />
                </button>

                <button onClick={shareTwitter} className="w-10 h-10 flex items-center justify-center rounded-md bg-[#A7E1B2]">
                  <FaXTwitter className="text-black" />
                </button>

                <button onClick={shareWhatsApp} className="w-10 h-10 flex items-center justify-center rounded-md bg-[#A7E1B2]">
                  <FaWhatsapp className="text-green-600 text-xl" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related + Recently Viewed */}
      <ProductSlider title="Related Products" products={trendingProducts} navigate={navigate} />
      <ProductSlider title="Recently Viewed" products={trendingProducts} navigate={navigate} />
       <div className="pt-10"> <Footer /></div>
    </section>
  );
};

export default ProductDetail;
