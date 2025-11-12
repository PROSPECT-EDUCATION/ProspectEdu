import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("student", JSON.stringify(formData));
    navigate("/student-dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-[#124734] mb-1">Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Please enter your name"
          className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
          required
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#124734] mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Please enter your email"
            className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#124734] mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Please enter your phone number"
            className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            required
          />
        </div>
      </div>

      {/* Password + Confirm */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#124734] mb-1">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Please enter your new password"
            className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#124734] mb-1">Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Please confirm your password"
            className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            required
          />
        </div>
      </div>

      {/* State + City */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#124734] mb-1">State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Please enter state"
            className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#124734] mb-1">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Please enter city"
            className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#124734] text-white py-2 rounded-md hover:bg-[#009846] transition"
      >
        Register
      </button>

      {/* Login Redirect */}
      <p className="text-center text-sm text-[#5B7065] mt-4">
        Have an account?{" "}
        <Link to="/login" className="text-[#009846] font-medium hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
