import { useState } from "react";
import { HiOutlineInbox } from "react-icons/hi2";


export default function StudentOrders() {
  const [activeTab, setActiveTab] = useState("course");

  return (
    <div className="w-full p-6 bg-[#f5f8f5]">

      {/* PAGE TITLE */}
    
      {/* FILTER CARD */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 mb-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          {/* DATE FILTER INPUTS */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-green-500"
            />

            <span className="text-gray-500">→</span>

            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-green-500"
            />

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-sm transition text-sm">
              Apply
            </button>
          </div>

          {/* TOGGLE TABS */}
          <div className="flex bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setActiveTab("course")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "course"
                  ? "bg-green-600 text-white shadow"
                  : "text-gray-600"
              }`}
            >
              Courses
            </button>

            <button
              onClick={() => setActiveTab("test")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "test"
                  ? "bg-green-600 text-white shadow"
                  : "text-gray-600"
              }`}
            >
              Test Series
            </button>
          </div>

        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="pb-3 font-medium">Order Id</th>
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Payment Date</th>
              <th className="pb-3 font-medium">Payment Id</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">View</th>
            </tr>
          </thead>

          <tbody>

            {/* Empty State */}
            <tr>
              <td colSpan={7} className="py-14 text-center text-gray-400">
                <div className="flex flex-col items-center justify-center">
                  <HiOutlineInbox size={45} className="text-gray-300 mb-3" />
                  <p>No orders found</p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>

      </div>

    </div>
  );
}
