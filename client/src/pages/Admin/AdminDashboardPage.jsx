import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import AdminStatsGrid from "../../components/Admin/Dashboard/AdminStatsGrid";
import IncomeExpenseChart from "../../components/Admin/Dashboard/IncomeExpenseChart";
import React, { useState } from "react";
import ProfessorsList from "../../components/Admin/Dashboard/ProfessorsList";
import StudentList from "../../components/Admin/Dashboard/StudentList";
import SalaryStatus from "../../components/Admin/Dashboard/SalaryStatus";

export default function AdminDashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidthPx = isCollapsed ? 80 : 256;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`${isCollapsed ? "w-20" : "w-64"} fixed top-0 left-0 h-full z-40 transition-all duration-300`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* RIGHT SECTION */}
      <div
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`
        }}
      >
        {/* TOPBAR */}
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] z-[999] transition-all duration-300"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <AdminTopbar pageTitle="Dashboard" />
        </div>

        {/* MAIN CONTENT */}
        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">
       <div className="grid grid-cols-1 lg:grid-cols-[320px_320px_1fr] gap-8">

            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <AdminStatsGrid index={0} />
              <AdminStatsGrid index={2} />
            </div>

            {/* Middle Column */}
            <div className="flex flex-col gap-6">
              <AdminStatsGrid index={1} />
              <AdminStatsGrid index={3} />
            </div>

            {/* Right Column (Chart spanning 2 rows) */}
            <div className="md:row-span-2">
              <IncomeExpenseChart />
            </div>

          </div>
                <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 mt-10">
  <ProfessorsList />
  <StudentList />
</div>
<SalaryStatus />

        </div>
  

      </div>
    </div>
  );
}
