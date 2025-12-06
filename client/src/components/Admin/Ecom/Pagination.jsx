import React from "react";

export default function Pagination({ page, setPage, totalPages }) {
  const pages = [1, 2, 3, 4, 5, "...", totalPages];

  return (
    <div className="flex justify-between items-center mt-6">

      {/* Previous Button */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-4 py-2 border rounded-lg text-sm flex items-center gap-2 
          ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
        `}
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === "number" && setPage(p)}
            className={`px-3 py-2 rounded-lg border text-sm 
              ${page === p
                ? "bg-[#C8EFC9] text-[#124734] font-semibold"
                : "hover:bg-gray-100"}
            `}
            disabled={p === "..."}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-4 py-2 border rounded-lg text-sm flex items-center gap-2 
          ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
        `}
      >
        Next →
      </button>
    </div>
  );
}
