// src/pages/Student/Practice.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import RefreshComponent from "../../components/RefreshComponent";

export default function Practice() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  // No practice items yet
  const practiceList = [];

  // ✅ SEO: prevent indexing of private page
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);

    return () => document.head.removeChild(meta);
  }, []);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-full z-40 transition-all duration-300`}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </aside>

      {/* Main Section */}
      <div
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`,
        }}
      >
        {/* Topbar */}
        <header
          className="fixed top-0 z-[999] bg-white shadow-sm h-[64px]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <StudentTopbar isCollapsed={isCollapsed} pageTitle="Practice" />
        </header>

        {/* Breadcrumb Bar */}
        <nav
          className="sticky top-[64px] bg-[#F9FAFB] z-[998] border-b border-[#E6F4EC] py-3 px-6"
          style={{ left: sidebarWidthPx }}
          aria-label="Practice breadcrumb"
        >
          <div className="w-full flex flex-col items-start">
            <p className="text-sm text-[#5B7065] mb-3">
              <span
                className="hover:underline hover:text-[#009846] cursor-pointer transition"
                onClick={() => navigate("/student-dashboard")}
              >
                Home
              </span>{" "}
              /{" "}
              <span className="text-[#124734] font-medium">
                Practice
              </span>
            </p>
          </div>
        </nav>

        {/* Page Body */}
        <main
          className="flex-1 overflow-y-auto px-4 md:px-6 py-8"
          style={{ marginTop: "128px", height: "calc(100vh - 128px)" }}
          aria-labelledby="practice-heading"
        >
          {/* Hidden semantic heading */}
          <h1 id="practice-heading" className="sr-only">
            Student Practice Sets
          </h1>

          <div className="w-full max-w-6xl mx-auto">
            {practiceList.length === 0 ? (
              <RefreshComponent message="No practice sets available." />
            ) : (
              <div>{/* Practice cards will go here */}</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
