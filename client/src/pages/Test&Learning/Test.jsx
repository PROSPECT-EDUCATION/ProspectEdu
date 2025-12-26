import React, { useState } from "react";
import testImg from "../../assets/test1.webp";
import whyTestImg from "../../assets/WhyTest.webp";
import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

import WhyTestSeries from "../../components/WhyTestSeries";
import { useNavigate } from "react-router-dom";

import { tests } from "../../data/TestData"; // ✅ NEW IMPORT

const TestPage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  const filteredTests = tests.filter((test) => {
    const matchesType = selectedType === "All" || test.type === selectedType;
    const matchesLanguage =
      selectedLanguage === "" ||
      test.language.toLowerCase().includes(selectedLanguage.toLowerCase());
    return matchesType && matchesLanguage;
  });

  return (
  
      <section className="bg-[#F9FAFB] text-[#124734]  font-[Open_Sans,sans-serif]">
      <Navbar />

      {/* ---------------- Header Section ---------------- */}

      <HeaderSection
          page="Test & Learning"
          title=" Explore Test & Learning Resources"
          subtitle="Strengthen your academic foundation with our expert-curated learning
              and test materials designed for Engineering, Law, and Management students."
          image={testImg}
        />


      {/* Filters */}
      <div className="bg-white shadow-md rounded-2xl -mt-8 mx-auto max-w-6xl flex flex-col md:flex-row flex-wrap justify-between items-center px-6 py-4 gap-4">

        <div className="flex flex-wrap gap-3">
          {["All", "Online", "Offline"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-5 py-2 rounded-full font-medium transition border ${
                selectedType === type
                  ? "bg-[#1E5631] text-white border-[#1E5631]"
                  : "border-[#1E5631] text-[#1E5631] hover:bg-[#A7E1B2] hover:text-white"
              }`}
            >
              {type === "All" ? "All" : `${type} Test Series`}
            </button>
          ))}
        </div>

        <div className="w-full md:w-auto">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border border-[#1E5631] text-[#1E5631] font-medium px-4 py-2 rounded-full bg-white cursor-pointer w-full md:w-auto"
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

      </div>

      {/* Test Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTests.length > 0 ? (
          filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={test.img}
                  alt={test.title}
                  className="w-full h-44 object-cover"
                />
                <span
                  className={`absolute top-2 right-2 text-xs font-semibold px-3 py-1 rounded-md text-white ${
                    test.type === "Online" ? "bg-[#1E5631]" : "bg-red-600"
                  }`}
                >
                  {test.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg mb-3 text-center">{test.title}</h3>

                <hr className="my-3 border-gray-200" />

                <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-700">
                  <p><strong>Total Test:</strong> {test.totalTest}</p>
                  <p><strong>Language:</strong> {test.language}</p>
                  <p><strong>Total Question:</strong> {test.totalQuestion}</p>
                  <p><strong>Total Amount:</strong> <b className="text-red-600">{test.totalAmount}</b></p>
                  <p className="col-span-2"><strong>Question Type:</strong> {test.questionType}</p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate(`/test-learning/${test.id}`)}
                    className="border border-[#1E5631] text-[#1E5631] font-medium px-6 py-2 rounded-full hover:bg-[#1E5631] hover:text-white transition"
                  >
                    View Test Series
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No tests found for the selected filters.
          </p>
        )}
      </div>

      {/* Why Test Series */}
      <WhyTestSeries image={whyTestImg} />

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1E5631] mb-10">
          FAQ's
        </h2>

        <div className="space-y-4 text-left">
          {[
            {
              question: "How many mock tests are included?",
              answer:
                "Each test series includes multiple topic-wise and full-length tests.",
            },
            {
              question: "Is the series available in Hindi or English?",
              answer:
                "Yes! Most test series are available in both Hindi and English.",
            },
            {
              question: "Can I access the series on mobile?",
              answer:
                "Yes! Access tests and reports on mobile, tablet, or laptop anytime.",
            },
          ].map((faq, i) => (
            <details key={i} className="group border border-gray-200 bg-white rounded-xl shadow-sm p-5">
              <summary className="flex justify-between items-center cursor-pointer text-[#124734] font-semibold">
                {faq.question}
                <span className="transition-transform group-open:rotate-180 text-[#1E5631]">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 font-semibold ">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
     <div className="pt-10"><Footer /></div>
    </section>
  );
};

export default TestPage;

