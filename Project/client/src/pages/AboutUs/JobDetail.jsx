import React, { useState } from "react";
import { useParams } from "react-router-dom";
import hiringImg from "../../assets/hiring2.jpeg";

import ContactUs from "../../components/Contact";

const JobDetail = () => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // ---------------- Job Data ----------------
  const jobData = {
    "1": {
      title: "Subject Matter Expert (Engineering)",
      vacancy: "3",
      location: "Bhopal",
      type: "Full-Time",
      responsibilities: [
        "Create high-quality engineering content.",
        "Review syllabus-based test papers.",
        "Work with expert team to improve content quality.",
        "Deliver accurate and exam-oriented solutions.",
        "Ensure clarity, correctness, and conceptual depth.",
      ],
      requirements: [
        "Strong engineering subject knowledge.",
        "Good writing and explanation skills.",
        "Experience in teaching or content creation (preferred).",
        "Ability to meet deadlines.",
        "B.Tech/B.E (preferred)."
      ]
    },

    "2": {
      title: "Content Writer (Law Entrance)",
      vacancy: "2",
      location: "Bhopal",
      type: "Full-Time",
      responsibilities: [
        "Create law-specific study content for CLAT/AILLET/SLAT.",
        "Prepare mock tests and topic explanations.",
        "Review legal current affairs and case laws.",
        "Ensure accuracy and depth of legal topics.",
        "Work with law SMEs to improve quality."
      ],
      requirements: [
        "Strong legal knowledge.",
        "Good English writing skills.",
        "LLB or Law background (preferred).",
        "Understanding of CLAT exam pattern.",
      ]
    },

    "3": {
      title: "Mock Test Creator (Engineering & Law)",
      vacancy: "4",
      location: "Remote",
      type: "Part-Time",
      responsibilities: [
        "Create exam-level mock tests.",
        "Prepare topic-wise and full-length tests.",
        "Ensure difficulty level matches real exams.",
        "Cross-check answers and explanations.",
      ],
      requirements: [
        "Strong subject knowledge.",
        "Ability to create exam-friendly questions.",
        "Experience in teaching or content is a plus.",
        "Good analytical and reasoning skills."
      ]
    },

    "4": {
      title: "Batch Manager (Engineering / Law)",
      vacancy: "1",
      location: "Bhopal",
      type: "Full-Time",
      responsibilities: [
        "Handle student batches and support learning.",
        "Take feedback and help improve content quality.",
        "Communicate with teachers and students.",
        "Manage day-to-day batch operations.",
      ],
      requirements: [
        "Good communication skills.",
        "Basic technical knowledge.",
        "Ability to handle students.",
        "Graduation required."
      ]
    }
  };

  const job = jobData[id];
  if (!job) return <h2 className="text-center mt-10 text-red-600">Job not found</h2>;

  // ---------------- Copy to Clipboard ----------------
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">

      {/* ------------ Header ------------ */}
      <div className="bg-[#1E5631] text-white w-full py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8">
          <div className="w-full md:w-1/2 pr-8">
            <p className="text-sm mb-2 text-gray-200">Home &gt; Career</p>
            <h1 className="font-semibold text-4xl mb-2 leading-snug">
              Join the Future of Education
            </h1>
            <p className="text-[#B7F399] text-lg font-medium">
              Unlock your potential and make a difference in the lives of millions of learners worldwide.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-end mt-6 md:mt-0">
            <img src={hiringImg} className="max-w-[13rem] md:w-[250px] rounded-lg shadow-md" />
          </div>
        </div>
      </div>

      {/* ------------ Job Details Section ------------ */}
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-10">

        {/* Left - Main Details */}
        <div className="w-full lg:w-3/4">
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>

          <p className="text-lg mb-6">
            <strong>Vacancy:</strong> {job.vacancy} &nbsp;/&nbsp; 
            <strong>Location:</strong> {job.location} &nbsp;/&nbsp;
            <strong>Job Type:</strong> {job.type}
          </p>

          {/* Responsibilities */}
          <h3 className="text-xl font-semibold mt-8 mb-3">1. Responsibilities:</h3>
          <ul className="list-disc pl-6 space-y-1">
            {job.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* Requirements */}
          <h3 className="text-xl font-semibold mt-8 mb-3">2. Requirements:</h3>
          <ul className="list-disc pl-6 space-y-1">
            {job.requirements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* Apply Button */}
          <button
            onClick={() => setShowForm(true)}
            className="mt-10 bg-[#1E5631] text-white px-5 py-2 rounded-lg"
          >
            Apply Now
          </button>
        </div>

        {/* Right - Share Section */}
        <div className="w-full lg:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Share this opening with friends</h3>
          <button
            onClick={copyLink}
            className="px-4 py-2 bg-[#1E5631] text-white rounded-md"
          >
            Copy Link
          </button>

          {showCopied && (
            <p className="mt-2 text-sm bg-[#A7E1B2] text-white px-3 py-1 rounded">
              URL copied to clipboard!
            </p>
          )}
        </div>
      </div>

     {/* ------------ Apply Form Popup ------------ */}
{showForm && (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center p-4 z-50">

    {/* Popup Box */}
    <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative max-h-[80vh] overflow-y-auto">
      
      {/* Close button */}
      <button
        className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700"
        onClick={() => setShowForm(false)}
      >
        ×
      </button>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#124734]">
        Join Our Journey
      </h2>
      <p className="text-gray-600 mb-4 text-sm">
        Your email and phone number will not be shared.
      </p>

      {/* Form */}
      <form className="space-y-4 text-[#124734] font-[Open_Sans,sans-serif]">

        <div>
          <label className="block mb-1">Name</label>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block mb-1">Email Address</label>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block mb-1">Highest Education</label>
          <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]">
            <option>-- Select option --</option>
            <option>12th Pass</option>
            <option>Graduate</option>
            <option>Post Graduate</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Can you relocate to Job location?</label>
          <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]">
            <option>-- Select option --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Fluent In</label>
          <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]">
            <option>-- Select option --</option>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

       <div>
  <label className="block mb-1">Upload Resume (PDF)</label>
  
  <input
    type="file"
    className="
      w-full 
      border 
      rounded-lg 
      file:bg-[#A7E1B2] 
      file:text-[#124734] 
      file:border-none 
      file:px-4 
      file:py-2 
      file:rounded-lg 
      file:cursor-pointer
    "
  />
</div>


        <button className="bg-[#1E5631] w-full text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#154727] transition">
          Submit Application
        </button>
      </form>

    </div>
  </div>
)}
  {/* ------------ Contact Us Section ------------ */}
      <ContactUs />


    </section>
  );
};

export default JobDetail;
