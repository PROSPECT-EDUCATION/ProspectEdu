// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import CourseCard from "./Courses/CourseCard";
import { publicCoursesApi } from "../services/publicCourses";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await publicCoursesApi.listAll(); // 👈 NEW API CALL
        const backendCourses = res.data.courses || [];

        // 🔥 SAME MAPPING LOGIC
        const uiCourses = backendCourses.map((c) => ({
          _id: c._id,
          slug: c.slug,
          title: c.title,
          image: c.img,
          mode: c.short,
          startDate: c.date,
          price: c.price,
        }));

        setCourses(uiCourses);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  return (
    <>
      <Navbar />

      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-heading text-[#124734] mb-6">
            All Courses
          </h1>

          {loading ? (
            <p className="text-center text-[#5B7065]">
              Loading courses...
            </p>
          ) : courses.length === 0 ? (
            <p className="text-center text-[#5B7065]">
              No courses available.
            </p>
          ) : (
            <>
              <p className="text-center text-[#5B7065] mb-10">
                Total Courses {courses.length}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
