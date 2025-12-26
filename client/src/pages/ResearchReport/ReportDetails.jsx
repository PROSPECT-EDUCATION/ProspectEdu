import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import researchImg from "../../assets/research.webp";
import English from "../../assets/English.pdf";
import Hindi from "../../assets/Hindi.pdf";
import { reportData } from "../../data/ReportData";
import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

const ReportDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("English");

  // 🔍 Find report by slug (SEO friendly)
  const report = reportData.find((r) => r.slug === slug);

  if (!report) {
    return <p className="text-center mt-20 text-lg">Report not found</p>;
  }

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

      {/* ===== CONTENT ===== */}
      <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6 md:p-8 relative text-left">

        {/* Language toggle */}
        <div className="absolute top-4 right-4 flex gap-2">
          {["English", "Hindi"].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 text-sm border rounded-md ${
                language === lang
                  ? "bg-[#A7E1B2] border-[#A7E1B2]"
                  : "hover:bg-[#A7E1B2]"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-[#1E5631] font-semibold mb-6 hover:underline"
        >
          ← Back
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold border-b pb-2 mb-4">
          {report.title}
        </h2>

        {/* Meta */}
        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <span className="bg-[#A7E1B2] px-2 py-1 rounded">
            {report.subject}
          </span>
          <span>📅 {report.date}</span>
        </div>

         {/* ✅ CONTENT (THIS WAS THE BUG) */}
        <div className="mt-4 text-gray-800 whitespace-pre-line leading-relaxed text-sm md:text-[15px]">
          {language === "English"
            ? report.content.english
            : report.content.hindi}
        </div>

        {/* PDF */}
        <div className="mt-8">
          <a
            href={language === "English" ? English : Hindi}
            download
            className="inline-block bg-[#A7E1B2] px-5 py-2 rounded-lg font-semibold hover:bg-[#8fd49f]"
          >
            ⬇️ Download Full Report ({language})
          </a>
        </div>
      </div>
      <div className="pt-10"><Footer /></div>
    </section>
  );
};

export default ReportDetails;
