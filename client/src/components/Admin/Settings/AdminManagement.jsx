import { useState } from "react";
import AdminDetailsModal from "./AdminDetailsModal";

export default function AdminManagement() {
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Dummy Admins Data (replace with API later)
  const admins = [
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit.admin@example.com",
      phone: "+91 98765 43210",
      role: "Super Admin",
      lastLogin: "2025-02-20 10:32 AM",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha.verma@example.com",
      phone: "+91 98234 56780",
      role: "Admin",
      lastLogin: "2025-02-18 08:11 PM",
    },
    {
      id: 3,
      name: "Raj Singh",
      email: "raj.singh@example.com",
      phone: "+91 90123 98765",
      role: "Admin",
      lastLogin: "2025-02-19 05:21 PM",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-[#E6F4EC]">
      <h2 className="text-2xl font-heading text-[#124734] mb-4">Admin Management</h2>
      <p className="text-sm text-[#5B7065] mb-6">
        View details of all administrators.
      </p>

      {/* Admin Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {admins.map((admin) => (
          <div
            key={admin.id}
            onClick={() => setSelectedAdmin(admin)}
            className="p-4 border border-[#A7E1B2] rounded-lg cursor-pointer hover:shadow-md transition bg-white"
          >
            <h3 className="font-semibold text-[#124734]">{admin.name}</h3>
            <p className="text-sm text-[#5B7065]">{admin.email}</p>
            <p className="text-sm text-[#5B7065]">{admin.phone}</p>
            <span className="mt-2 inline-block text-xs px-3 py-1 rounded-full bg-[#E6F4EC] text-[#124734]">
              {admin.role}
            </span>
          </div>
        ))}
      </div>

      {/* Admin Details Modal */}
      {selectedAdmin && (
        <AdminDetailsModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
        />
      )}
    </div>
  );
}
