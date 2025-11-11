import CourseCard from "./CourseCard";
import course1 from "../../assets/law.png";
import course2 from "../../assets/law.png";
import course3 from "../../assets/law.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

export default function EngineeringCourses() {
  const courses = [
    {
      title: "B.Tech Electrical Systems",
      image: course1,
      startDate: "11 Nov 2025",
      endDate: "28 Feb 2026",
      price: 599,
      oldPrice: 899,
      mode: "Online",
    },
    {
      title: "Mechanical Engineering Advanced Batch",
      image: course2,
      startDate: "12 Nov 2025",
      endDate: "10 Mar 2026",
      price: 999,
      oldPrice: 1299,
      mode: "Hybrid",
    },
    {
      title: "Civil Engineering Project Management",
      image: course3,
      startDate: "15 Nov 2025",
      endDate: "20 Mar 2026",
      price: 799,
      oldPrice: 999,
      mode: "Online",
    },
  ];

  return (
    <>
    <Navbar/>
    <section className="py-16 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-heading text-[#124734] mb-6 text-center">
          Law Courses
        </h2>
        <p className="text-center text-[#5B7065] mb-10">
          Total Courses {courses.length}, Courses available on this page: {courses.length}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
