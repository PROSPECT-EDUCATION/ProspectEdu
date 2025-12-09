import React, { useState, useRef } from "react";
import questionIllustration from "../../assets/question.webp";


const AskDoubtSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doubtType: "Batch Related",
    doubt: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null); // to reset file input manually

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10); // only digits, max 10
      setFormData({ ...formData, [name]: numericValue });
    } else if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.email) newErrors.email = "Email Address is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    else if (formData.phone.length !== 10)
      newErrors.phone = "Phone Number must be 10 digits";
    if (!formData.doubt) newErrors.doubt = "Please enter your doubt";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Your doubt has been submitted!");

      // Reset all fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        doubtType: "Batch Related",
        doubt: "",
        image: null,
      });

      // Clear file input manually
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">
      {/* Green Header */}
      <div className="bg-[#1E5631] text-white w-full py-16">
        <div className="max-w-7xl mx-auto flex justify-between items-start px-8">
          <div className="w-1/2 pr-8">
            <p className="text-sm mb-3 text-gray-200">Home &gt; Ask Question</p>
            <h1 className="font-semibold text-4xl mb-3 leading-snug">
              Go from questioning to understanding!
            </h1>
            <p className="text-[#B7F399] text-lg font-medium">
              Discover the benefits of Ask a Doubt!
            </p>
          </div>
          <div className="w-1/2 flex justify-end">
            <img
              src={questionIllustration}
              alt="Ask a Doubt Illustration"
              className="w-[250px] rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Page Heading */}
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl font-bold text-[#102A23]">
          Ask a question. Get a verified answer.
        </h2>
      </div>

      {/* Doubt Form */}
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-13">
        <h3 className="text-xl font-semibold mb-3 text-[#1E5631]">
          We are here to solve your Doubts
        </h3>
        <p className="text-gray-700 mb-2">
          Submit your doubt in the form below. Our team will reach back to you
          with the solution.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          *Note: Submit your doubt using your registered mobile number.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (10 digits)"
              maxLength="10"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Doubt Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Doubt Type</label>
            <select
              name="doubtType"
              value={formData.doubtType}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option>Batch Related</option>
              <option>Test Series Related</option>
              <option>E-commerce Related</option>
              <option>Payment Related Issue</option>
              <option>App/Website Related Issues</option>
              <option>Others</option>
            </select>
          </div>

          {/* Doubt */}
          <div>
            <label className="block text-sm font-medium mb-1">Your Doubt</label>
            <textarea
              name="doubt"
              value={formData.doubt}
              onChange={handleChange}
              placeholder="Write your doubt here..."
              className="w-full border rounded-md p-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            {errors.doubt && (
              <p className="text-red-500 text-sm">{errors.doubt}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image (optional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border rounded-md p-2 file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 
                         file:bg-[#2E7D32] file:text-white file:cursor-pointer hover:file:bg-[#256728] 
                         focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#1E5631] text-white px-6 py-2 rounded-md hover:bg-green-800 transition w-full sm:w-auto"
          >
            Submit Doubt
          </button>
        </form>
      </div>
       {/* Heading-"Discover the benifit of asking doubt " */}
      <div className="text-center mt-16">
  <h2 className="text-3xl font-bold text-black">
    Discover the benefits of 'Ask a Doubt'
  </h2>
  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
  {/* Card 1 */}
  <div className="bg-[#EAF2FF] rounded-2xl p-6 text-center shadow-md">
    <img
      src="https://cdn-icons-png.flaticon.com/512/998/998357.png"
      alt="Expert"
      className="w-16 mx-auto mb-4"
    />
    <h3 className="font-semibold text-lg mb-2 text-black">Crafted by Expert</h3>
    <p className="text-gray-700 text-sm">
      Created by a highly skilled and knowledgeable professional.
    </p>
  </div>

  {/* Card 2 */}
  <div className="bg-[#E7F7E8] rounded-2xl p-6 text-center shadow-md">
    <img
      src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png"
      alt="Knowledge"
      className="w-16 mx-auto mb-4"
    />
    <h3 className="font-semibold text-lg mb-2 text-black">Vast Knowledge</h3>
    <p className="text-gray-700 text-sm">
      In-depth understanding and information across various subjects.
    </p>
  </div>

  {/* Card 3 */}
  <div className="bg-[#ECEBFF] rounded-2xl p-6 text-center shadow-md">
    <img
      src="https://cdn-icons-png.flaticon.com/512/2896/2896418.png"
      alt="Problem Solving"
      className="w-16 mx-auto mb-4"
    />
    <h3 className="font-semibold text-lg mb-2 text-black">Problem Solving</h3>
    <p className="text-gray-700 text-sm">
      Identifying issues, analyzing possible solutions, and implementing
      effective strategies to resolve them.
    </p>
  </div>

  {/* Card 4 */}
  <div className="bg-[#FAE9F7] rounded-2xl p-6 text-center shadow-md">
    <img
      src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
      alt="Verified Answer"
      className="w-16 mx-auto mb-4"
    />
    <h3 className="font-semibold text-lg mb-2 text-black">Verified Answer</h3>
    <p className="text-gray-700 text-sm">
      Provided responses are thoroughly checked and confirmed to be accurate and
      reliable.
    </p>
  </div>
</div>

</div>

    </section>
  );
};

export default AskDoubtSection;
