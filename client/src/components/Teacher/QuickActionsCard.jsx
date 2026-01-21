import { PlusCircle, UploadCloud, FilePlus2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActionsCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E6F4EC] p-6 h-full">

      {/* Title */}
      <h2 className="text-xl font-semibold text-[#124734] mb-6">
        Quick Actions
      </h2>

      {/* Action Grid */}
      <div className="grid grid-cols-1 gap-4">

        {/* Create Course */}
        <button
          onClick={() => navigate("/teacher/create-course")}
          className="flex items-center gap-4 px-5 py-4 rounded-xl border border-[#A7E1B2]/40 
                     hover:bg-[#F2FBF6] hover:shadow-md transition text-left"
        >
          <div className="bg-[#009846]/10 p-3 rounded-full">
            <PlusCircle size={24} className="text-[#009846]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#124734]">Create Course</h3>
            <p className="text-xs text-[#5B7065]">Add a new course to your list</p>
          </div>
        </button>

        {/* Upload Lecture */}
        <button
          // you did not specify a route → leaving unchanged
          onClick={() => navigate("/teacher/courses")}
          className="flex items-center gap-4 px-5 py-4 rounded-xl border border-[#A7E1B2]/40 
                     hover:bg-[#F2FBF6] hover:shadow-md transition text-left"
        >
          <div className="bg-[#009846]/10 p-3 rounded-full">
            <UploadCloud size={24} className="text-[#009846]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#124734]">Upload Lecture</h3>
            <p className="text-xs text-[#5B7065]">Upload new video lectures</p>
          </div>
        </button>

        {/* Create Assignment */}
        <button
          onClick={() => navigate("/teacher/assessment/assignment")}
          className="flex items-center gap-4 px-5 py-4 rounded-xl border border-[#A7E1B2]/40 
                     hover:bg-[#F2FBF6] hover:shadow-md transition text-left"
        >
          <div className="bg-[#009846]/10 p-3 rounded-full">
            <FilePlus2 size={24} className="text-[#009846]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#124734]">Create Assignment</h3>
            <p className="text-xs text-[#5B7065]">Create quizzes or assignments</p>
          </div>
        </button>

      </div>
    </div>
  );
}
