import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import CourseCard from "./CourseCard";
import { publicCoursesApi } from "../../services/publicCourses";

export default function CategoryCourses() {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await publicCoursesApi.listByCategory(category);

        const backendCourses = res.data.courses || [];

        // 🔥 MAP BACKEND → CourseCard FORMAT (THIS IS THE KEY)
        const uiCourses = backendCourses.map((c) => ({
  _id: c._id,
  slug: c.slug,          // ✅ IMPORTANT
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

    fetchCourses();
  }, [category]);

  return (
    <>
      <Navbar />

      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">

          {/* ✅ UI MATCHES EngineeringCourses.jsx */}
          <h2 className="text-3xl font-heading text-[#124734] mb-6 text-center capitalize">
            {category} Courses
          </h2>

          {loading ? (
            <p className="text-center text-[#5B7065]">
              Loading courses...
            </p>
          ) : courses.length === 0 ? (
            <p className="text-center text-[#5B7065]">
              No courses available in this category.
            </p>
          ) : (
            <>
              <p className="text-center text-[#5B7065] mb-10">
                Total Courses {courses.length}, Courses available on this page:{" "}
                {courses.length}
              </p>

              {/* ✅ SAME GRID STYLE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
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
