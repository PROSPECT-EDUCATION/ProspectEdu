// src/pages/Courses/MedicalCourses.jsx

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import MedicalCoursesList, {
  medicalCoursesData,
} from "../../components/Courses/MedicalCoursesList";

export default function MedicalCourses() {
  const courses = medicalCoursesData;

  return (
    <>
      <Navbar />

      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-heading text-[#124734] mb-6 text-center">
            Medical Courses
          </h2>

          <p className="text-center text-[#5B7065] mb-10">
            Total Courses {courses.length}, Courses available on this page:{" "}
            {courses.length}
          </p>

          <MedicalCoursesList courses={courses} />
        </div>
      </section>

      <Footer />
    </>
  );
}
