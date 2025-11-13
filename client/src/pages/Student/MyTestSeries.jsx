// src/pages/Student/MyTestSeries.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import RefreshComponent from "../../components/RefreshComponent";

export default function MyTestSeries() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [mode, setMode] = useState("online"); // online | offline
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  const testSeries = [];
  const filteredList = testSeries; // placeholder

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-full z-40 transition-all duration-300`}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`,
        }}
      >
        {/* Topbar */}
        <div
          className="fixed top-0 z-[999] bg-white shadow-sm h-[64px]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="My Test Series" />
        </div>

        {/* Sub-header (breadcrumb + tabs + toggle) */}
        <div
          className="sticky top-[64px] z-[998] bg-[#F9FAFB] border-b border-[#E6F4EC] py-3 px-6"
          style={{ left: sidebarWidthPx }}
        >
          <div className="w-full flex items-center justify-between">
            {/* Left Side - Breadcrumb + Tabs */}
            <div className="flex flex-col items-start">
              <p className="text-sm text-[#5B7065] mb-3">
                <span
                  className="hover:underline hover:text-[#009846] cursor-pointer"
                  onClick={() => navigate("/student-dashboard")}
                >
                  Home
                </span>{" "}
                / Test Series /{" "}
                <span className="text-[#124734] font-medium">All Test Series</span>
              </p>

              {/* Single tab like screenshot */}
              <div className="flex gap-6 border-b border-[#E6F4EC]">
                <button
                  className={`pb-2 text-sm font-medium ${
                    activeTab === "all"
                      ? "text-[#009846] border-b-2 border-[#009846]"
                      : "text-[#5B7065]"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Test Series
                </button>
              </div>
            </div>

            {/* Right Side - Online | Offline Toggle */}
            {/* Right Side - Online | Offline Toggle (Green Theme) */}
<div className="flex items-center bg-[#E6F4EC] rounded-full border border-[#CDE8D5] overflow-hidden">
  <button
    onClick={() => setMode("online")}
    className={`px-5 py-1.5 text-sm font-medium transition-all ${
      mode === "online"
        ? "bg-[#009846] text-white"
        : "text-[#124734] hover:bg-[#DFF3E6]"
    }`}
  >
    Online
  </button>

  <button
    onClick={() => setMode("offline")}
    className={`px-5 py-1.5 text-sm font-medium transition-all ${
      mode === "offline"
        ? "bg-[#009846] text-white"
        : "text-[#124734] hover:bg-[#DFF3E6]"
    }`}
  >
    Offline
  </button>
</div>

          </div>
        </div>

        {/* Body */}
        <main
          className="flex-1 overflow-y-auto px-4 md:px-6 py-8"
          style={{ marginTop: "128px", height: "calc(100vh - 128px)" }}
        >
          <div className="max-w-6xl mx-auto w-full">
            {filteredList.length === 0 ? (
              <RefreshComponent message="You haven't purchased any test series!" />
            ) : (
              <div>{/* Test series cards will go here later */}</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
