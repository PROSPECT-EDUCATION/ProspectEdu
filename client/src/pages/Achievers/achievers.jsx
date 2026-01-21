import React, { useState } from "react";
import achieversImg from "../../assets/acheivers.avif";
import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { api } from "../../lib/api";
import { useEffect } from "react";


const Achievers = () => {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All");
  const [year, setYear] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);
  const [achieversData, setAchieversData] = useState([]);

  // ✅ FILTER LOGIC
  const filteredAchievers = achieversData.filter((a) => {
    const matchName = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCourse = course === "All" || a.course === course;
    const matchYear = year === "All" || a.year === year;
    return matchName && matchCourse && matchYear;
  });
  useEffect(() => {
  (async () => {
    try {
      const res = await api.get("/achievers");
      setAchieversData(res.data?.data || []);
    } catch {
      setAchieversData([]);
    }
  })();
}, []);

  const faqs = [
    {
      q: "How are achievers selected?",
      a: "Achievers are selected based on course completion, performance, and consistency.",
    },
    {
      q: "Are certificates verified?",
      a: "Yes, all certificates are verified by our academic and admin team.",
    },
    {
      q: "Can I become an achiever?",
      a: "Yes. Complete your course successfully and meet performance criteria.",
    },
  ];

  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />

      {/* ===== HEADER ===== */}
      <HeaderSection
        page="Achievers"
        title="Our Achievers"
        subtitle="Meet the students who successfully completed courses and achieved their goals with us."
        image={achieversImg}
      />

      {/* ===== FILTER BAR ===== */}
      <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-2xl px-6 py-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by student name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#A7E1B2] rounded-lg px-4 py-3 w-full"
        />

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border border-[#A7E1B2] rounded-lg px-4 py-3 w-full md:w-1/3"
        >
          <option value="All">All Courses</option>
          <option value="Engineering">Engineering</option>
            <option value="Medical">Medical</option>
          <option value="Law">Law</option>
          <option value="Management">Management</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-[#A7E1B2] rounded-lg px-4 py-3 w-full md:w-1/4"
        >
          <option value="All">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* ===== ACHIEVERS GRID (3 PER ROW) ===== */}
      <div className="max-w-7xl mx-auto px-6 mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAchievers.map((a, i) => (
          <article
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <img
              src={a.imgUrl}
              alt={a.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-[#A7E1B2]"
            />

            <h3 className="text-xl font-semibold mt-4">{a.name}</h3>

            <p className="text-gray-600 text-sm mt-1">{a.course}</p>
            <p className="text-gray-500 text-sm">Year: {a.year}</p>

            <span className="inline-block bg-[#DFF5E1] text-[#124734] text-sm px-3 py-1 rounded-full mt-3">
              ✅ Course Completed
            </span>

            <p className="mt-4 text-sm text-gray-700">{a.achievement}</p>

            <p className="text-sm font-medium text-[#124734]">{a.extra}</p>

            <blockquote className="text-gray-500 text-sm italic mt-3">
              “{a.quote}”
            </blockquote>
          </article>
        ))}

        {filteredAchievers.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No achievers found
          </p>
        )}
      </div>

      {/* ===== WHY ACHIEVERS MATTER ===== */}
      <div className="max-w-6xl mx-auto px-6 mt-20 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Why Our Achievers Matter ⭐
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "🎯 Goal Oriented",
            "📜 Certified Students",
            "💼 Career Ready",
            "🤝 Mentor Guided",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl py-6 font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ===== FAQ WITH ANSWERS ===== */}
      <div className="max-w-5xl mx-auto px-6 mt-20 mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        {faqs.map((f, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-xl px-6 py-4 mb-4 cursor-pointer"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <div className="font-semibold flex justify-between">
              {f.q}
             <span className="transition-transform group-open:rotate-180 text-[#1E5631]">▼</span>
            </div>

            {openFaq === i && (
              <p className="text-gray-600 mt-3 text-sm text-left font-semibold">{f.a}</p>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </section>
  );
};

export default Achievers;
