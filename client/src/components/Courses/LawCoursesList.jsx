// src/components/Courses/LawCoursesList.jsx
import CourseCard from "../../pages/Courses/CourseCard";
import course1 from "../../assets/law.webp";
import course2 from "../../assets/law.webp";
import course3 from "../../assets/law.webp";

// 👉 Exported data array (UNCHANGED)
export const lawCoursesData = [
  {
    title: "LLB Foundation Batch",
    image: course1,
    startDate: "11 Nov 2025",
    endDate: "28 Feb 2026",
    price: 599,
    oldPrice: 899,
    mode: "Online",
  },
  {
    title: "Judiciary Preparation Batch",
    image: course2,
    startDate: "12 Nov 2025",
    endDate: "10 Mar 2026",
    price: 999,
    oldPrice: 1299,
    mode: "Hybrid",
  },
  {
    title: "Law Entrance Crash Course",
    image: course3,
    startDate: "15 Nov 2025",
    endDate: "20 Mar 2026",
    price: 799,
    oldPrice: 999,
    mode: "Online",
  },
];

// 👉 Component accepts courses as props
export default function LawCoursesList({ courses }) {
  return (
    <section
      aria-label="Law courses list"
      className="w-full"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <li key={course.title}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </section>
  );
}
