import React, { useState } from "react";
import logoImg from "../../assets/logo.jpg";


const DonateAmount = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-10 flex flex-col items-center font-[Open_Sans,sans-serif]">
      
      {/* Logo */}
      <img src={logoImg} alt="Prospect Logo" className="w-52 mb-6" />

      {/* Main Card */}
      <div className="bg-[#A7E1B2] max-w-4xl w-full rounded-xl shadow-md p-8">

        {/* Amount Options */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

          {/* 100 */}
          <label className="border p-5 rounded-xl bg-white cursor-pointer">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="amount"
                onChange={() => setAmount(1000)}
              />
              <p className="text-xl font-semibold">₹1000</p>
            </div>
            <p className="text-gray-700">Thank you for paying ₹1000</p>
          </label>

          {/* 200 */}
          <label className="border p-5 rounded-xl bg-white cursor-pointer">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="amount"
                onChange={() => setAmount(2000)}
              />
              <p className="text-xl font-semibold">₹2000</p>
            </div>
            <p className="text-gray-700">Thank you for paying ₹2000</p>
          </label>

          {/* 300 */}
          <label className="border p-5 rounded-xl bg-white cursor-pointer">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="amount"
                onChange={() => setAmount(3000)}
              />
              <p className="text-xl font-semibold">₹3000</p>
            </div>
            <p className="text-gray-700">Thank you for paying ₹3000</p>
          </label>

          {/* Custom */}
          <label className="border p-5 rounded-xl bg-white cursor-pointer">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="amount"
                onChange={() => setAmount(customAmount)}
              />

              {/* Rupee + Input inline */}
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold">₹</p>
                <input
                  type="number"
                  className="w-24 border-b border-black outline-none bg-transparent"
                  placeholder="Amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(e.target.value); // update main amount
                  }}
                />
              </div>
            </div>

            {/* Thank you message */}
            <p className="text-gray-700 mt-1">
              Thank you for paying ₹{customAmount || ""}
            </p>
          </label>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" className="bg-white border p-3 rounded-lg" placeholder="First name" />
          <input type="text" className=" bg-white border p-3 rounded-lg" placeholder="Last Name" />
          <input type="email" className=" bg-white border p-3 rounded-lg" placeholder="Email" />
          <input type="text" className=" bg-white border p-3 rounded-lg" placeholder="Mobile" />
        </div>

        <textarea
          className="bg-white  border p-3 w-full mb-4 rounded-lg"
          rows="2"
          placeholder="Address"
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="text" className="bg-white border p-3 rounded-lg" placeholder="City" />
          <input type="text" className="bg-white border p-3 rounded-lg" placeholder="State" />
          <input type="text" className="bg-white border p-3 rounded-lg" placeholder="Postal Code" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input type="text" className="bg-white border p-3 rounded-lg" placeholder="Country" />
          <input type="text" className="bg-white border p-3 rounded-lg" placeholder="PAN" />
        </div>

        {/* Payment Button */}
        <div className="flex justify-center">
          <button className="bg-[#1E5631] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:[#1E5631]">
            PROCEED TO PAYMENT
          </button>
        </div>

      </div>
    </div>
  );
};

export default DonateAmount;
