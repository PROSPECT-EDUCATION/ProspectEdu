import React, { useState } from "react";
import testImg from "../../assets/test1.webp";
import whyTestImg from "../../assets/WhyTest.webp";

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
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">

      {/* Header */}
      <div className="bg-[#1E5631] text-white w-full py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-6 md:px-8 gap-8">
          
          <div className="w-full md:w-1/2">
            <p className="text-sm mb-3 opacity-80">Home &gt; Test & Learning</p>

            <h1 className="text-3xl md:text-4xl font-semibold mb-4 leading-snug">
              Explore Test & Learning Resources
            </h1>

            <p className="text-[#B7F399] text-lg font-medium">
              Strengthen your academic foundation with our expert-curated learning
              and test materials designed for Engineering, Law, and Management students.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={testImg}
              alt="Test and Learning"
              className="w-[200px] md:w-[260px] rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </div>

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

        <div className="space-y-4">
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
              <p className="text-gray-600 mt-3">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

    </section>
  );
};

export default TestPage;

