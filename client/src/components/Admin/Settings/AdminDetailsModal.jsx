export default function AdminDetailsModal({ admin, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[999]">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 border border-[#A7E1B2]">
        
        {/* Header */}
        <h2 className="text-xl font-semibold text-[#124734] mb-4">
          Admin Details
        </h2>

        {/* Info */}
        <div className="space-y-3">
          <p><span className="font-medium">Name:</span> {admin.name}</p>
          <p><span className="font-medium">Email:</span> {admin.email}</p>
          <p><span className="font-medium">Phone:</span> {admin.phone}</p>
          <p><span className="font-medium">Role:</span> {admin.role}</p>
          <p><span className="font-medium">Last Login:</span> {admin.lastLogin}</p>
        </div>

        {/* Button */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#009846] text-white rounded-lg hover:bg-[#007d39] transition text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
