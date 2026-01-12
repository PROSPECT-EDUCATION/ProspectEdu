import React, { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { usersApi } from "../../services/users";
import { useToast } from "../../context/ToastContext";

export default function AdminStudentsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [actionType, setActionType] = useState(null); // "block" | "unblock"

  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "—";

  const formatDateTime = (d) =>
    d
      ? new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : "—";

  const load = async () => {
    try {
      setLoading(true);
      const res = await usersApi.listStudentsAdmin();
      setStudents(res.data.students || []);
    } catch (e) {
      console.log(e);
      showToast?.(e?.response?.data?.message || "Failed to load students", "error");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return students;

    return students.filter((s) => {
      const fields = [
        s.fullName,
        s.email,
        s.phone,
        s.state,
        s.city,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return fields.includes(q);
    });
  }, [students, searchQuery]);

  const openConfirm = (student, type) => {
    setSelectedStudent(student);
    setActionType(type);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedStudent?._id || !actionType) return;

    try {
      if (actionType === "block") {
        await usersApi.blockUser(selectedStudent._id);
        showToast?.("Student blocked", "success");
      } else {
        await usersApi.unblockUser(selectedStudent._id);
        showToast?.("Student unblocked", "success");
      }
      setConfirmOpen(false);
      setSelectedStudent(null);
      setActionType(null);
      await load();
    } catch (e) {
      console.log(e);
      showToast?.(e?.response?.data?.message || "Action failed", "error");
    }
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* MAIN */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth, width: `calc(100vw - ${sidebarWidth}px)` }}
      >
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Students" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[70px] pb-10 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start">
            <div className="text-gray-600 text-sm mb-1 mt-1">
              <span
                className="cursor-pointer hover:text-[#124734] transition"
                onClick={() => navigate("/admin-dashboard")}
              >
                Dashboard
              </span>
              {" / "}
              <span className="text-[#124734] font-medium">Students</span>
            </div>
          </div>

          {/* Title + Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#124734]">All Students List</h2>
            <button
              onClick={() => navigate("/admin/students/add")}
              className="bg-[#124734] text-white px-4 py-2 rounded-md hover:bg-[#0f3a24] transition"
            >
              + Add New
            </button>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span>Show</span>
              <select className="border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#124734] focus:border-[#124734]">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span>entries</span>
            </div>

            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-3 py-1 rounded-md focus:outline-none
                       focus:ring-2 focus:ring-[#124734] focus:border-[#124734]"
            />
          </div>

          {/* TABLE */}
          <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left border-b text-gray-600">
                  <th className="py-3 px-2 pl-4">Name</th>
                  <th className="py-3 px-2">Mobile No</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">State</th>
                  <th className="py-3 px-2">City</th>
                  <th className="py-3 px-2">Join Date</th>
                  <th className="py-3 px-2">Last Active</th>
                  <th className="py-3 px-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-6 px-4 text-gray-500" colSpan={8}>
                      Loading...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td className="py-6 px-4 text-gray-500" colSpan={8}>
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => {
                    const lastActive = s.lastLoginAt || s.updatedAt || null;

                    return (
                      <tr
                        key={s._id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/admin/students/${s._id}`)} // ✅ details page
                      >
                        <td className="py-3 px-4">{s.fullName || s.email || "—"}</td>
                        <td className="py-3 px-2">{s.phone || "—"}</td>
                        <td className="py-3 px-2">{s.email || "—"}</td>
                        <td className="py-3 px-2">{s.state || "—"}</td>
                        <td className="py-3 px-2">{s.city || "—"}</td>
                        <td className="py-3 px-2">{formatDate(s.createdAt)}</td>
                        <td className="py-3 px-2">{formatDateTime(lastActive)}</td>

                        {/* ✅ stop row click for buttons */}
                        <td className="py-3 px-2" onClick={(e) => e.stopPropagation()}>
                          {s.isActive ? (
                            <button
                              onClick={() => openConfirm(s, "block")}
                              className="px-3 py-1 rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              onClick={() => openConfirm(s, "unblock")}
                              className="px-3 py-1 rounded-md border border-green-300 text-green-600 hover:bg-green-50"
                            >
                              Unblock
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* CONFIRM */}
          <ConfirmDialog
            open={confirmOpen}
            title={actionType === "block" ? "Block Student" : "Unblock Student"}
            message={
              actionType === "block"
                ? `Are you sure you want to block ${selectedStudent?.fullName || selectedStudent?.email}?`
                : `Are you sure you want to unblock ${selectedStudent?.fullName || selectedStudent?.email}?`
            }
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
}
