import React, { useState } from "react";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../ui/ConfirmDialog";

export default function AddAnnouncementForm() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("General");
  const [status, setStatus] = useState("Active");
  const [attachment, setAttachment] = useState(null);

  const [confirmCancel, setConfirmCancel] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      showToast("Please fill all required fields!", "error");
      return;
    }

    showToast("Announcement created successfully!", "success");

    setTimeout(() => {
      navigate("/admin/announcements");
    }, 700);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement Title"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            placeholder="Enter announcement details..."
            className="border border-gray-300 rounded-lg px-4 py-2"
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option>General</option>
            <option>Exam</option>
            <option>Holiday</option>
            <option>Urgent</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Attachment */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Attachment (Optional)</label>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-[#124734] text-white px-6 py-2 rounded-md hover:bg-[#0E3A2B] transition"
          >
            Publish Announcement
          </button>

          <button
            type="button"
            onClick={() => setConfirmCancel(true)}
            className="bg-red-400 text-white px-6 py-2 rounded-md hover:bg-red-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Confirm Cancel Dialog */}
      <ConfirmDialog
        open={confirmCancel}
        title="Cancel Announcement?"
        message="Are you sure? All unsaved data will be lost."
        onConfirm={() => navigate("/admin/announcements")}
        onCancel={() => setConfirmCancel(false)}
      />
    </div>
  );
}
