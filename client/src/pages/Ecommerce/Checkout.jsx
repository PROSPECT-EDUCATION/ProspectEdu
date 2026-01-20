import React, { useState, useEffect } from "react";
import EcomHeader from "../../components/EcomHeader";
import { useAddress } from "../../context/AddressContext";
import { useCart } from "../../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { api } from "../../lib/api";

// ✅ helper to load Razorpay script (Checkout.js)
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const Checkout = () => {
  const { addresses, addAddress, fetchAddresses } = useAddress();
  const { cart } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product || null;
  const checkoutItems = product ? [product] : cart;

  const [selectedAddress, setSelectedAddress] = useState(null);

  // ✅ addresses DB se load karwa do + selectedAddress auto set
  useEffect(() => {
    fetchAddresses?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      setSelectedAddress(addresses[0]._id || addresses[0].id);
    }
  }, [addresses, selectedAddress]);

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

  const saveAddress = async () => {
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

    await addAddress({
      name: newAddress.name,
      phone: newAddress.phone,
      email: newAddress.email,
      address: newAddress.address,
      city: newAddress.city,
      state: newAddress.state,
      pincode: newAddress.pincode,
      country: newAddress.country,
    });

    await fetchAddresses?.(); // ✅ ensure updated list arrives

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

  const totalMRP = checkoutItems.reduce(
    (sum, p) => sum + p.oldPrice * p.quantity,
    0
  );

  const totalPrice = checkoutItems.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const discount = totalMRP - totalPrice;
  const shipping = totalPrice < 1000 ? 99 : 0;
  const grandTotal = totalPrice + shipping;

  // ✅ PAY NOW: Razorpay flow (create-order -> open checkout -> verify -> confirm)
  const handlePayNow = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        navigate("/login", { state: { from: "ecom-header" } });
        return;
      }

      if (!checkoutItems || checkoutItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const selected = addresses.find((a) => (a._id || a.id) === selectedAddress);

      if (!selected) {
        alert("Please select an address.");
        return;
      }

      // 1) Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Razorpay SDK failed to load. Please disable adblock and try again.");
        return;
      }

      // 2) Create Razorpay order from backend
      const amountInPaise = Math.round(Number(grandTotal) * 100);

      const payload = {
        items: checkoutItems.map((p) => ({
          productId: p.id,
          quantity: Number(p.quantity || 1),
        })),
        address: {
          name: selected.name,
          phone: selected.phone,
          email: selected.email,
          address: selected.address,
          city: selected.city,
          state: selected.state,
          pincode: selected.pincode,
          country: selected.country || "India",
        },
        amountInPaise,
      };

      // ✅ backend route: /api/v1/payments/razorpay/create-order
      const createRes = await api.post("/payments/razorpay/create-order", payload);

      if (!createRes?.data?.success) {
        alert(createRes?.data?.message || "Failed to create Razorpay order");
        return;
      }

      const { keyId, razorpayOrderId, amount, currency, localOrderId } =
        createRes.data.data || {};

      if (!keyId || !razorpayOrderId || !localOrderId) {
        alert("Invalid Razorpay order response from server.");
        return;
      }

      // 3) Open Razorpay Checkout
      const options = {
        key: keyId,
        amount, // paise
        currency: currency || "INR",
        name: "Prospect Education",
        description: "Order Payment",
        order_id: razorpayOrderId,
        prefill: {
          name: selected.name,
          email: selected.email,
          contact: selected.phone,
        },
        notes: {
          localOrderId,
        },
        theme: {
          color: "#124734",
        },
        handler: async function (response) {
          try {
            // 4) Verify payment on backend
            const verifyRes = await api.post("/payments/razorpay/verify", {
              localOrderId,
              razorpay_order_id: response?.razorpay_order_id,
              razorpay_payment_id: response?.razorpay_payment_id,
              razorpay_signature: response?.razorpay_signature,
            });

            if (!verifyRes?.data?.success) {
              alert(verifyRes?.data?.message || "Payment verification failed");
              return;
            }

            // 5) Redirect to confirmation
            navigate(`/order-confirmation/${localOrderId}`, {
              state: { forcedStatus: "CONFIRMED" },
            });
          } catch (e) {
            console.error("Verify error:", e);
            alert(e?.response?.data?.message || "Payment verification failed");
          }
        },
        modal: {
          ondismiss: function () {
            // user closed popup (order remains PENDING on server)
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (resp) {
        console.error("Payment failed:", resp);
        alert(resp?.error?.description || "Payment failed");
      });

      rzp.open();
    } catch (err) {
      console.error("PayNow Razorpay error:", err);
      alert(err?.response?.data?.message || "Failed to start payment");
    }
  }; // ✅ VERY IMPORTANT semicolon

  return (
    <section className=" pt-36">
      <EcomHeader />

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-10 py-10 pb-20 text-left">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 bg-white shadow rounded-xl p-5 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#124734] mb-6">
            Shipping Address
          </h2>

          <p className="font-semibold mb-4">Select Shipping Address</p>

          {addresses.map((addr) => {
            const aid = addr._id || addr.id; // ✅ fix
            return (
              <label
                key={aid}
                className="flex gap-3 mb-4 items-start cursor-pointer"
              >
                <input
                  type="radio"
                  checked={selectedAddress === aid}
                  onChange={() => setSelectedAddress(aid)}
                  className="mt-1 accent-[#124734]"
                />
                <p className="text-sm md:text-base leading-relaxed">
                  {addr.name}, {addr.phone} <br />
                  {addr.address}, {addr.state}, {addr.country}
                </p>
              </label>
            );
          })}

          <button
            onClick={() => setShowForm(!showForm)}
            className="text-blue-600 hover:underline mt-4 cursor-pointer"
          >
            + Add New Address
          </button>

          {/* ADDRESS FORM */}
          {showForm && (
            <div className="mt-8 md:mt-10 bg-white shadow-md p-5 md:p-8 rounded-xl border">
              <h2 className="text-lg md:text-xl font-bold text-[#124734] mb-6">
                Add New Address
              </h2>

              {/* ROW 1 */}
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

              {/* ROW 2 */}
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

              {/* ADDRESS */}
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

              {/* CITY + PINCODE */}
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
                      setNewAddress({
                        ...newAddress,
                        pincode: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                  />
                </div>
              </div>

              {/* STATE */}
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

              <button
                onClick={saveAddress}
                className="bg-[#124734] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d3a25]"
              >
                Save Address
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE – SUMMARY */}
        <div className="bg-white shadow rounded-xl p-5 md:p-6">
          {checkoutItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-start gap-4 mb-5 border-b pb-3"
            >
              <img src={item.img} className="w-16 h-20 object-contain rounded" />

              <div className="flex-1">
                <p className="font-semibold text-base md:text-lg">{item.title}</p>
                <p className="text-gray-600 text-sm">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-bold text-[#124734] text-lg">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          {/* BILLING SUMMARY */}
          <div className="mt-6 space-y-3 text-sm md:text-lg">
            <p className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{totalMRP}</span>
            </p>

            <p className="flex justify-between">
              <span>Discount on MRP</span>
              <span className="text-green-600">-₹{discount}</span>
            </p>

            <p className="flex justify-between">
              <span>Tax</span>
              <span>₹0.00</span>
            </p>

            <p className="flex justify-between">
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

          <button
            onClick={handlePayNow}
            className="w-full mt-6 bg-[#124734] text-white py-3 rounded-lg text-lg"
          >
            Pay Now
          </button>
        </div>
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </section>
  );
};

export default Checkout;
