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

      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-heading text-[#124734] mb-6 text-center">
            Law Courses
          </h2>

          <p className="text-center text-[#5B7065] mb-10">
            Total Courses {courses.length}, Courses available on this page:{" "}
            {courses.length}
          </p>

          <LawCoursesList courses={courses} />
        </div>
      </section>

      <Footer />
    </>
  );
}
