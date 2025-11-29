import { Download } from "lucide-react";

export default function FeeTable({ items }) {
  const statusColors = {
    Paid: "text-green-700 bg-green-100",
    Pending: "text-orange-700 bg-orange-100",
    Overdue: "text-red-700 bg-red-100",
  };

  return (
    <div className="bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-[#124734] mb-4">Fee Breakdown</h3>

      <table className="w-full text-sm">
        <thead className="text-left text-[#5B7065]">
          <tr>
            <th>Particular</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Receipt</th>
          </tr>
        </thead>

        <tbody>
          {items.map((row, i) => (
            <tr key={i} className="border-t">
              <td className="py-3">{row.title}</td>
              <td>₹{row.amount}</td>

              <td>
                <span
                  className={`px-2 py-[2px] rounded-md text-xs ${statusColors[row.status]}`}
                >
                  {row.status}
                </span>
              </td>

              <td>{row.due}</td>

              <td>
                {row.receipt ? (
                  <button className="flex items-center gap-1 text-[#124734] hover:underline">
                    <Download size={14} /> Download
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
