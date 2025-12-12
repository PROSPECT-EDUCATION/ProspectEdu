export default function StudentCard({ student, onSelect }) {
  return (
    <div
      onClick={() => onSelect(student.id)}
      className="bg-white p-5 rounded-xl shadow-sm border border-[#E6F4EC] cursor-pointer hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        <img
          src={student.avatar}
          className="h-12 w-12 rounded-full border border-[#A7E1B2]"
        />
        <div>
          <h3 className="text-lg font-semibold text-[#124734]">{student.name}</h3>
          <p className="text-sm text-[#5B7065]">Class {student.class}</p>
          <p className="text-xs text-[#98A6A2]">Roll: {student.roll}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-[#124734] mb-1">
          Attendance: <b>{student.attendance}%</b>
        </p>

        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="h-full bg-[#009846] rounded-full"
            style={{ width: `${student.overallProgress}%` }}
          ></div>
        </div>

        <p className="text-sm mt-1 text-[#5B7065]">
          Progress: {student.overallProgress}%
        </p>
      </div>

      <button
        className="mt-4 w-full bg-[#124734] text-white py-2 rounded-lg text-sm"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(student.id);
        }}
      >
        View Profile
      </button>
    </div>
  );
}
