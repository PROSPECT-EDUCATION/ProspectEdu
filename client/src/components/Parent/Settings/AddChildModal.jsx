import { X } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../../context/ToastContext";

export default function AddChildModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", course: "", roll: "" });
  const { showToast } = useToast();

  const change = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const submit = () => {
    if (!form.name.trim() || !form.course.trim() || !form.roll.trim()) {
      showToast("Please fill all fields", "error");
      return;
    }
    onAdd({
      name: form.name.trim(),
      class: form.course.trim(),
      roll: form.roll.trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div
        className="
          bg-white rounded-2xl border border-[#E6F4EC] shadow-xl p-6
          w-full max-w-[520px]        /* 🔥 Prevents overflow on mobile */
        "
      >
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#124734]">
              Add New Child
            </h3>
            <p className="text-sm text-[#5B7065] mt-1">
              Enter the details of the child to link with this parent account.
            </p>
          </div>

          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#5B7065]">Full name</label>
            <input
              value={form.name}
              onChange={(e) => change("name", e.target.value)}
              className="
                mt-2 p-2 border border-[#E6F4EC] rounded-md w-full outline-[#009846]
              "
              placeholder="Child's full name"
            />
          </div>

          <div>
            <label className="text-xs text-[#5B7065]">Course</label>
            <input
              value={form.course}
              onChange={(e) => change("course", e.target.value)}
              className="
                mt-2 p-2 border border-[#E6F4EC] rounded-md w-full outline-[#009846]
              "
              placeholder="e.g. 8 / Grade 10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-[#5B7065]">Roll No</label>
            <input
              value={form.roll}
              onChange={(e) => change("roll", e.target.value)}
              className="
                mt-2 p-2 border border-[#E6F4EC] rounded-md w-full outline-[#009846]
              "
              placeholder="Roll number"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-white border border-[#E6F4EC]"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 rounded-md bg-[#009846] text-white hover:bg-[#0e3a29]"
          >
            Add Child
          </button>
        </div>
      </div>
    </div>
  );
}
