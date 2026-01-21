// src/pages/Admin/Fees/FeesCollectionPage.jsx

import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import TestSeriesFeesTable from "../../components/Admin/TestSeriesFees/TestSeriesFeesTable";
import { useNavigate } from "react-router-dom";



export default function FeesCollectionPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const sidebarWidth = isCollapsed ? 80 : 256;

  

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
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
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Fees Collection" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">

          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start ">
          <div className="text-gray-600 text-sm mb-4">
            <span
              className="cursor-pointer hover:text-[#124734]"
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </span>
            {" / "}
            <span className="text-[#124734] font-semibold">Test Series Fees Collection</span>
          </div>
</div>
          {/* CARD */}
          <div className="bg-white shadow rounded-xl p-6">

            {/* TOP CONTROLS */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select className="border border-[#124734] px-2 py-1 rounded focus:outline-none">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex items-center gap-3">
                


                {/* SEARCH */}
                <div className="flex items-center gap-2">
                  <span>Search:</span>
                  <input
                    type="text"
                    className="border border-[#124734] px-3 py-1 rounded focus:outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* TABLE */}
           <TestSeriesFeesTable search={search} />


          </div>
        </div>
      </div>
    </div>
  );
}
