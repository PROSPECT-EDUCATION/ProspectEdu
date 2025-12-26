import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { newsData } from "../../data/NewsData";
import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

import newsImg from "../../assets/News.webp";


const News = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const tabs = [
    "All",
    "IT News",
    "Civil News",
    "Electrical News",
    "Law News",
    "Management News",
  ];

  

  const filteredReports = newsData.filter((report) => {
    const matchTab = activeTab === "All" ? true : report.subject === activeTab;

    const matchDate = selectedDate
      ? report.date === selectedDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : true;

    return matchTab && matchDate;
  });

  return (
    
       <section className="bg-[#F9FAFB] text-[#124734]  font-[Open_Sans,sans-serif]">
            <Navbar />
      
            {/* ---------------- Header Section ---------------- */}
      
            <HeaderSection
                page=" News"
                title="Latest News & Updates"
                subtitle="Stay updated with the newest events, announcements, and stories 
              from the academic and professional world."
                image={newsImg}
              />

      {/* ---------------- Tabs + Date Picker ---------------- */}
      <div className="bg-white shadow-md rounded-xl max-w-6xl mx-auto mt-8 md:mt-10 px-4 md:px-6 py-5 flex flex-wrap items-center justify-between gap-4">

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#A7E1B2] text-black border-[#A7E1B2]"
                  : "bg-white text-black border-gray-300 hover:bg-[#A7E1B2]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date Picker */}
        <div className="w-full sm:w-auto text-center sm:text-left">
          <DatePicker
            selected={selectedDate}
            onChange={(d) => setSelectedDate(d)}
            className="border px-3 py-2 text-sm sm:text-base rounded-lg shadow-sm w-full sm:w-auto"
            placeholderText="Select Date"
            dateFormat="dd MMM yyyy"
            isClearable
          />
        </div>
      </div>

      {/* ---------------- Reports List ---------------- */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-left">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center md:text-left">
          {activeTab === "All" ? "All News" : activeTab}
        </h2>

        <div className="space-y-6">
          {filteredReports.length === 0 && (
            <p className="text-center text-gray-600 py-6">
              No news found for this date.
            </p>
          )}

          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => navigate(`/news/${report.slug}`)}

              className="flex flex-col md:flex-row items-start bg-white shadow-sm rounded-lg p-4 md:p-5 border border-gray-200 hover:shadow-md transition cursor-pointer"
            >
              <img
                src={report.img}
                alt={report.title}
                className="w-full md:w-[180px] h-[150px] object-cover rounded-md"
              />

              <div className="md:ml-6 mt-4 md:mt-0">
                <h3 className="text-lg sm:text-xl font-semibold text-[#124734] mb-2">
                  {report.title}
                </h3>

                <p className="text-gray-700 text-sm sm:text-base">
                  {report.description}
                </p>

                <div className="flex items-center gap-3 text-gray-500 text-xs mt-3">
                  <span className="px-2 py-1 bg-[#A7E1B2] text-[#124734] rounded-md text-[11px] font-medium">
                    {report.subject}
                  </span>
                  <span>📅 {report.date}</span>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
      <div className="pt-10"><Footer /></div>
    </section>
  );
};

export default News;
