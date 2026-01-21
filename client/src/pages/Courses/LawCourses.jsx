// src/pages/Courses/LawCourses.jsx

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import LawCoursesList, {
  lawCoursesData,
} from "../../components/Courses/LawCoursesList";

export default function LawCourses() {
  const courses = lawCoursesData;

  return (
    <>
      <Navbar />

      {/* ✅ Semantic wrapper (no UI change) */}
      <main aria-labelledby="law-courses-heading">
        <section className="py-16 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-6">

            {/* ✅ ONLY CHANGE: h2 → h1 (text unchanged) */}
            <h1
              id="law-courses-heading"
              className="text-3xl font-heading text-[#124734] mb-6 text-center"
            >
              Law Courses
            </h1>

            {/* ✅ Text unchanged */}
            <p className="text-center text-[#5B7065] mb-10">
              Total Courses {courses.length}, Courses available on this page:{" "}
              {courses.length}
            </p>

            {/* ✅ Untouched */}
            <LawCoursesList courses={courses} />

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
