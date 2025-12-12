import { BarChart3 } from "lucide-react";

export default function PerformanceSnapshot({ student }) {
  return (
    <div className="bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <BarChart3 className="text-[#009846]" />
        <h3 className="text-lg font-semibold text-[#124734]">Performance</h3>
      </div>

      <p className="text-sm text-[#5B7065] mb-3">
        Overall performance snapshot for {student.name}
      </p>

      {/* Fake bar graph UI */}
      <div className="space-y-2">
        <div>
          <p className="text-xs text-[#5B7065]">Assignments</p>
          <div className="h-2 bg-[#E6F4EC] rounded-full">
            <div className="h-2 bg-[#009846] rounded-full w-[78%]" />
          </div>
        </div>

        <div>
          <p className="text-xs text-[#5B7065]">Quizzes</p>
          <div className="h-2 bg-[#E6F4EC] rounded-full">
            <div className="h-2 bg-[#009846] rounded-full w-[72%]" />
          </div>
        </div>

        <div>
          <p className="text-xs text-[#5B7065]">Course Progress</p>
          <div className="h-2 bg-[#E6F4EC] rounded-full">
            <div className="h-2 bg-[#009846] rounded-full w-[65%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
