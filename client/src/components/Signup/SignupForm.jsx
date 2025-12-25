import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "I'm a Learner";

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

    localStorage.setItem("user", JSON.stringify({ ...formData, role }));

    if (role === "I'm a Learner") navigate("/student-dashboard");
    else if (role === "I'm a Teacher") navigate("/teacher-dashboard");
    else if (role === "I'm a Parent/Organisation") navigate("/parent-dashboard");
    else if (role === "I'm an Admin") navigate("/admin-dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Signup form"
      autoComplete="on"
    >
      <fieldset className="space-y-4">
        <legend className="sr-only">Create your ProspectEdu account</legend>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#124734] mb-1">
            Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Please enter your name"
            required
            autoComplete="name"
            className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#124734] mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Please enter your email"
              required
              autoComplete="email"
              className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#124734] mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Please enter your phone number"
              required
              inputMode="numeric"
              autoComplete="tel"
              className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            />
          </div>
        </div>

        {/* Password + Confirm */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#124734] mb-1">
              Password *
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Please enter your new password"
              required
              autoComplete="new-password"
              className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#124734] mb-1">
              Confirm Password *
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Please confirm your password"
              required
              autoComplete="new-password"
              className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            />
          </div>
        </div>

        {/* State + City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-[#124734] mb-1">
              State *
            </label>
            <input
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Please enter state"
              required
              autoComplete="address-level1"
              className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-[#124734] mb-1">
              City *
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Please enter city"
              required
              autoComplete="address-level2"
              className="w-full border border-[#A7E1B2] rounded-md px-4 py-2 focus:outline-none focus:border-[#009846]"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#124734] text-white py-2 rounded-md hover:bg-[#009846] transition"
          aria-label="Create your ProspectEdu account"
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
      </fieldset>
    </form>
  );
}
