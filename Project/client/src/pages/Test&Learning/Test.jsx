import React, { useState } from "react";
import testImg from "../../assets/test1.jpg";//same image for all test cards
import whyTestImg from "../../assets/WhyTest.png";
 
import WhyTestSeries from "../../components/WhyTestSeries";
import { useNavigate } from "react-router-dom";


const TestPage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();


  const tests = [
    {
      id: 1,
      title: "DSA Mastery Test Series",
      type: "Online",
      totalTest: 1,
      totalQuestion: 100,
      language: "English/Hindi",
      totalAmount: "Free",
      questionType: "NA",
    },
    {
      id: 2,
      title: "Civil Engineering Test Series",
      type: "Online",
      totalTest: 21,
      totalQuestion: 800,
      language: "Hindi",
      totalAmount: "₹149/-",
      questionType: "SCQ",
    },
    {
      id: 3,
      title: "Law Test Series",
      type: "Online",
      totalTest: 26,
      totalQuestion: 300,
      language: "English/Hindi",
      totalAmount: "₹299/-",
      questionType: "SCQ",
    },
    {
      id: 4,
      title: "Management Test Series",
      type: "Offline",
      totalTest: 25,
      totalQuestion: "NA",
      language: "English",
      totalAmount: "₹2999/-",
      questionType: "NA",
    },
  ];

  const filteredTests = tests.filter((test) => {
    const matchesType = selectedType === "All" || test.type === selectedType;
    const matchesLanguage =
      selectedLanguage === "" ||
      test.language.toLowerCase().includes(selectedLanguage.toLowerCase());
    return matchesType && matchesLanguage;
  });

  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">
      {/* Green Header */}
      <div className="bg-[#1E5631] text-white w-full py-10">
        <div className="max-w-7xl mx-auto flex justify-between items-start px-8">
          
          <div className="w-full md:w-1/2 pr-8">
            <p className="text-sm mb-3 opacity-80">Home &gt; Test & Learning</p>
            <h1 className="text-4xl font-semibold mb-4">
              Explore Test & Learning Resources
            </h1>
            <p className="text-[#B7F399] text-lg font-medium">
              Strengthen your academic foundation with our expert-curated learning
              and test materials designed for Engineering, Law, and Management
              students.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-end">
            <img
              src={testImg}
              alt="Test and Learning"
              className="max-w-[16rem] rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-2xl -mt-8 mx-auto max-w-6xl flex flex-wrap justify-between items-center px-6 py-4">
        <div className="flex space-x-3 mb-3 sm:mb-0">
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

        <div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border border-[#1E5631] text-[#1E5631] font-medium px-4 py-2 rounded-full bg-transparent hover:bg-[#EAF4EC] cursor-pointer"
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>

      {/* Test Series Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTests.length > 0 ? (
          filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col justify-between overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={testImg}
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
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-center">
                    {test.title}
                  </h3>

                  <hr className="my-3 border-gray-200" />

                  <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-700">
                    <p>
                      <strong>Total Test:</strong> {test.totalTest}
                    </p>
                    <p>
                      <strong>Language:</strong> {test.language}
                    </p>
                    <p>
                      <strong>Total Question:</strong> {test.totalQuestion}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> <b className="text-red-600">{test.totalAmount}</b>
                    </p>
                    <p className="col-span-2">
                      <strong>Question Type:</strong> {test.questionType}
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                   onClick={() => navigate(`/test-learning/${test.id}`)}
                      className="border border-[#1E5631] text-[#1E5631] font-medium px-6 py-2 rounded-full hover:bg-[#1E5631] hover:text-white transition">
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
      {/* Why Test Series Section */}
      <WhyTestSeries image={whyTestImg} />
      
      {/* FAQ Section */}
<div className="max-w-5xl mx-auto px-6 py-16">
  <h2 className="text-3xl font-bold text-center text-[#1E5631] mb-10">
    FAQ's
  </h2>

  <div className="space-y-4">
    {[
      {
        question: "How many mock tests are included in this test series?",
        answer:
          "The number of mock tests depends on the selected course. Each test series includes multiple topic-wise and full-length tests for better preparation.",
      },
      {
        question: "Is this test series available in Hindi or English?",
        answer:
          "Yes! Most of our test series are available in both Hindi and English. You can select your preferred language before starting the test.",
      },
      {
        question: "Can I access the test series on mobile?",
        answer:
          "Absolutely! You can access all tests and performance analysis from your mobile, tablet, or laptop anytime.",
      },
      {
        question: "Is there any refund policy?",
        answer:
          "No refund is applicable once a test series is purchased. However, if you face any technical issue, our support team will assist you promptly.",
      },
    ].map((faq, index) => (
      <details
        key={index}
        className="group border border-gray-200 bg-white rounded-xl shadow-sm p-5 transition hover:shadow-md"
      >
        <summary className="flex justify-between items-center cursor-pointer font-semibold text-[#124734]">
          {faq.question}
          <span className="transition-transform group-open:rotate-180 text-[#1E5631]">
            ▼
          </span>
        </summary>
        <p className="text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
      </details>
    ))}
  </div>
</div>


    </section>
  );
};

export default TestPage;
