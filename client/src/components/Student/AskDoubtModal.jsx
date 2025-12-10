import React, { useState } from "react";
import { X } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import doubtImg from "../../assets/doubt.webp";

export default function AskDoubtModal({ open, onClose }) {
  if (!open) return null;

  const [file, setFile] = useState(null);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Your query has been submitted successfully!", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000] flex items-center justify-center px-4">
      <div className="
        bg-white rounded-2xl shadow-2xl w-full max-w-5xl 
        overflow-hidden relative border border-[#E6F4EC]
      ">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5B7065] hover:text-[#124734] transition"
        >
          <X size={26} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT ILLUSTRATION */}
          <div className="hidden md:flex flex-col items-center justify-center bg-[#F2FAF5] p-10">
            <h2 className="text-2xl font-heading font-semibold text-[#124734] mb-6">
              Get Your Query Cleared!
            </h2>

            <img src={doubtImg} alt="ask-doubt" className="w-72 mb-8" />

            {/* Contact Info */}
            <div className="text-center">
              <p className="text-lg font-semibold text-[#124734] mb-2">Reach out to us</p>
              <p className="text-sm text-[#5B7065] mb-4">Get your question Answered</p>

              <div className="space-y-3">
                <button className="
                  flex items-center gap-2 mx-auto px-4 py-2 rounded-full 
                  bg-[#E6F4EC] text-[#124734] hover:bg-[#D4EFE0] transition
                ">
                  📞 +91 8757354880
                </button>

                <button className="
                  flex items-center gap-2 mx-auto px-4 py-2 rounded-full 
                  bg-[#E6F4EC] text-[#124734] hover:bg-[#D4EFE0] transition
                ">
                  ✉ enquiry@khanglobalstudies.com
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form onSubmit={handleSubmit} className="p-6 md:p-10">
            <h2 className="text-3xl font-heading font-semibold text-[#124734] mb-4">
              We are here to solve your Query
            </h2>

            <p className="text-sm text-[#5B7065] mb-6 leading-relaxed">
              Submit your query in the form listed below, our team will reach back to you with the solution.
            </p>

            {/* Enquiry Type */}
            <label className="text-sm font-medium text-[#124734]">
              * Enquiry Type
            </label>
            <select
              className="
                w-full border border-[#CDE8D5] rounded-lg px-3 py-2 mt-1 mb-4
                outline-none focus:border-[#009846] focus:ring-1 focus:ring-[#009846]
              "
              required
            >
              <option value="">Please Select Enquiry Type</option>
              <option value="General">General Enquiry</option>
              <option value="Batch">Batch Related</option>
              <option value="Technical">Technical Issue</option>
            </select>

            {/* Query Input */}
            <label className="text-sm font-medium text-[#124734]">
              * Query in words (up to 255 words):
            </label>
            <textarea
              className="
                w-full border border-[#CDE8D5] rounded-lg px-3 py-2 mt-1 mb-4 outline-none 
                focus:border-[#009846] focus:ring-1 focus:ring-[#009846]
              "
              rows={4}
              placeholder="Write your query here..."
              required
            ></textarea>

            {/* File Upload */}
            <p className="text-xs text-[#5B7065] mb-1">
              *Note: File must be no larger than 1 MB*
            </p>

            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mb-5"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="
                bg-[#009846] text-white px-6 py-3 rounded-lg shadow-md 
                hover:bg-[#007d39] transition
                w-full md:w-auto
              "
            >
              Submit Your Query
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

