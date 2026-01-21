import React, { useState } from "react";
import courses from "../../../../data/courses";
import { useToast } from "../../../../context/ToastContext";

export default function EnrollForm() {
  const [course, setCourse] = useState("");
  const [roll, setRoll] = useState("");
  const [batch, setBatch] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!course || !roll) {
      showToast("Please select course and enter roll number!", "error");
      return;
    }

    showToast("Student enrolled successfully!", "success");

    setCourse("");
    setRoll("");
    setBatch("");
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#124734] mb-4">
        Enroll a Student
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Select Course */}
        <div>
          <label className="text-gray-600 text-sm">Select Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option value={c.slug} key={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Roll Number */}
        <div>
          <label className="text-gray-600 text-sm">Roll Number</label>
          <input
            type="text"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="Enter roll number"
          />
        </div>

        {/* Batch */}
        <div>
          <label className="text-gray-600 text-sm">Batch (optional)</label>
          <input
            type="text"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="e.g. Batch A"
          />
        </div>

        {/* BUTTON */}
        <div className="md:col-span-3">
          <button
            type="submit"
            className="bg-[#124734] text-white px-6 py-2 rounded-md hover:bg-[#0E3A2B]"
          >
            Enroll Student
          </button>
        </div>

      </form>
    </div>
  );
}
