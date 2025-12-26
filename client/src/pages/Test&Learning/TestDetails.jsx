import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import testImg from "../../assets/test1.webp";
import whyTestImg from "../../assets/WhyTest.webp";
import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";


import WhyTestSeries from "../../components/WhyTestSeries";

const TestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const testData = {
    1: { title: "DSA Mastery Test Series", type: "Online" },
    2: { title: "Civil Engineering Test Series", type: "Online" },
    3: { title: "Law Test Series", type: "Online" },
    4: { title: "Management Test Series", type: "Offline" },
  };

  const test = testData[id];

  if (!test)
    return (
      <div className="min-h-screen flex justify-center items-center text-[#124734]">
        <p className="text-lg font-medium">⚠️ Test not found!</p>
      </div>
    );

  const includedItems = [
    { icon: "📄", label: "Question Paper" },
    { icon: "📘", label: "Model Answer" },
    { icon: "📚", label: "Answer Booklet" },
    { icon: "🧾", label: "Evaluation" },
  ];

  const schedule = [
    { id: 1, name: "Test : 01 || Mock Test", date: "11 November 2025", time: "04:00 PM", status: "Free Quiz" },
    { id: 2, name: "Test : 02 || Mock Test", date: "11 November 2025", time: "04:00 PM", status: "Test Ended" },
    { id: 3, name: "Test : 03 || Mock Test", date: "12 November 2025", time: "04:00 PM", status: "Live Now" },
    { id: 4, name: "Test : 04 || Mock Test", date: "19 November 2025", time: "04:00 PM", status: "Upcoming" },
  ];

  const getStatusColor = (status) => {
    if (status === "Free Quiz") return "bg-blue-100 text-blue-700 border border-blue-300";
    if (status === "Upcoming") return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    if (status === "Live Now") return "bg-green-100 text-green-700 border border-green-300 animate-pulse";
    if (status === "Test Ended") return "bg-red-100 text-red-700 border border-red-300";
    return "text-gray-600 border-gray-400";
  };

  return (
    <section className="bg-[#F9FAFB] text-[#124734]  font-[Open_Sans,sans-serif]">
      <Navbar />
      {/* Header */}
     <HeaderSection
  page={`Test Series > ${test.title}`}
  title={test.title}
  subtitle={
    <div>
      <p className="text-[#B7F399] text-lg font-medium mb-4">
        What’s Included
      </p>

      <div className="grid grid-cols-2 gap-y-4 gap-x-12 text-white max-w-xl">
        {includedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-sm">
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  }
  image={testImg}
/>


      {/* Lower Section */}
      <div className="max-w-7xl mx-auto mt-12 px-6 md:px-8 flex flex-col md:flex-row gap-8 text-left">

        {/* Schedule */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-6">Schedule</h2>

          <div className="divide-y divide-gray-200">
            {schedule.map((test) => (
              <div key={test.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-2 hover:bg-[#F9FAFB]">
                <div className="flex items-start sm:items-center gap-3">
                  <span className="text-purple-700 text-xl">🧾</span>
                  <div>
                    <p className="font-semibold text-[#124734]">{test.name}</p>
                    <p className="text-gray-600 text-sm flex gap-4 mt-1">
                      <span>📅 {test.date}</span>
                      <span>⏰ {test.time}</span>
                    </p>
                  </div>
                </div>

                <button disabled className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm cursor-default ${getStatusColor(test.status)}`}>
                  {test.status}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/3 h-fit text-left">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">{test.title}</h3>

          <p className="text-gray-700 text-base mb-2">
            <strong>Registration fee - </strong>
            {id === "1" ? "Free" : id === "2" ? "₹149/-" : id === "3" ? "₹299/-" : "₹999/-"}
            {id !== "1" && <span className="line-through text-gray-400 ml-1">3999/-</span>}
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Expire At - Not Available</li>
            <li>🧾 Total Test - {id === "1" ? "1" : id === "2" ? "21" : id === "3" ? "26" : "25"}</li>
            <li>❓ Total Question - {id === "1" ? "100" : id === "2" ? "800" : id === "3" ? "300" : "NA"}</li>
            <li>🌐 Language - {id === "2" ? "Hindi" : id === "3" ? "English/Hindi" : "English"}</li>
          </ul>

          <button className="bg-[#1E5631] text-white w-full py-2 mt-6 rounded-md font-medium hover:bg-[#A7E1B2] transition">
            Buy Now
          </button>
        </div>
      </div>

      {/* Why Test Series */}
      <WhyTestSeries image={whyTestImg} />

      <div className="pt-10"><Footer /></div>
    </section>
  );
};

export default TestDetails;
