export default function StudentsTable({ students, onSelect }) {

  const getAverages = (student) => {
    const assignmentAvg = Math.round(
      student.assignments.reduce((a, b) => a + b.score, 0) /
      student.assignments.length
    );

    const quizAvg = Math.round(
      student.quizzes.reduce((a, b) => a + b.score, 0) /
      student.quizzes.length
    );

    return { assignmentAvg, quizAvg };
  };

  return (
    <div className="bg-white border border-[#E6F4EA] rounded-xl p-4 mt-4">

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-[#5B7065]">
              <th className="py-3 px-3">Student</th>
              <th className="py-3 px-3">Assignment Avg</th>
              <th className="py-3 px-3">Quiz Avg</th>
              <th className="py-3 px-3">Attendance</th>
              <th className="py-3 px-3">Progress</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => {
              const avg = getAverages(s);

              return (
                <tr key={s.id} className="border-t">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#E8F5EC] flex items-center justify-center text-[#124734]">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium text-[#124734]">{s.name}</div>
                        <div className="text-xs text-[#5B7065]">{s.roll}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-[#124734] font-medium">
                    {avg.assignmentAvg}%
                  </td>

                  <td className="py-3 px-3 text-[#124734] font-medium">
                    {avg.quizAvg}%
                  </td>

                  <td className="py-3 px-3 text-[#124734] font-medium">
                    {s.attendance}%
                  </td>

                  <td className="py-3 px-3 text-[#124734] font-medium">
                    {s.progress}%
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelect(s)}
                      className="px-3 py-1 rounded-lg border border-[#DFF6E6] bg-white text-sm text-[#124734] hover:bg-[#F5FFF7]"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}

            {students.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-center text-[#5B7065]">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
