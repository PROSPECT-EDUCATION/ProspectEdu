import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import { useToast } from "../../context/ToastContext";
import ConfirmDialog from "../../components/ui/ConfirmDialog";  // ✅ added
import { useNavigate } from "react-router-dom";

export default function AdminAnnouncementsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const sidebarWidth = isCollapsed ? 80 : 256;

  // Announcements data
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "New Academic Calendar Released", description: "2024–2025 calendar published.", date: "28 November 2023" },
    { id: 2, title: "Holiday Notice", description: "School closed due to festival.", date: "20 November 2023" },
    { id: 3, title: "Exam Schedule Updated", description: "Mid-semester exam dates changed.", date: "15 November 2023" },
  ]);

  // Dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Open confirm dialog
  const askDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // On confirm delete
  const confirmDelete = () => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== deleteId));
    showToast("Announcement deleted successfully!", "success");
    setConfirmOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* MAIN AREA */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
        }}
      >
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Announcements" />
        </div>

        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">

          {/* Breadcrumb */}
          <div className="text-gray-600 text-sm mb-4">
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </span>
            {" / "}
            <span className="text-[#124734] font-semibold">Announcements</span>
          </div>

          {/* CARD */}
          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-4">All Announcements</h2>

            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {announcements.map((a, index) => (
                  <tr key={a.id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{a.title}</td>
                    <td className="p-3 text-gray-600">{a.description}</td>
                    <td className="p-3">{a.date}</td>

                    <td className="p-3">
                      <button
                        onClick={() => askDelete(a.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Announcement"
        message="Are you sure you want to delete this announcement?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
