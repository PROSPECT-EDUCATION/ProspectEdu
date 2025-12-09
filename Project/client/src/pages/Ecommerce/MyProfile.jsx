import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import EcomHeader from "../../components/EcomHeader";
import locationIcon from "../../assets/location.png";

const MyProfile = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Akshat Agrawal",
      phone: "9407307073",
      email: "akshat.shubhit15@gmail.com",
      address: "Bhopal Bypass Road, bmhcrc, Bhopal",
      state: "Madhya Pradesh",
      pincode: "462038",
      country: "India",
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "Akshat Agrawal",
    phone: "9407307073",
    email: "akshat.shubhit15@gmail.com",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "India",
  });

  const saveAddress = () => {
    if (editingId) {
      setAddresses(
        addresses.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: newAddress.name,
                phone: newAddress.phone,
                email: newAddress.email,
                address: `${newAddress.address}, ${newAddress.city}`,
                state: newAddress.state,
                pincode: newAddress.pincode,
                country: newAddress.country,
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      const data = {
        id: Date.now(),
        name: newAddress.name,
        phone: newAddress.phone,
        email: newAddress.email,
        address: `${newAddress.address}, ${newAddress.city}`,
        state: newAddress.state,
        pincode: newAddress.pincode,
        country: newAddress.country,
      };
      setAddresses([...addresses, data]);
    }

    setShowForm(false);

    setNewAddress({
      name: "Akshat Agrawal",
      phone: "9407307073",
      email: "akshat.shubhit15@gmail.com",
      address: "",
      city: "",
      pincode: "",
      state: "",
      country: "India",
    });
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((item) => item.id !== id));
  };

  return (
    <section className="pb-20 pt-36">
      <EcomHeader />

      <div className="max-w-6xl mx-auto px-6 py-10 font-[Open_Sans]">
        {/* Breadcrumb */}
        <p className="text-gray-600 mb-5">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; Profile
        </p>

        {/* Main Box */}
        <div className="bg-white shadow-md rounded-xl p-10 border border-gray-200">
          <h1 className="text-3xl font-bold text-[#124734] mb-6">
            Welcome Akshat Agrawal
          </h1>

          {/* Phone & Email */}
          <div className="flex flex-col md:flex-row text-lg mb-8">
            <p>
              <span className="font-semibold">Phone:</span> +91 9407307073
            </p>

            <p className="mt-2 md:mt-0 px-20">
              <span className="font-semibold">Email:</span>{" "}
              akshat.shubhit15@gmail.com
            </p>
          </div>

          {/* Saved Address List */}
          <p className="text-gray-700 font-semibold mb-3">Saved Address :</p>

          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-[#A7E1B2] p-6 rounded-xl flex justify-between items-start border border-[#A7E1B2] mb-5"
            >
              <div className="flex gap-3">
                <img src={locationIcon} className="w-10 h-10" />

                <div>
                  <h3 className="text-lg font-semibold text-[#124734]">
                    {addr.name}
                  </h3>

                  <p className="text-gray-700 text-sm mt-1">
                    {addr.phone}, {addr.email}
                    <br />
                    {addr.address}, {addr.state}, {addr.country}
                  </p>

                  <p className="text-gray-800 font-medium mt-2">
                    Pincode : {addr.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* EDIT */}
                <button
                  onClick={() => {
                    setEditingId(addr.id);
                    setShowForm(true);
                    setNewAddress({
                      name: addr.name,
                      phone: addr.phone,
                      email: addr.email,
                      address: addr.address.split(",")[0],
                      city: addr.address.split(",")[1]?.trim() || "",
                      pincode: addr.pincode,
                      state: addr.state,
                      country: addr.country,
                    });
                  }}
                  className="text-[#124734] hover:text-black"
                >
                  <FiEdit2 size={20} />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Address Button */}
          <div className="mt-8">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
              }}
              className="bg-[#124734] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0f3a23]"
            >
              {showForm ? "Close Address Form" : "Add New Address"}
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="mt-10 bg-white shadow-md p-8 rounded-xl border">
              <h2 className="text-xl font-bold text-[#124734] mb-6">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>

              {/* Contact Name & Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="font-semibold">* Contact Name</label>
                  <input
                    value={newAddress.name}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                    className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                  />
                </div>

                <div>
                  <label className="font-semibold">* Contact Number</label>
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
                <label className="font-semibold">* Email</label>
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
                <label className="font-semibold">* Address</label>
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
                  <label className="font-semibold">* City</label>
                  <input
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                  />
                </div>

                <div>
                  <label className="font-semibold">* Pincode</label>
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
                <label className="font-semibold">* State</label>
                <input
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                />
              </div>

              {/* Country */}
              <div className="mb-6">
                <label className="font-semibold">Country</label>
                <input
                  value="India"
                  readOnly
                  className="w-full border rounded-lg p-3 mt-2 outline-[#124734]"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={saveAddress}
                className="bg-[#124734] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d3a25]"
              >
                {editingId ? "Update Address" : "Save Address"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
