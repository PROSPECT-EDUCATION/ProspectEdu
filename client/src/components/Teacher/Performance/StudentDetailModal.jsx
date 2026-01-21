import { User, ArrowLeft } from "lucide-react";

export default function StudentDetailModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl border border-[#E6F4EA] shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E8F5EC] flex items-center justify-center text-[#124734]">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#124734]">{student.name}</h2>
              <p className="text-sm text-[#5B7065]">{student.roll}</p>
            </div>
          </div>

          <button onClick={onClose} className="flex items-center text-[#124734] gap-1 hover:underline">
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Assignments */}
          <div className="p-4 bg-[#F9FAFB] border rounded-lg">
            <h3 className="font-semibold text-[#124734] mb-2">Assignments</h3>
            <div className="space-y-2 max-h-40 overflow-auto">
              {student.assignments.map((a) => (
                <div key={a.id} className="flex justify-between text-sm text-[#124734]">
                  <span>{a.title}</span>
                  <span className="font-medium">{a.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quizzes */}
          <div className="p-4 bg-[#F9FAFB] border rounded-lg">
            <h3 className="font-semibold text-[#124734] mb-2">Quizzes</h3>
            <div className="space-y-2 max-h-40 overflow-auto">
              {student.quizzes.map((q) => (
                <div key={q.id} className="flex justify-between text-sm text-[#124734]">
                  <span>{q.title}</span>
                  <span className="font-medium">{q.score}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Attendance */}
        <div className="mt-4 p-4 border rounded-lg bg-[#F5FBF7]">
          <h3 className="font-semibold text-[#124734] mb-1">Attendance</h3>
          <p className="text-sm text-[#124734]">{student.attendance}%</p>
        </div>

        {/* Progress */}
        <div className="mt-4 p-4 border rounded-lg bg-[#F5FFF2]">
          <h3 className="font-semibold text-[#124734] mb-1">Course Progress</h3>
          <p className="text-sm text-[#124734]">{student.progress}%</p>
        </div>

      </div>
    </div>
  );
}
