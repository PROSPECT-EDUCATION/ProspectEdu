import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import { useToast } from "../../context/ToastContext";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

const prettyDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

export default function AdminAnnouncementsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // delete confirm dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await api.get("/announcements");
      setAnnouncements(res?.data?.data || []);
    } catch (e) {
      showToast("Failed to load announcements", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const askDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/announcements/${deleteId}`);
      showToast("Announcement deleted successfully", "success");
      setConfirmOpen(false);
      setDeleteId(null);
      loadAnnouncements();
    } catch (e) {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full ${isCollapsed ? "w-20" : "w-64"}`}>
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main */}
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: sidebarWidth }}
      >
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-50"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="All Announcements" />
        </div>

        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Announcements</h2>

            {/* Optional quick add button */}
            <button
              onClick={() => navigate("/admin/announcements/create")}
              className="bg-[#124734] text-white px-4 py-2 rounded-lg hover:bg-[#0E3A2B]"
            >
              + Create Announcement
            </button>
          </div>

          {/* Table */}
          <div className="bg-white shadow rounded-xl p-6">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : announcements.length === 0 ? (
              <p className="text-gray-500">No announcements found.</p>
            ) : (
              <table className="w-full text-left border-collapse">
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
                    <tr key={a._id} className="border-b">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3 font-medium">{a.title}</td>
                      <td className="p-3 text-gray-600 line-clamp-2">
                        {a.description}
                      </td>
                      <td className="p-3">{prettyDate(a.createdAt)}</td>
                      <td className="p-3">
                        {/* ✅ ONLY DELETE */}
                        <button
                          onClick={() => askDelete(a._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Confirm Delete */}
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
