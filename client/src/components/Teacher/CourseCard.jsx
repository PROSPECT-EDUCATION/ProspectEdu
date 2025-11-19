import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course, index }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl border border-[#E6F4EC] shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/teacher/course/${index}`)}
    >
      {/* Thumbnail */}
      <div className="h-48 w-full rounded-t-xl bg-[#E8F5EC] flex items-center justify-center overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Course Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-[#124734] leading-tight">
            {course.title}
          </h3>
        </div>

        <p className="text-sm text-[#5B7065] mt-1">
          {course.students} Students
        </p>

        {/* Progress */}
        <div className="mt-3">
          <div className="h-2 w-full bg-[#E6F4EC] rounded-full">
            <div
              className="h-full bg-[#009846] rounded-full"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-[#124734] mt-1 font-medium">
            {course.progress}% completed
          </p>
        </div>
      </div>
    </div>
  );
}
