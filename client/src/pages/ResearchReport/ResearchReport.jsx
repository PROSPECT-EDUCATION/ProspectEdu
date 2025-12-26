

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reportData } from "../../data/ReportData";
import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import researchImg from "../../assets/research.webp";

const ResearchReport = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const tabs = [
    "All",
    "Information Technology",
    "Civil Engineering",
    "Electrical Engineering",
    "Law",
    "Management",
  ];

  // ✅ DATA FROM FILE
  const reports = reportData;

  const filteredReports =
    activeTab === "All"
      ? reports
      : reports.filter((report) => report.subject === activeTab);

  return (
    <section className="bg-[#F9FAFB] text-[#124734]  font-[Open_Sans,sans-serif]">
                  <Navbar />
            
                  {/* ---------------- Header Section ---------------- */}
            
                  <HeaderSection
                      page=" Research Report"
                      title="Research Reports made simple."
                      subtitle=" Easy-to-read research from Technology, Engineering, Law, and Management."
                      image={researchImg}
                    />

      {/* Tabs */}
      <div className="bg-white shadow-md rounded-xl max-w-6xl mx-auto mt-10 px-4 md:px-6 py-4 flex flex-wrap justify-left gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg border text-sm md:text-base ${
              activeTab === tab
                ? "bg-[#A7E1B2] border-[#A7E1B2]"
                : "border-gray-300 hover:bg-[#A7E1B2]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reports */}
      <div className="max-w-6xl mx-auto mt-10 px-4 space-y-6 text-left">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() =>
             navigate(`/research-report/${report.slug}`)
            }
            className="flex flex-col md:flex-row bg-white shadow-sm rounded-lg p-4 border hover:shadow-md cursor-pointer"
          >
            <img
              src={report.img}
              alt={report.title}
              className="w-full md:w-[180px] h-[120px] object-cover rounded-md"
            />

            <div className="md:ml-6 mt-3 md:mt-0">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {report.title}
              </h3>
              <p className="text-gray-700 text-sm">{report.description}</p>
              <div className="flex gap-3 text-xs text-gray-500 mt-2">
                <span className="bg-[#A7E1B2] px-2 py-1 rounded">
                  {report.subject}
                </span>
                <span>📅 {report.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-10"><Footer /></div>

    </section>
  );
};

export default ResearchReport;

