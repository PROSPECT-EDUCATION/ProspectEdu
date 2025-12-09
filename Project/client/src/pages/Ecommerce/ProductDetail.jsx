import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import logo from "../../assets/logo.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import ProductSlider from "../../components/EcommerceHomeSlider/ProductSlider";
import book from "../../assets/book.png";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";




const ProductDetail = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const { addToCart,cart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();



  const { state: product } = useLocation(); // ⭐ get product from navigate
  React.useEffect(() => {
  setThumbnail(product.img);
}, [product]);

  
 // SHARE FUNCTIONS
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
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(product.title)}`,
    "_blank"
  );
};



  
  const [quantity, setQuantity] = React.useState(1);


  // If someone opens directly without clicking from home
  if (!product) {
    return (
      <div className="pt-36 px-10 text-xl text-red-600">
        No product data found.
      </div>
    );
  }
  


  // Recently viewed products (dummy data)
    const trendingProducts = [
      { id: 1, title: "IT Books", img: book, price: 299, oldPrice: 499, save: 200, outOfStock: false,description:"Comprehensive IT books covering programming, networking, and more." },
      { id: 2, title: "Electrical Books", img: book, price: 249, oldPrice: 349, save: 100, outOfStock: false,description:"Comprehensive electrical engineering books covering various topics and case studies." },
      { id: 3, title: "Civil Books", img: book, price: 199, oldPrice: 299, save: 100, outOfStock: true,description:"Comprehensive civil engineering books covering various topics and case studies." },
      { id: 4, title: "Law Books", img: book, price: 399, oldPrice: 499, save: 100, outOfStock: false,description:"Comprehensive law books covering various legal topics and case studies." },
      { id: 5, title: "Management Books", img: book, price: 299, oldPrice: 399, save: 100, outOfStock: false,description:"Comprehensive management books covering business strategies and leadership." },
      { id: 6, title: "Notebooks", img: book, price: 299, oldPrice: 399, save: 100, outOfStock: false,description:"Set of 3 high-quality plain notebooks with 300 pages each and durable spiral binding. Ideal for school, college, office, and personal use. Perfect for notes, sketches, and drafting." },
    ];

  // Thumbnail (use main image if no gallery)
  const images = [product.img, product.img, product.img,logo];
  const [thumbnail, setThumbnail] = React.useState(product.img);

  const [toast, setToast] = React.useState("");
    const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
    };


  return (
    <section className="pb-20 pt-36">
      {toast && (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white shadow-xl px-6 py-2 rounded-full text-[#124734] border z-[9999]
">
    {toast}
  </div>
)}

      <EcomHeader />

      

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <p className="text-gray-600 mb-5">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; {product.title}
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">

          {/* Thumbnail Images */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-300 rounded cursor-pointer"
                >
                  <img src={image} />
                </div>
              ))}
            </div>

            <div className="border border-gray-300 max-w-sm rounded overflow-hidden">
              <img src={thumbnail} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Right Side Info */}
          <div className="w-full md:w-1/2">

           <div className="flex items-center justify-between w-full">
  <h1 className="text-3xl font-bold">{product.title}</h1>

  {/* Heart Button */}
  <button
    onClick={() => toggleWishlist(product)}
    className="p-2 rounded-full bg-[#A7E1B2]/40 hover:bg-[#A7E1B2] transition"
  >
    {wishlist.some((item) => item.id === product.id) ? (
      <FaHeart className="text-[#124734] text-2xl" />
    ) : (
      <FiHeart className="text-[#124734] text-2xl" />
    )}
  </button>
</div>

            {/* PRODUCT DESCRIPTION */}
            <p className="text-gray-700 text-base mt-2">
            {product.description}
            </p>
            
            <div className="flex items-center gap-4 mt-1">
            {/* Rating */}
            <div className="flex items-center gap-2 mt-1">
              <div className="text-yellow-500 text-lg">{"★".repeat(5)}</div>
              <p>(5)</p>
            </div>

                        {/* STOCK BADGE */}
            {product.outOfStock ? (
                <div className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                <span className="text-red-700 text-lg">✖</span>
                out of stock
                </div>
            ) : (
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <span className="text-green-700 text-lg">✔</span>
                in stock
                </div>
            )}
            </div>

           <div className="mt-6">

            {/* Actual price */}
            <p className="text-3xl font-bold text-black flex items-center gap-3">

                ₹{product.price}.00 

                {/* Old Price */}
                <span className="text-gray-400 line-through text-xl">
                ₹{product.oldPrice}.00
                </span>
            </p>

            {/* Taxes text */}
            <p className="text-gray-600 mt-2 text-md">
                Inclusive of all taxes (Also includes all applicable duties)
            </p>

            </div>

                        {/* Quantity */}
            <div className="mt-6 flex items-center gap-4 ">

            <p className="text-lg font-semibold">Quantity:</p>

            <input
                type="number"
                min="1"
                max="5"
                value={quantity}
                 onChange={(e) => {
                    const value = e.target.value;

                    // allow clearing input
                    if (value === "") {
                      setQuantity("");
                      return;
                    }

                    const num = Number(value);

                    if (num >= 1 && num <= 5) {
                      setQuantity(num);
                    }
                  }}
                disabled={product.outOfStock}
                className={`w-20 px-3 py-2 rounded-lg border 
                ${
                    product.outOfStock
                    ? "bg-gray-100 text-red-500 border-gray-300 cursor-not-allowed"
                    : "bg-white text-black border-[#124734] focus:border-green-1000 outline-none "
                }`}
            />
            </div>

            


           

            {/* Buttons */}
           
<div className="flex items-center mt-10 gap-4 text-base">
  {product.outOfStock ? (
    <button
      onClick={() => showToast("We will notify you when the product arrives")}
      className="w-full py-3.5 bg-red-200 text-red-700 rounded hover:bg-red-300 transition"
    >
      Notify Me 🔔
    </button>
  ) : (
    <>
     <button
  onClick={() => {
    const cleanId = Number(product.id); 
    const exists = cart.some((item) => Number(item.id) === cleanId);

    if (exists) {
      showToast("❗ Already in cart");
    } else {
      addToCart({ ...product, id: cleanId, quantity });
      showToast("✅ Added to cart");
    }
  }}
  className="w-full py-3.5 bg-[#A7E1B2] text-gray-800 rounded hover:bg-gray-300"
>
  Add to Cart
</button>

     <button
  onClick={() => {
    navigate("/checkout", {
      state: {
        product: { ...product, quantity }
      }
    });
  }}
  className="w-full py-3.5 bg-[#124734] text-white rounded hover:bg-[#124734]/90"
>
  Buy now
</button>

    </>
  )}
</div>


            {/* Additional Info */}
<div className="mt-8 space-y-3">

  {/* Line 1 */}
  <p className="flex items-center gap-3 text-gray-700">
    <span className="text-xl">🏷️</span>
    The total price includes all taxes, with no additional charges at checkout
  </p>

  {/* Line 2 */}
  <p className="flex items-center gap-3 text-gray-700">
    <span className="text-xl">🚚</span>
    Enjoy free shipping on all orders above ₹1000 ! No additional charges apply.
  </p>

  {/* SHARE SECTION */}
  <div className="flex items-center gap-4 mt-5">
  <span className="text-lg font-semibold text-gray-800">Share:</span>

  {/* Facebook */}
  <button
    onClick={shareFacebook}
    className="w-10 h-10 flex items-center justify-center rounded-md bg-[#A7E1B2] hover:bg-[#A7E1B2] transition"
  >
    <FaFacebookF className="text-indigo-700 text-lg" />
  </button>

  {/* X / Twitter */}
  <button
    onClick={shareTwitter}
    className="w-10 h-10 flex items-center justify-center rounded-md bg-[#A7E1B2] hover:bg-[#A7E1B2] transition"
  >
    <FaXTwitter className="text-black text-lg" />
  </button>

  {/* WhatsApp */}
  <button
    onClick={shareWhatsApp}
    className="w-10 h-10 flex items-center justify-center rounded-md bg-[#A7E1B2] hover:bg-[#A7E1B2] transition"
  >
    <FaWhatsapp className="text-green-600 text-xl" />
  </button>
</div>

</div>

          </div>
        </div>
      </div>
      {/* --------- Trending Products --------- */}
        <ProductSlider title="Related Products" products={trendingProducts} navigate={navigate} />
         {/* --------- Enginnering Products --------- */}
        <ProductSlider title="Recently viewed " products={trendingProducts} navigate={navigate} />
    </section>

     
  );
};

export default ProductDetail;
