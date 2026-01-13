import React, { useState } from "react";
import logoImg from "../../assets/logo.webp";
import { api } from "../../lib/api";

const DonateAmount = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    pan: "",
  });

  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  const isValidMobile = (v) => /^[0-9]{10}$/.test(String(v || "").trim());

  const handleProceed = async () => {
    const finalAmount = Number(amount);

    // required validations
    if (!finalAmount || finalAmount <= 0) return alert("Please select a donation amount.");
    if (!form.firstName.trim()) return alert("First name is required.");
    if (!form.lastName.trim()) return alert("Last name is required.");
    if (!isValidEmail(form.email)) return alert("Valid email is required.");
    if (!isValidMobile(form.mobile)) return alert("Valid 10 digit mobile number is required.");
    if (!form.address.trim()) return alert("Address is required.");
    if (!form.city.trim()) return alert("City is required.");
    if (!form.state.trim()) return alert("State is required.");
    if (!form.postalCode.trim()) return alert("Postal code is required.");
    if (!form.country.trim()) return alert("Country is required.");
    // PAN optional; keep it optional (you can enforce if you want)

    setSaving(true);
    try {
      await api.post("/donations", {
        amount: finalAmount,
        currency: "INR",
        ...form,
      });

      alert("✅ Thank you! Your donation details have been submitted successfully.");

      // reset
      setAmount("");
      setCustomAmount("");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        pan: "",
      });
    } catch (e) {
      alert(e?.response?.data?.message || "Donation submission failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-10 flex flex-col items-center font-[Open_Sans,sans-serif]">
      {/* Logo */}
      <img src={logoImg} alt="Prospect Logo" className="w-52 mb-6" />

      {/* Main Card */}
      <div className="bg-[#A7E1B2] max-w-4xl w-full rounded-xl shadow-md p-8">
        {/* Amount Options */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          {/* 1000 */}
          <label className="border p-5 rounded-xl bg-white cursor-pointer">
            <div className="flex items-center gap-2">
              <input type="radio" name="amount" checked={Number(amount) === 1000} onChange={() => setAmount(1000)} />
              <p className="text-xl font-semibold">₹1000</p>
            </div>
            <p className="text-gray-700">Thank you for paying ₹1000</p>
          </label>

          {/* 2000 */}
          <label className="border p-5 rounded-xl bg-white cursor-pointer">
            <div className="flex items-center gap-2">
              <input type="radio" name="amount" checked={Number(amount) === 2000} onChange={() => setAmount(2000)} />
              <p className="text-xl font-semibold">₹2000</p>
            </div>
            <p className="text-gray-700">Thank you for paying ₹2000</p>
          </label>

          {/* 3000 */}
          <label className="border p-5 rounded-xl bg-white cursor-pointer">
            <div className="flex items-center gap-2">
              <input type="radio" name="amount" checked={Number(amount) === 3000} onChange={() => setAmount(3000)} />
              <p className="text-xl font-semibold">₹3000</p>
            </div>
            <p className="text-gray-700">Thank you for paying ₹3000</p>
          </label>

          {/* Custom */}
          <label className="border p-5 rounded-xl bg-white cursor-pointer">
            <div className="flex items-center gap-2">
              <input type="radio" name="amount" checked={!!customAmount && Number(amount) === Number(customAmount)} onChange={() => setAmount(customAmount)} />

              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold">₹</p>
                <input
                  type="number"
                  className="w-24 border-b border-black outline-none bg-transparent"
                  placeholder="Amount"
                  value={customAmount}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCustomAmount(v);
                    setAmount(v); // update main amount
                  }}
                />
              </div>
            </div>

            <p className="text-gray-700 mt-1">Thank you for paying ₹{customAmount || ""}</p>
          </label>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input name="firstName" value={form.firstName} onChange={onChange} type="text" className="bg-white border p-3 rounded-lg" placeholder="First name" />
          <input name="lastName" value={form.lastName} onChange={onChange} type="text" className=" bg-white border p-3 rounded-lg" placeholder="Last Name" />
          <input name="email" value={form.email} onChange={onChange} type="email" className=" bg-white border p-3 rounded-lg" placeholder="Email" />
          <input name="mobile" value={form.mobile} onChange={onChange} type="text" inputMode="numeric" maxLength={10} className=" bg-white border p-3 rounded-lg" placeholder="Mobile" />
        </div>

        <textarea name="address" value={form.address} onChange={onChange} className="bg-white  border p-3 w-full mb-4 rounded-lg" rows="2" placeholder="Address" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input name="city" value={form.city} onChange={onChange} type="text" className="bg-white border p-3 rounded-lg" placeholder="City" />
          <input name="state" value={form.state} onChange={onChange} type="text" className="bg-white border p-3 rounded-lg" placeholder="State" />
          <input name="postalCode" value={form.postalCode} onChange={onChange} type="text" className="bg-white border p-3 rounded-lg" placeholder="Postal Code" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input name="country" value={form.country} onChange={onChange} type="text" className="bg-white border p-3 rounded-lg" placeholder="Country" />
          <input name="pan" value={form.pan} onChange={onChange} type="text" className="bg-white border p-3 rounded-lg" placeholder="PAN" />
        </div>

        {/* Payment Button */}
        <div className="flex justify-center">
          <button
            type="button"
            disabled={saving}
            onClick={handleProceed}
            className="bg-[#1E5631] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:[#1E5631] disabled:opacity-60"
          >
            {saving ? "PLEASE WAIT..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateAmount;
