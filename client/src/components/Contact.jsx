import React from "react";

const ContactUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 font-[Open_Sans,sans-serif] text-[#124734]">

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
      <div className="h-[4px] w-44 bg-[#A7E1B2] mb-12"></div>

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-md overflow-hidden">

        {/* Left Box */}
        <div className="bg-[#A7E1B2] p-10 text-[#124734]">

          <h3 className="text-2xl font-bold mb-2">Let's Talk with Us</h3>
          <p className="text-gray-700 mb-8">
            Get free academic counseling & course details.
          </p>

          <h4 className="text-lg font-semibold mb-4">Contact Info :</h4>

          {/* Phone */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">📞</span>
            <p className="text-gray-800">Phone Number: 9752812898</p>
          </div>

          {/* Courses Email */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">✉️</span>
            <p className="text-gray-800">
              For Courses Related Queries: prospectbpl@gmail.com
            </p>
          </div>

          {/* Office Address */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">📍</span>
            <p className="text-gray-800">
              Address: Prospect Education & Social Welfare Society,
              R-52, First Floor, Zone-1, MP Nagar, Near Shree Vatika, Bhopal (M.P.)
            </p>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-3">
            <span className="text-xl">⏰</span>
            <p className="text-gray-800">
              Hours of Operation: Monday – Saturday: 10:00am – 7:00pm
            </p>
          </div>

        </div>

        {/* Right Form */}
        <div className="bg-[#F9FAFB] p-10">

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border rounded-lg bg-white outline-[#1E5631]"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg bg-white outline-[#1E5631]"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg bg-white outline-[#1E5631]"
            />

            {/* Select Issue */}
            <select className="w-full p-3 border rounded-lg bg-white outline-[#1E5631]">
              <option>Payment Related Issue</option>
              <option>PDF/Video related issue</option>
              <option>Books and E-commerce Store</option>
              <option>Application/Web/Account Related Issue</option>
              <option>Feedback</option>
              <option>Other Query</option>
            </select>

            <textarea
              rows="4"
              placeholder="Write Your Message"
              className="w-full p-3 border rounded-lg bg-white outline-[#1E5631]"
            ></textarea>

            <button
              type="submit"
              className="bg-[#1E5631] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#144923] transition"
            >
              Submit
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;
