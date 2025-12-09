import React, { useState } from "react";
import EcomHeader from "../../components/EcomHeader";
import { useAddress } from "../../context/AddressContext";
import { useCart } from "../../context/CartContext";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const { addresses, addAddress } = useAddress();
  const { cart } = useCart();
  const { state } = useLocation();

  // ⭐ If coming from BUY NOW → state.product exists
  // ⭐ If coming from Cart → state.product is null, so use cart items
  const product = state?.product || null;

  // ⭐ Final items to display (Buy Now = single product, Cart Checkout = cart items)
  const checkoutItems = product ? [product] : cart;

  const [selectedAddress, setSelectedAddress] = useState(
    addresses.length > 0 ? addresses[0].id : null
  );

  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // ⭐ Save new address
  const saveAddress = () => {
    if (
      !newAddress.name.trim() ||
      !newAddress.phone.trim() ||
      !newAddress.email.trim() ||
      !newAddress.address.trim() ||
      !newAddress.city.trim() ||
      !newAddress.state.trim() ||
      !newAddress.pincode.trim()
    ) {
      alert("Please fill all fields before saving.");
      return;
    }

    addAddress({
      name: newAddress.name,
      phone: newAddress.phone,
      email: newAddress.email,
      address: `${newAddress.address}, ${newAddress.city}`,
      state: newAddress.state,
      pincode: newAddress.pincode,
      country: newAddress.country,
    });

    setShowForm(false);

    setNewAddress({
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });
  };

  // ⭐ Summary calculations (works for BOTH Buy Now & Cart)
  const totalMRP = checkoutItems.reduce(
    (sum, p) => sum + p.oldPrice * p.quantity,
    0
  );

  const totalPrice = checkoutItems.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const discount = totalMRP - totalPrice;
  const shipping = totalPrice < 500 ? 99 : 0;
  const grandTotal = totalPrice + shipping;

  return (
    <section className="pb-20 pt-36">
      <EcomHeader />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-10 py-10">

        {/* LEFT SIDE (Address) */}
        <div className="md:col-span-2 bg-white shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#124734] mb-6">
            Shipping Address
          </h2>

          <p className="font-semibold mb-4">Select Shipping Address</p>

          {addresses.map((addr) => (
            <label key={addr.id} className="flex gap-3 mb-4 items-start cursor-pointer">
              <input
                type="radio"
                checked={selectedAddress === addr.id}
                onChange={() => setSelectedAddress(addr.id)}
                className="mt-1 accent-[#124734]"
              />
              <p>
                {addr.name}, {addr.phone} <br />
                {addr.address}, {addr.state}, {addr.country}
              </p>
            </label>
          ))}

          {/* Add Address Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-blue-600 hover:underline mt-4 cursor-pointer"
          >
            + Add New Address
          </button>

          {/* ADDRESS FORM */}
          {showForm && (
            <div className="mt-10 bg-white shadow-md p-8 rounded-xl border">
              <h2 className="text-xl font-bold text-[#124734] mb-6">
                Add New Address
              </h2>

              {/* Contact Name & Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="font-semibold">
                    Contact Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={newAddress.name}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                    className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                  />
                </div>

                <div>
                  <label className="font-semibold">
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={newAddress.phone}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, phone: e.target.value })
                    }
                    className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="font-semibold">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  value={newAddress.email}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, email: e.target.value })
                  }
                  className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                />
              </div>

              {/* Address */}
              <div className="mb-6">
                <label className="font-semibold">
                  Full Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows="3"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                ></textarea>
              </div>

              {/* City & Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="font-semibold">
                    City <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                  />
                </div>

                <div>
                  <label className="font-semibold">
                    Pincode <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={newAddress.pincode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, pincode: e.target.value })
                    }
                    className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                  />
                </div>
              </div>

              {/* State */}
              <div className="mb-6">
                <label className="font-semibold">
                  State <span className="text-red-600">*</span>
                </label>
                <input
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={saveAddress}
                className="bg-[#124734] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d3a25] cursor-pointer"
              >
                Save Address
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE (ITEMS + BILLING) */}
        <div className="bg-white shadow rounded-xl p-6">

          {/* ⭐ SHOW ONLY BUY NOW PRODUCT OR CART PRODUCTS */}
          {checkoutItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mb-5 border-b pb-3">
              <img src={item.img} className="w-16 h-20 object-contain rounded" />

              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-bold text-[#124734]">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          {/* BILLING SUMMARY */}
          <div className="mt-6 space-y-3">
            <p className="flex justify-between text-lg">
              <span>Total MRP</span>
              <span>₹{totalMRP}</span>
            </p>

            <p className="flex justify-between text-lg">
              <span>Discount on MRP</span>
              <span className="text-green-600">-₹{discount}</span>
            </p>

            <p className="flex justify-between text-lg">
              <span>Tax</span>
              <span>₹0.00</span>
            </p>

            <p className="flex justify-between text-lg">
              <span>Shipping Charges</span>
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                <span>₹{shipping}</span>
              )}
            </p>

            <hr />

            <p className="flex justify-between text-xl font-bold pt-3">
              <span>Total Amount</span>
              <span>₹{grandTotal}</span>
            </p>
          </div>

          <button className="w-full mt-6 bg-[#124734] text-white py-3 rounded-lg text-lg cursor-pointer">
            Pay Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
