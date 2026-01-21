import { Download } from "lucide-react";

export default function FeeTable({ items }) {
  const statusColors = {
    Paid: "text-green-700 bg-green-100",
    Pending: "text-orange-700 bg-orange-100",
    Overdue: "text-red-700 bg-red-100",
  };

  return (
    <div className="bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-[#124734] mb-4">
        Fee Breakdown
      </h3>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-center text-[#5B7065]">
            <tr>
              <th >Particular</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due Date</th>
              <th className="text-left">Receipt</th>
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

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {items.map((row, i) => (
          <div
            key={i}
            className="border border-[#E6F4EC] rounded-lg p-4 text-sm bg-[#F9FAFB]"
          >
            <div className="mb-2">
              <span className="font-semibold text-[#124734]">
                {row.title}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#5B7065]">Amount:</span>
              <span className="text-[#124734] font-medium">₹{row.amount}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#5B7065]">Status:</span>
              <span
                className={`px-2 py-[2px] rounded-md text-xs ${statusColors[row.status]}`}
              >
                {row.status}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#5B7065]">Due Date:</span>
              <span className="text-[#124734]">{row.due}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#5B7065]">Receipt:</span>
              {row.receipt ? (
                <button className="flex items-center gap-1 text-[#124734] hover:underline">
                  <Download size={14} /> Download
                </button>
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
