// src/components/Courses/MedicalCoursesList.jsx

import CourseCard from "../../pages/Courses/CourseCard";
import med1 from "../../assets/medical.png";
import med2 from "../../assets/medical.png";
import med3 from "../../assets/medical.png";

// 👉 Export courses so other pages can read them
export const medicalCoursesData = [
  {
    title: "MBBS Foundation Program",
    image: med1,
    startDate: "05 Jan 2026",
    endDate: "30 Jun 2026",
    price: 1499,
    oldPrice: 1899,
    mode: "Online",
  },
  {
    title: "Nursing & Paramedical Essentials",
    image: med2,
    startDate: "10 Jan 2026",
    endDate: "25 May 2026",
    price: 999,
    oldPrice: 1299,
    mode: "Hybrid",
  },
  {
    title: "Medical Lab Technology Course",
    image: med3,
    startDate: "15 Jan 2026",
    endDate: "10 Jun 2026",
    price: 1199,
    oldPrice: 1599,
    mode: "Online",
  },
];

export default function MedicalCoursesList({ courses }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
}
