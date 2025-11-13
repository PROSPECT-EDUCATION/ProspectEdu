// src/pages/Courses.jsx
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar"; // optional: show navbar inside page
import courses from "../data/courses";
import Footer from "../components/Footer";

export default function Courses() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-heading text-[#124734] mb-6">All Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c.slug} className="bg-white border border-[#A7E1B2] rounded-xl overflow-hidden">
             <div className="w-full h-36 flex items-center justify-center overflow-hidden bg-[#F0F5F2]">
  <img
    src={c.img}
    alt={c.title}
    className="h-full w-auto object-contain"
  />
</div>

              <div className="p-4">
                <h2 className="font-heading text-lg text-[#124734]">{c.title}</h2>
                <p className="text-sm text-[#5B7065]">{c.short}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/courses/${c.slug}`}
                    className="text-sm font-medium border border-[#009846] text-[#009846] px-4 py-2 rounded-full hover:bg-[#009846] hover:text-white transition"
                  >
                    View
                  </Link>
                  <span className="text-xs text-[#5B7065]">{c.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}