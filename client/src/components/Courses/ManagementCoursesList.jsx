// src/components/Courses/ManagementCoursesList.jsx
import CourseCard from "../../pages/Courses/CourseCard";
import course1 from "../../assets/it.png";
import course2 from "../../assets/it.png";
import course3 from "../../assets/it.png";

// 👉 Exported data array
export const managementCoursesData = [
  {
    title: "MBA Foundation Program",
    image: course1,
    startDate: "11 Nov 2025",
    endDate: "28 Feb 2026",
    price: 599,
    oldPrice: 899,
    mode: "Online",
  },
  {
    title: "Business Analytics Advanced Batch",
    image: course2,
    startDate: "12 Nov 2025",
    endDate: "10 Mar 2026",
    price: 999,
    oldPrice: 1299,
    mode: "Hybrid",
  },
  {
    title: "Project Management Crash Course",
    image: course3,
    startDate: "15 Nov 2025",
    endDate: "20 Mar 2026",
    price: 799,
    oldPrice: 999,
    mode: "Online",
  },
];

// 👉 Component accepts courses as props
export default function ManagementCoursesList({ courses }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
}
