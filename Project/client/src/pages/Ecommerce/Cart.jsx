

import React from "react";
import { useNavigate } from "react-router-dom";
import EcomHeader from "../../components/EcomHeader";
import { useCart } from "../../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, decreaseQty, removeFromCart, increaseQty } = useCart();

  // Calculate totals
  const totalMRP = cart.reduce((sum, p) => sum + p.oldPrice * p.quantity, 0);
  const totalPrice = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const discount = totalMRP - totalPrice;
  const tax = (totalPrice * 0.0).toFixed(2); // 1.5% tax example
// ⭐ Shipping charge logic
const shipping = totalPrice < 1000 ? 99 : 0;

// ⭐ Final amount
const grandTotal = (totalPrice + shipping).toFixed(2);


  return (
    <section className="pb-20 pt-36">
      <EcomHeader />

      <div className="max-w-6xl mx-auto px-6 py-10 font-[Open_Sans]">

        {/* Breadcrumb */}
        <p className="text-gray-600 text-md mb-5">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; My Cart
        </p>

        <h1 className="text-3xl font-bold mb-8 text-[#124734]">My Cart</h1>

      

          {/* Empty Cart  */}
          

          {cart.length === 0 && (
  <div className="flex flex-col items-center justify-center w-full min-h-[50vh] pt-10">

    <img
      src="https://cdn-icons-png.flaticon.com/512/16379/16379166.png
"
      alt="Empty Cart"
      className="w-40 opacity-90"
    />

    

    <p className="text-gray-600 text-lg mt-2">
      Your cart is empty.
    </p>

    <p className="text-gray-500 text-md">
      Start adding items to enjoy shopping!
    </p>

    <button
      onClick={() => navigate("/shop")}
      className="mt-6 px-8 py-3 bg-[#124734] text-white rounded-lg shadow hover:bg-[#0f3c2b]"
    >
      Start Shopping
    </button>
  </div>
)} 

  {/* NORMAL CART VIEW (with grid) */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

   

    {/* LEFT SIDE */}
    <div className="md:col-span-2 space-y-6">
    {cart.length > 0 && (
  <>
    {/* Header Row (like screenshot 2) */}
    <div className="grid grid-cols-4 font-semibold text-[#124734] border-b pb-3 mb-4">
      <p>Product</p>
      <p className="ml-8">Price</p>
      <p>Quantity</p>
      <p>Subtotal</p>
    </div>
  </>
)}


            { cart.length > 0 &&  
            cart.map((item) => (
             <div key={item.id} className="border rounded-2xl p-6 bg-[#A7E1B2]/20 shadow-md">

  <div className="grid grid-cols-4 items-center">

    {/* PRODUCT COLUMN */}
    <div className="flex items-start gap-4">

      {/* IMAGE + REMOVE BTN */}
      <div className="relative">
        <img
  src={item.img}
  className="w-24 h-28 object-contain rounded-lg cursor-pointer"
  onClick={() =>
    navigate(`/product/${item.title.toLowerCase().replace(/ /g, "-")}`, {
      state: item,
    })
  }
/>


        {/* SMALL GREY REMOVE BTN */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="absolute -top-2 -right-2 bg-gray-300 text-white 
                     w-5 h-5 rounded-full flex items-center justify-center text-xs"
        >
          ✕
        </button>
      </div>

      {/* TITLE (better aligned) */}
      <p
  className="font-semibold text-[20px] mt-8 leading-tight cursor-pointer"
  onClick={() =>
    navigate(`/product/${item.title.toLowerCase().replace(/ /g, "-")}`, {
      state: item,
    })
  }
>
  {item.title}
</p>


    </div>

    {/* PRICE (bold) */}
    <p className="font-bold text-[#124734] text-lg ml-8">
      ₹{item.price.toLocaleString()}
    </p>

    {/* QUANTITY */}
    <div className="flex items-center gap-3">
      <button
        onClick={() => decreaseQty(item.id)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        –
      </button>

      <span className="text-lg">{item.quantity}</span>

      <button
        onClick={() => increaseQty(item.id)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        +
      </button>
    </div>

    {/* SUBTOTAL (bold) */}
    <p className="font-bold text-[#124734] text-xl">
      ₹{(item.price * item.quantity).toLocaleString()}
    </p>
  </div>
</div>

            ))}

            {/* Bottom Buttons */}
{cart.length > 0 && (
  <div className="flex justify-between items-center mt-8">

    {/* Back to Store */}
    <button
      onClick={() => navigate("/shop")}
      className="px-6 py-2 border border-black text-black rounded-full hover:bg-[#124734]   hover:text-white transition"
    >
      Back to Store
    </button>

    

  </div>
)}

          </div>

          {/* RIGHT SIDE — SUMMARY BOX */}
         { cart.length > 0 && (
          <div className="p-6 border rounded-xl shadow bg-[#A7E1B2] h-fit">

            <p className="flex justify-between text-lg mb-3">
              <span>Total MRP</span> <span>₹{totalMRP}</span>
            </p>

            <p className="flex justify-between text-lg mb-3">
              <span>Discount on MRP</span>{" "}
              <span className="text-green-600">-₹{discount}</span>
            </p>

            <p className="flex justify-between text-lg mb-3">
              <span>Tax</span> <span>₹{tax}</span>
            </p>

            <p className="flex justify-between text-lg mb-4">
                <span>Shipping Charges*</span>
                

                {shipping === 0 ? (
                    <span className="text-green-700">Free</span>
                ) : (
                    <span className="text-green-600">₹99</span>
                )}
                </p>
             
            <hr />

            <p className="flex justify-between text-xl font-bold mt-4">
              <span>Total Amount</span> <span>₹{grandTotal}</span>
            </p>

            <button  onClick={() => navigate("/checkout")}
            className="w-full mt-6 py-3 bg-[#124734] text-white rounded-lg text-lg cursor-pointer">
              Proceed To Checkout
            </button>
           <span>* Free delivery on order above ₹1000</span>
          </div>
           
            )} 
           
        </div>
 
      </div>
    </section>
  );
};

export default Cart;
