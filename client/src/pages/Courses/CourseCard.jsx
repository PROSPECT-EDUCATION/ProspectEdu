export default function CourseCard({ course }) {
  return (
    <div className="flex flex-col justify-between bg-white border border-[#A7E1B2] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 h-[420px]">
      {/* ✅ Fixed-size image area */}
      <div className="flex justify-center items-center h-[180px] mb-4">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* ✅ Course details */}
      <div className="flex-grow text-center">
        <h3 className="font-heading text-lg font-semibold text-[#124734] mb-2">
          {course.title}
        </h3>
        <p className="text-sm text-[#5B7065]">
          {course.mode} | {course.startDate} - {course.endDate}
        </p>
      </div>

      {/* ✅ Price + Button at bottom */}
      <div className="mt-4 flex flex-col items-center">
        <p className="text-sm font-semibold text-[#124734]">
          ₹{course.price}{" "}
          <span className="line-through text-[#5B7065] text-xs ml-1">
            ₹{course.oldPrice}
          </span>
        </p>
        <button className="mt-2 px-5 py-2 text-sm rounded-full border border-[#009846] text-[#009846] hover:bg-[#009846] hover:text-white transition">
          Enroll Now
        </button>
      </div>
    </div>
  );
}
