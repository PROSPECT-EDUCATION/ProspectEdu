// src/components/Courses/EngineeringCoursesList.jsx
import CourseCard from "../../pages/Courses/CourseCard";
import course1 from "../../assets/it.png";
import course2 from "../../assets/electrical.png";
import course3 from "../../assets/it.png";

// 👉 Export courses so other pages can read them
export const engineeringCoursesData = [
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
    title: "Information Technology Advanced Batch",
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

// 👉 Component now accepts courses as props
export default function EngineeringCoursesList({ courses }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
}
