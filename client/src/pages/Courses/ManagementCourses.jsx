// src/pages/Courses/ManagementCourses.jsx

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import ManagementCoursesList, {
  managementCoursesData,
} from "../../components/Courses/ManagementCoursesList";

export default function ManagementCourses() {
  const courses = managementCoursesData;

  return (
    <>
      <Navbar />

      {/* ✅ Semantic wrapper (no UI change) */}
      <main aria-labelledby="management-courses-heading">
        <section className="py-16 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-6">

            {/* ✅ ONLY CHANGE: h2 → h1 (text unchanged) */}
            <h1
              id="management-courses-heading"
              className="text-3xl font-heading text-[#124734] mb-6 text-center"
            >
              Management Courses
            </h1>

            {/* ✅ Text unchanged */}
            <p className="text-center text-[#5B7065] mb-10">
              Total Courses {courses.length}, Courses available on this page:{" "}
              {courses.length}
            </p>

            {/* ✅ Untouched */}
            <ManagementCoursesList courses={courses} />

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
