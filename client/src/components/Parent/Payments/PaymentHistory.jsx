export default function PaymentHistory({ history }) {
  return (
    <div className="bg-white border border-[#E6F4EC] rounded-xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-[#124734] mb-4">Payment History</h3>

      <div className="space-y-3 text-sm">
        {history.map((h, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="text-[#124734]">{h.date}</p>
              <p className="text-[#5B7065]">₹{h.amount}</p>
            </div>

            <span
              className={`px-2 py-[2px] rounded-md text-xs ${
                h.status === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {h.status === "success" ? "Success" : "Failed"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
