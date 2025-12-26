/* --- RESPONSIVE MyOrder.jsx (ONLY layout fixes, no logic changes) --- */

import React, { useState } from "react";
import EcomHeader from "../../components/EcomHeader";
import { useAddress } from "../../context/AddressContext";
import { useOrders } from "../../context/OrderContext";
import Footer from "../../components/Footer";

const orderOptions = [
  "All Orders",
  "ORDER RECEIVED",
  "CONFIRMED",
  "ON THE WAY",
  "CANCELED",
  "REJECTED",
];

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { addresses, addAddress, removeAddress } = useAddress();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orderFilter, setOrderFilter] = useState("All Orders");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fakeUser = {
    name: "Akshat Agrawal",
    phone: "9407307073",
    email: "akshat.shubhit15@gmail.com",
  };

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    state: "",
    country: "INDIA",
    pincode: "",
  });

  const startEdit = (addr) => {
    setEditingId(addr.id);
    setNewAddress(addr);
    setShowForm(true);
  };

  const saveAddress = () => {
    if (
      !newAddress.name.trim() ||
      !newAddress.phone.trim() ||
      !newAddress.address.trim() ||
      !newAddress.state.trim() ||
      !newAddress.pincode.trim()
    ) {
      alert("Please fill all required details.");
      return;
    }

    if (!editingId) {
      addAddress({ id: Date.now(), ...newAddress });
    }

    setShowForm(false);
    setEditingId(null);

    setNewAddress({
      name: "",
      phone: "",
      address: "",
      state: "",
      country: "INDIA",
      pincode: "",
    });
  };

  // ⭐ Orders sorted latest → oldest
  const { orders } = useOrders();
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filteredOrders =
    orderFilter === "All Orders"
      ? sortedOrders
      : sortedOrders.filter(
          (order) =>
            order.status.toUpperCase() === orderFilter.toUpperCase()
        );

  return (
    <section className=" pt-36">
      <EcomHeader />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 font-[Open_Sans] pb-20 text-left">
        {/* Breadcrumb */}
        <p className="text-gray-600 mb-5 text-sm md:text-base">
          <span className="cursor-pointer text-[#124734] hover:underline">
            Home
          </span>{" "}
          &gt; My Orders
        </p>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
          {/* LEFT SIDEBAR */}
          <div className="w-full">
            <p className="text-2xl md:text-3xl font-semibold text-[#124734] mb-3">
              My Orders
            </p>

            <h2 className="text-lg font-bold text-gray-600 mb-6">
              Quick Access
            </h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setActiveTab("orders")}
                className={`border px-4 py-2 rounded-lg font-semibold w-full
                ${activeTab === "orders"
                  ? "bg-[#A7E1B2] text-[#124734]"
                  : "text-gray-700 hover:text-[#124734]"}
              `}
              >
                My Orders
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`border px-4 py-2 rounded-lg font-semibold w-full
                ${activeTab === "addresses"
                  ? "bg-[#A7E1B2] text-[#124734]"
                  : "text-gray-700 hover:text-[#124734]"}
              `}
              >
                My Addresses
              </button>

              <button
                onClick={() => setActiveTab("account")}
                className={`border px-4 py-2 rounded-lg font-semibold w-full
                ${activeTab === "account"
                  ? "bg-[#A7E1B2] text-[#124734]"
                  : "text-gray-700 hover:text-[#124734]"}
              `}
              >
                My Account
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-3 mt-4 md:mt-6">
            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="relative">
                {/* FILTER BUTTON */}
                <div className="flex justify-end mb-6 relative">
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="w-40 md:w-48 bg-[#A7E1B2] border shadow-md rounded-full px-4 py-2 text-[#124734] font-semibold flex justify-between items-center hover:shadow-lg transition"
                  >
                    {orderFilter}
                    <span>▾</span>
                  </button>

                  {showFilterMenu && (
                    <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-2xl overflow-hidden border">
                      {orderOptions.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setOrderFilter(opt);
                            setShowFilterMenu(false);
                          }}
                          className={`px-5 py-3 cursor-pointer transition text-sm
                          ${
                            orderFilter === opt
                              ? "bg-[#A7E1B2] text-[#124734] font-bold"
                              : "hover:bg-[#DFF5E1]"
                          }
                        `}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ORDERS LIST */}
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#A7E1B2] rounded-xl p-4 md:p-6 shadow-sm bg-white"
                    >
                      {/* Top Row */}
                      <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0">
                        <p className="text-lg font-semibold text-[#124734]">
                          Order ID: {order.id}
                        </p>

                        <span
                          className="px-4 py-1 rounded-full text-sm font-semibold self-start md:self-center"
                          style={{
                            backgroundColor:
                              order.status === "ORDER RECEIVED"
                                ? "#C2F8C5"
                                : order.status === "ON THE WAY"
                                ? "#C2E0FF"
                                : order.status === "REJECTED"
                                ? "#F8C2C2"
                                : order.status === "CONFIRMED"
                                ? "#FFE9B1"
                                : "#E5E5E5",
                            color: "#124734",
                          }}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Product Row */}
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4">
                        <img
                          src={order.productImg}
                          className="w-20 h-20 object-contain bg-[#A7E1B2]/20 p-3 rounded-xl"
                        />

                        <div className="flex-1">
                          <p className="text-xl font-semibold text-[#124734]">
                            {order.productName}
                          </p>

                          <p className="text-gray-600 text-sm mt-1">
                            Qty: {order.qty} • ₹{order.price} each
                          </p>

                          <p className="text-lg font-semibold text-[#124734] mt-1">
                            Total: ₹{order.total}
                          </p>
                        </div>
                      </div>

                      {/* Bottom */}
                      <div className="flex flex-col md:flex-row justify-between mt-4 pt-4 border-t gap-3 md:gap-0">
                        <p className="text-gray-600 text-sm">
                          Ordered on: <b>{order.date}</b>
                        </p>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-[#124734] font-semibold hover:underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* EMPTY ORDERS NOTE */}
               {filteredOrders.length === 0 && (
  <div className="flex flex-col items-center mt-16">
    <img
      src="https://cdn-icons-png.flaticon.com/512/17009/17009305.png"
      className="w-32 md:w-52 opacity-70"
    />
    <p className="text-lg md:text-xl text-gray-600 mt-4 font-semibold">
      No Orders
    </p>
  </div>
)}

              </div>
            )}

            {/* ADDRESS TAB */}
            {activeTab === "addresses" && (
              <div className="p-4 md:p-6 rounded-xl border shadow">
                <h3 className="text-xl md:text-2xl font-bold text-[#124734] mb-6">
                  My Addresses
                </h3>

                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border-b pb-5 mb-5 flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold">
                        {addr.name}
                      </h4>
                      <p className="text-gray-700 mt-1 text-sm md:text-base">
                        {addr.address}, {addr.state}, {addr.country}
                      </p>
                      <p className="text-gray-700 mt-1 text-sm md:text-base">
                        Contact – {addr.phone} • Pincode – {addr.pincode}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => startEdit(addr)}
                        className="text-[#124734] font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setDeleteId(addr.id);
                          setShowDeletePopup(true);
                        }}
                        className="text-red-500 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[#124734] text-white px-6 py-2 rounded-lg mt-4"
                >
                  Add New Address
                </button>

                {showForm && (
                  <div className="mt-8 border p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">
                      {editingId ? "Edit Address" : "Add New Address"}
                    </h3>

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        placeholder="Full Name"
                        className="border p-3 rounded-lg"
                        value={newAddress.name}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            name: e.target.value,
                          })
                        }
                      />
                      <input
                        placeholder="Contact Number"
                        className="border p-3 rounded-lg"
                        value={newAddress.phone}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Address */}
                    <input
                      placeholder="Address"
                      className="border p-3 rounded-lg w-full mt-6"
                      value={newAddress.address}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          address: e.target.value,
                        })
                      }
                    />

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <input
                        placeholder="State"
                        className="border p-3 rounded-lg"
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            state: e.target.value,
                          })
                        }
                      />
                      <input
                        placeholder="Pincode"
                        className="border p-3 rounded-lg"
                        value={newAddress.pincode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            pincode: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      onClick={saveAddress}
                      className="bg-[#124734] text-white px-6 py-2 rounded-lg mt-6"
                    >
                      {editingId ? "Update Address" : "Save Address"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ACCOUNT TAB */}
            {activeTab === "account" && (
              <div className="p-6 md:p-8 rounded-xl border shadow max-w-3xl">
                <div className="flex items-center gap-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/12259/12259264.png"
                    className="w-10 h-10"
                  />
                  <h2 className="text-xl md:text-2xl font-bold text-[#124734]">
                    {fakeUser.name}
                  </h2>
                </div>

                <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-16 text-gray-700 text-lg">
                  <p>
                    <b>Contact - </b> {fakeUser.phone}
                  </p>
                  <p>
                    <b>Email ID - </b> {fakeUser.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DELETE POPUP */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xs text-center">
            <div className="text-yellow-500 text-3xl mb-3">⚠️</div>

            <p className="text-lg font-semibold mb-6">
              Are you sure you want to delete this address?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="w-full border px-4 py-2 rounded-lg bg-[#A7E1B2]"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  removeAddress(deleteId);
                  setShowDeletePopup(false);
                }}
                className="w-full bg-[#124734] text-white px-4 py-2 rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#124734]">
                Order Details
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-600 text-xl hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Order ID + Date */}
            <p className="text-gray-700 text-sm mb-1">
              <b>Order ID:</b> {selectedOrder.id}
            </p>

            <p className="text-gray-700 text-sm mb-4">
              <b>Date:</b> {selectedOrder.date}
            </p>

            {/* Status */}
            <div className="mb-6">
              <span
                className="px-4 py-1 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor:
                    selectedOrder.status === "ORDER RECEIVED"
                      ? "#C2F8C5"
                      : selectedOrder.status === "ON THE WAY"
                      ? "#C2E0FF"
                      : selectedOrder.status === "REJECTED"
                      ? "#F8C2C2"
                      : selectedOrder.status === "CONFIRMED"
                      ? "#FFE9B1"
                      : "#E5E5E5",
                  color: "#124734",
                }}
              >
                {selectedOrder.status}
              </span>
            </div>

            {/* Product Card */}
            <div className="flex gap-4 p-4 bg-[#A7E1B2]/20 rounded-xl">
              <img
                src={selectedOrder.productImg}
                className="w-20 h-20 bg-white p-2 rounded-xl"
              />

              <div className="flex-1">
                <p className="text-lg font-semibold text-[#124734]">
                  {selectedOrder.productName}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  Qty: {selectedOrder.qty}
                </p>

                <p className="text-[#124734] font-semibold text-md mt-1">
                  Price: ₹{selectedOrder.price}
                </p>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mt-6 border-t pt-4">
              {(() => {
                const total = selectedOrder.price * selectedOrder.qty;
                const shipping = total < 1000 ? 99 : 0;

                return (
                  <>
                    <p className="flex justify-between text-gray-700 mb-2 text-sm">
                      <span>Item Total</span>
                      <b>₹{total}</b>
                    </p>

                    <p className="flex justify-between text-gray-700 mb-2 text-sm">
                      <span>Shipping</span>
                      <b>₹{shipping}</b>
                    </p>

                    <p className="flex justify-between text-[#124734] text-lg font-bold mt-4">
                      <span>Total Amount</span>
                      <span>₹{total + shipping}</span>
                    </p>
                  </>
                );
              })()}
            </div>

            {/* Close */}
            <div className="text-center mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-[#124734] text-white px-8 py-2 rounded-lg shadow hover:bg-[#0f3a23]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="pt-10"> <Footer /></div>
    </section>
  );
};

export default MyOrder;
