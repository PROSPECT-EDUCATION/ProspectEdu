import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function StudentQuizResultPage() {
  const { quizId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const attempt = state?.attempt;
  const quizTitle = state?.quizTitle;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white border border-[#E6F4EC] rounded-2xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-[#124734]">Quiz Result</h1>
        {quizTitle ? <p className="text-sm text-[#5B7065] mt-1">{quizTitle}</p> : null}

        <div className="mt-6 border border-[#E6F4EC] rounded-xl p-4">
          <div className="text-sm text-[#5B7065]">Score</div>
          <div className="text-3xl font-bold text-[#124734] mt-1">
            {attempt?.score ?? 0} / {attempt?.totalMarks ?? 0}
          </div>
          <div className="text-xs text-[#5B7065] mt-2">
            Time taken: <span className="text-[#124734] font-medium">{attempt?.timeTakenSeconds ?? 0}s</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate(`/student/quizzes/${quizId}/attempts`)}
            className="flex-1 px-4 py-3 rounded-xl border border-[#A7E1B2] text-[#124734] hover:bg-[#F2FBF6]"
          >
            View Attempts
          </button>
          <button
            onClick={() => navigate(`/student/quizzes/${quizId}/start`)}
            className="flex-1 px-4 py-3 rounded-xl bg-[#009846] text-white hover:bg-[#0d3a28]"
          >
            Reattempt
          </button>
        </div>

        <button onClick={() => navigate(-1)} className="mt-4 text-sm underline text-[#124734]">
          ← Back
        </button>
      </div>
    </div>
  );
}
