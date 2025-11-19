import { useState } from "react";
import { Download } from "lucide-react";

export default function SubmissionListPage({ assignment, onBack, onEvaluate }) {
  // Example submissions (replace with DB/localStorage later)
  const submissions = [
    {
      id: 1,
      name: "Riya Sharma",
      status: "Submitted",
      score: "-",
      submittedAt: "2025-01-10",
      fileUrl: "/sample.pdf",
    },
    {
      id: 2,
      name: "Aman Verma",
      status: "Pending",
      score: "-",
      submittedAt: "-",
      fileUrl: null,
    },
    {
      id: 3,
      name: "Kunal Patel",
      status: "Evaluated",
      score: "18/20",
      submittedAt: "2025-01-09",
      fileUrl: "/sample.pdf",
    },
  ];

  const [filter, setFilter] = useState("All");

  const filteredList =
    filter === "All"
      ? submissions
      : submissions.filter((s) => s.status === filter);

  return (
    <div className="bg-white p-6 rounded-xl border border-[#A7E1B2] shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#124734]">
          Submissions – {assignment.title}
        </h2>

        <button
          onClick={onBack}
          className="text-[#009846] underline hover:text-[#007a37]"
        >
          ← Back
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-5">
        {["All", "Submitted", "Pending", "Evaluated"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md border ${
              filter === f
                ? "bg-[#009846] text-white border-[#009846]"
                : "border-[#A7E1B2] text-[#124734]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#E6F4EC] text-[#124734]">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Score</th>
            <th className="p-3 border">Submitted At</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredList.map((s) => (
            <tr key={s.id} className="text-[#5B7065] hover:bg-[#F9FAFB]">
              <td className="p-3 border">{s.name}</td>
              <td className="p-3 border">{s.status}</td>
              <td className="p-3 border">{s.score}</td>
              <td className="p-3 border">{s.submittedAt}</td>

              <td className="p-3 border flex gap-3">

                {/* DOWNLOAD BUTTON */}
                {s.fileUrl ? (
                  <a
                    href={s.fileUrl}
                    download
                    className="flex items-center gap-2 text-[#124734] underline"
                  >
                    <Download size={16} /> Download
                  </a>
                ) : (
                  <span className="text-gray-400">No File</span>
                )}

                {/* EVALUATE BUTTON */}
                {s.status === "Submitted" && (
                  <button
                    onClick={() => onEvaluate(s)}
                    className="text-[#009846] underline"
                  >
                    Evaluate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredList.length === 0 && (
        <p className="text-center mt-4 text-[#5B7065]">
          No submissions found for this filter.
        </p>
      )}
    </div>
  );
}
