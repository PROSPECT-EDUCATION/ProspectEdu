import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import newsImg from "../../assets/News.png";
import researchImg from "../../assets/research.jpg";

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

  const reports = [
    {
      id: 1,
      title: "AI Revolution in Education",
      description:
        "Explores how artificial intelligence is reshaping learning systems and personalized education models.",
      subject: "IT News",
      date: "08 Nov 2025",
      img: researchImg,
      content: `
        Artificial Intelligence (AI) is rapidly transforming the education sector.
        From personalized learning paths to intelligent tutoring systems, AI tools
        are helping students learn more effectively. This report discusses the
        integration of machine learning and NLP in adaptive education platforms.
      `,
    },
    {
      id: 2,
      title: "Smart City Infrastructure Development",
      description:
        "An analysis of sustainable civil engineering projects designed to improve urban living.",
      subject: "Civil News",
      date: "08 Nov 2025",
      img: researchImg,
      content: `
        Smart City projects aim to create sustainable and efficient infrastructure.
        This report explores innovative civil engineering techniques and technologies
        used in modern urban design and environmental planning.
      `,
    },
    {
      id: 3,
      title: "Renewable Energy Optimization",
      description:
        "A study on how IoT and data analytics enhance the performance of renewable energy grids.",
      subject: "Electrical News",
      date: "08 Nov 2025",
      img: researchImg,
      content: `
        Renewable energy is key to global sustainability. This research focuses on
        optimizing power distribution through data-driven IoT devices, ensuring
        maximum energy efficiency.
      `,
    },
    {
      id: 4,
      title: "Cybersecurity in Modern Law Enforcement",
      description:
        "Discusses how digital forensics and cybersecurity principles are being adopted in legal frameworks.",
      subject: "Law News",
      date: "08 Nov 2025",
      img: researchImg,
      content: `
        With the rise of cybercrimes, law enforcement agencies are integrating
        cybersecurity strategies for better investigation and protection of
        digital evidence.
      `,
    },
    {
      id: 5,
      title: "Strategic Management in Modern Businesses",
      description:
        "An insight into how strategic management practices are evolving in the era of digital transformation.",
      subject: "Management News",
      date: "09 Nov 2025",
      img: researchImg,
      content: `
        The role of management has changed drastically due to technology and
        globalization. This report covers key trends and case studies in digital
        business strategy.
      `,
    },
  ];

  const filteredReports = reports.filter((report) => {
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
    <section className="bg-[#F9FAFB] text-[#124734] py-10 md:py-16 font-[Open_Sans,sans-serif]">

      {/* ---------------- Header ---------------- */}
      <div className="bg-[#1E5631] text-white w-full py-8 md:py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-5 md:px-8 gap-6">

          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-sm mb-3 text-gray-200">Home &gt; News</p>
            <h1 className="font-semibold text-3xl md:text-4xl mb-3 leading-snug">
              Latest News & Updates
            </h1>
            <p className="text-[#B7F399] text-lg font-medium">
              Stay updated with the newest events, announcements, and stories 
              from the academic and professional world.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={newsImg}
              alt="News"
              className="w-48 sm:w-60 md:w-[350px] rounded-lg shadow-md"
            />
          </div>

        </div>
      </div>

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
      <div className="max-w-6xl mx-auto mt-10 px-4">
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
              onClick={() => navigate(`/news/${report.id}`, { state: report })}
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

    </section>
  );
};

export default News;
