export default function CourseCard({ course }) {
  return (
    <div className="flex flex-col justify-between bg-white border border-[#A7E1B2] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 h-[340px] w-full">
      
      {/* Smaller image area */}
      <div className="flex justify-center items-center h-[140px] mb-3">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Course Info */}
      <div className="flex-grow text-center">
        <h3 className="font-heading text-base font-semibold text-[#124734] mb-1">
          {course.title}
        </h3>
        <p className="text-xs text-[#5B7065]">
          {course.mode} | {course.startDate} - {course.endDate}
        </p>
      </div>

      {/* Price + Button */}
      <div className="mt-3 flex flex-col items-center">
        <p className="text-sm font-semibold text-[#124734]">
          ₹{course.price}{" "}
          <span className="line-through text-[#5B7065] text-xs ml-1">
            ₹{course.oldPrice}
          </span>
        </p>
        <button className="mt-2 px-4 py-1.5 text-xs rounded-full border border-[#009846] text-[#009846] hover:bg-[#009846] hover:text-white transition">
          Enroll Now
        </button>
      </div>

    </div>
  );
}
