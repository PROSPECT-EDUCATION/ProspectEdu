import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { api } from "../../lib/api";

import newsImg from "../../assets/News.webp";

const NewsDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("English");

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/news/${slug}`);
        setReport(res.data?.data || null);
      } catch {
        setReport(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [slug]);

  if (loading) return <p className="text-center mt-20 text-lg">Loading…</p>;
  if (!report) return <p className="text-center mt-20 text-lg">News not found</p>;

  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />

      <HeaderSection
        page="News"
        title={report.title}
        subtitle={report.description}
        image={newsImg}
      />

      <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-xl p-5 sm:p-6 md:p-8 lg:p-10 relative text-left">
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setLanguage("English")}
            className={`px-3 py-1 rounded-md border text-sm font-medium ${
              language === "English"
                ? "bg-[#A7E1B2] border-[#A7E1B2]"
                : "bg-white border-gray-300 hover:bg-[#A7E1B2]"
            }`}
          >
            English
          </button>

          <button
            onClick={() => setLanguage("Hindi")}
            className={`px-3 py-1 rounded-md border text-sm font-medium ${
              language === "Hindi"
                ? "bg-[#A7E1B2] border-[#A7E1B2]"
                : "bg-white border-gray-300 hover:bg-[#A7E1B2]"
            }`}
          >
            Hindi
          </button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-[#1E5631] mb-6 text-sm font-semibold hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold mb-3 border-b border-gray-300 pb-2">
          {report.title}
        </h2>

        <div className="text-gray-800 leading-relaxed whitespace-pre-line text-sm sm:text-[15px] mt-4">
          {language === "English" ? (report.english || "") : (report.hindi || "")}
        </div>
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </section>
  );
};

export default NewsDetails;
