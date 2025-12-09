import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import researchImg from "../../assets/research.jpg";


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

  const reports = [
    {
      id: 1,
      title: "AI Revolution in Education",
      description:
        "Explores how artificial intelligence is reshaping learning systems and personalized education models.",
      subject: "Information Technology",
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
      subject: "Civil Engineering",
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
      subject: "Electrical Engineering",
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
      subject: "Law",
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
      subject: "Management",
      date: "09 Nov 2025",
      img: researchImg,
      content: `
        The role of management has changed drastically due to technology and
        globalization. This report covers key trends and case studies in digital
        business strategy.
      `,
    },
  ];

  const filteredReports =
    activeTab === "All"
      ? reports
      : reports.filter((report) => report.subject === activeTab);

  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">
      {/* Header */}
      <div className="bg-[#1E5631] text-white w-full py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8">
          <div className="w-full md:w-1/2 pr-8">
            <p className="text-sm mb-3 text-gray-200">Home &gt; Research Report</p>
            <h1 className="font-semibold text-4xl mb-3 leading-snug">
              Research Reports made simple.
            </h1>
            <p className="text-[#B7F399] text-lg font-medium">
              Our Research Report section offers a deep dive into the latest academic
              and professional studies across multiple fields like Technology, Science,
              Education, and Innovation.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-end mt-8 md:mt-0">
            <img
              src={researchImg}
              alt="Research Report Illustration"
              className="max-w-[16rem] md:w-[350px] rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-md rounded-xl max-w-6xl mx-auto mt-10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#A7E1B2] text-black border-[#A7E1B2]"
                  : "bg-white text-black border-gray-300 hover:bg-[#A7E1B2]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Reports */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold mb-6">
          {activeTab === "All" ? "All Research Reports" : activeTab + " Reports"}
        </h2>

        <div className="space-y-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => navigate(`/research-report/${report.id}`, { state: report })}
              className="flex flex-col md:flex-row items-start bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <img
                src={report.img}
                alt={report.title}
                className="w-full md:w-[180px] h-[120px] object-cover rounded-md"
              />
              <div className="md:ml-6 mt-3 md:mt-0">
                <h3 className="text-xl font-semibold text-[#124734] mb-2">
                  {report.title}
                </h3>
                <p className="text-gray-700 text-sm">{report.description}</p>
                <div className="flex items-center gap-3 text-gray-500 text-xs mt-2">
                  <span className="px-2 py-1 bg-   text-[#124734] rounded-md text-[11px] font-medium">
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

export default ResearchReport;
