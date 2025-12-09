
import React, { useState } from "react";
import EcomHeader from "../../components/EcomHeader";
import { useAddress } from "../../context/AddressContext";
import { useOrders } from "../../context/OrderContext";

const orderOptions = [
  "All Orders",
  "ORDER RECEIVED",
  "CONFIRMED",
  "ON THE WAY",
  "CANCELED",
  "REJECTED",
];



const MyOrder = () => {
  const [activeTab, setActiveTab] = useState("orders"); // ⭐ default tab
  const { addresses, addAddress, removeAddress} = useAddress();
  
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
  pincode: ""
});





// EDIT
const startEdit = (addr) => {
  setEditingId(addr.id);
  setNewAddress(addr);
  setShowForm(true);
};

// SAVE / UPDATE
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

  if (editingId) {
    // update logic if needed
  } else {
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


// ⭐  Orders from OrderConrtext and also sorting here only  (Latest First)
const { orders } = useOrders();
const sortedOrders = [...orders].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

// ⭐ FILTER ORDERS BY STATUS
const filteredOrders =
  orderFilter === "All Orders"
    ? sortedOrders
    : sortedOrders.filter((order) => order.status.toUpperCase() === orderFilter.toUpperCase());




  return (
    <section className="pb-20 pt-36">
      <EcomHeader />

      <div className="max-w-6xl mx-auto px-6 py-10 font-[Open_Sans]">

        {/* Breadcrumb */}
        <p className="text-gray-600 mb-5">
          <span className="cursor-pointer text-[#124734] hover:underline">
            Home
          </span>{" "}
          &gt; My Orders
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LEFT SIDEBAR */}
          <div>
              <p className="text-3xl font-semibold text-[#124734] mb-3">My Orders</p>
             {/* ⭐ Heading just below Quick Access */}
            <h2 className="text-lg font-bold text-gray-600 mb-6">
              Quick Access
           </h2>

            {/* SIDEBAR BUTTONS */}
            <div className="flex flex-col gap-4">

              {/* Orders */}
              <button
                onClick={() => setActiveTab("orders")}
                className={`border px-4 py-2 rounded-lg font-semibold 
                ${activeTab === "orders" ? "bg-[#A7E1B2] text-[#124734]" : "text-gray-700 hover:text-[#124734]"}`}
              >
                My Orders
              </button>

              {/* Addresses */}
              <button
                onClick={() => setActiveTab("addresses")}
                className={`border px-4 py-2 rounded-lg font-semibold 
                ${activeTab === "addresses" ? "bg-[#A7E1B2] text-[#124734]" : "text-gray-700 hover:text-[#124734]"}`}
              >
                My Addresses
              </button>

              {/* Account */}
              <button
                onClick={() => setActiveTab("account")}
                className={`border px-4 py-2 rounded-lg font-semibold 
                ${activeTab === "account" ? "bg-[#A7E1B2] text-[#124734]" : "text-gray-700 hover:text-[#124734]"}`}
              >
                My Account
              </button>

             

            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-3 mt-6">
            

            {/* Orders Tab */}
           {activeTab === "orders" && (
  <div className="relative">

    {/* ⭐ BUTTON (ON TOP) */}
   {/* TOP RIGHT DROPDOWN */}
<div className="flex justify-end mb-8 relative">

  {/* BUTTON */}
  <button
    onClick={() => setShowFilterMenu(!showFilterMenu)}
    className="w-48 bg-[#A7E1B2] border border-[#A7E1B2] shadow-md rounded-full px-5 py-2 text-[#124734] font-semibold flex justify-between items-center hover:shadow-lg transition"
  >
    {orderFilter}
    <span className="text-sm">▾</span>
  </button>

  {/* MENU */}
  {showFilterMenu && (
    <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E0E0E0]">

      {orderOptions.map((opt) => (
        <div
          key={opt}
          onClick={() => {
            setOrderFilter(opt);
            setShowFilterMenu(false);
          }}
          className={`px-5 py-3 cursor-pointer transition 
    
            ${orderFilter === opt 
              ? "bg-[#A7E1B2] text-[#124734] font-bold" 
              : "text-[#124734] hover:bg-[#DFF5E1]"
            }
          `}
        >
          {opt}
        </div>
      ))}

    </div>
  )}
</div>


    {/* ⭐ ORDERS LIST (ATTRACTIVE CARDS) */}
<div className="space-y-6">

  {filteredOrders.map((order) => (
    <div
      key={order.id}
      className="border border-[#A7E1B2] rounded-xl p-6 shadow-sm bg-white"
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-[#124734]">
          Order ID: {order.id}
        </p>

        <span
          className="px-4 py-1 rounded-full text-sm font-semibold"
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
      <div className="flex gap-6 mt-4 items-center">
      
        <img
          src={order.productImg}
          className="w-20 h-20 object-contain bg-[#A7E1B2]/20 p-3 rounded-xl"
        />

        <div className="flex-1">
          <p className="text-xl font-semibold text-[#124734]">
            {order.productName}
          </p>

          <p className="text-gray-600 text-sm mt-1">
            Qty: {order.qty} &nbsp; • &nbsp; ₹{order.price} each
          </p>

          <p className="text-lg font-semibold text-[#124734] mt-1">
            Total: ₹{order.total}
          </p>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="flex justify-between mt-4 pt-4 border-t">
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


    {/* ⭐ EMPTY ORDERS SECTION */}
    <div className="flex flex-col items-center mt-20">
      <img
        src="https://cdn-icons-png.flaticon.com/512/17009/17009305.png"
        className="w-52 opacity-70"
      />
      <p className="text-xl text-gray-600 mt-6 font-semibold">No Orders</p>
    </div>
  </div>
)}


            {/* Addresses Tab */}
            {activeTab === "addresses" && (
  <div className="p-6 rounded-xl border shadow">
    <h3 className="text-2xl font-bold text-[#124734] mb-6">
      My Addresses
    </h3>

    {/* Loop saved addresses */}
    {addresses.map((addr) => (
      <div
        key={addr.id}
        className="border-b pb-6 mb-6 flex justify-between items-start"
      >
        <div>
          <h4 className="text-xl font-semibold">{addr.name}</h4>
          <p className="text-gray-700 mt-1">
            {addr.address}, {addr.state}, {addr.country}
          </p>

          <p className="text-gray-700 mt-1">
            Contact – {addr.phone} &nbsp;&nbsp;
            Pincode – {addr.pincode}
          </p>
        </div>

        {/* Edit + Remove */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => startEdit(addr)}
            className="text-[#124734] font-medium"
          >
            Edit
          </button>

          <span className="text-gray-400">|</span>

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

    {/* ADD NEW ADDRESS BUTTON */}
    <button
      onClick={() => setShowForm(true)}
      className="bg-[#124734] text-white px-6 py-2 rounded-lg mt-4 font-semibold"
    >
      Add New Address
    </button>

    {/* ADDRESS FORM */}
    {showForm && (
      <div className="mt-8 border p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">
          {editingId ? "Edit Address" : "Add New Address"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="border p-3 rounded-lg"
            placeholder="Full Name"
            value={newAddress.name}
            onChange={(e) =>
              setNewAddress({ ...newAddress, name: e.target.value })
            }
          />
          <input
            className="border p-3 rounded-lg"
            placeholder="Contact Number"
            value={newAddress.phone}
            onChange={(e) =>
              setNewAddress({ ...newAddress, phone: e.target.value })
            }
          />
        </div>

        <input
          className="border p-3 rounded-lg w-full mt-6"
          placeholder="Address"
          value={newAddress.address}
          onChange={(e) =>
            setNewAddress({ ...newAddress, address: e.target.value })
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <input
            className="border p-3 rounded-lg"
            placeholder="State"
            value={newAddress.state}
            onChange={(e) =>
              setNewAddress({ ...newAddress, state: e.target.value })
            }
          />
          <input
            className="border p-3 rounded-lg"
            placeholder="Pincode"
            value={newAddress.pincode}
            onChange={(e) =>
              setNewAddress({ ...newAddress, pincode: e.target.value })
            }
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveAddress}
          className="bg-[#124734] text-white px-6 py-2 rounded-lg mt-6 font-semibold"
        >
          {editingId ? "Update Address" : "Save Address"}
        </button>
      </div>
    )}
  </div>
)}

            {/* Account Tab */}
           {activeTab === "account" && (
  <div className="p-8 rounded-xl border shadow max-w-3xl">

    {/* USER HEADER */}
    <div className="flex items-center gap-4">
      <img
        src="https://cdn-icons-png.flaticon.com/512/12259/12259264.png"
        alt="User Icon"
        className="w-10 h-10"
      />

      <h2 className="text-2xl font-bold text-[#124734]">
        {fakeUser.name}
      </h2>
    </div>

    {/* CONTACT INFO */}
    <div className="mt-4 flex gap-16 text-gray-700 text-lg">

      <p>
        <span className="font-semibold">Contact - </span>
        {fakeUser.phone}
      </p>

      <p>
        <span className="font-semibold">Email ID - </span>
        {fakeUser.email}
      </p>

    </div>

  </div>
)}


          </div>

        </div>
      </div>

      {showDeletePopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-xl w-[350px] text-center">
      
      <div className="text-yellow-500 text-3xl mb-3">⚠️</div>

      <p className="text-lg font-semibold mb-6">
        Are you sure you want to delete this address?
      </p>

      <div className="flex justify-between gap-4">
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

{/* ⭐ ORDER DETAILS MODAL */}
{selectedOrder && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
    <div className="bg-white w-[480px] rounded-2xl shadow-2xl p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#124734]">
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
      <p className="text-gray-700 text-sm mb-2">
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
      <div className="flex items-center gap-5 p-4 bg-[#A7E1B2]/20 rounded-xl">

        <img
          src={selectedOrder.productImg}
          className="w-20 h-20 bg-white p-2 rounded-xl shadow"
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
    {/* PRICE SUMMARY */}
<div className="mt-6 border-t pt-4">

  {/* Shipping rule */}
  {(() => {
    const productTotal = selectedOrder.price * selectedOrder.qty;
    const shipping = productTotal < 1000 ? 99 : 0;

    return (
      <>
        <p className="flex justify-between text-gray-700 mb-2">
          <span>Item Total</span>
          <b>₹{productTotal}</b>
        </p>

        <p className="flex justify-between text-gray-700 mb-2">
          <span>Shipping</span>
          <b>₹{shipping}</b>
        </p>

        <p className="flex justify-between text-[#124734] text-lg font-bold mt-4">
          <span>Total Amount</span>
          <span>₹{productTotal + shipping}</span>
        </p>
      </>
    );
  })()}
</div>

      {/* Close Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setSelectedOrder(null)}
          className="bg-[#124734] text-white px-8 py-2 rounded-lg font-semibold shadow hover:bg-[#0f3a23] transition"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}


    </section>

    
  );
};

export default MyOrder;
