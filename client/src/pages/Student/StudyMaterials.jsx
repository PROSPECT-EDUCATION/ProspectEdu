import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";

export default function StudyMaterials() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const sidebarWidthPx = isCollapsed ? 80 : 256;

  // 🔒 Prevent indexing (private page)
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);

    return () => document.head.removeChild(meta);
  }, []);

  const studyMaterials = [
    { title: "NCERT Biology Class 11 – Chapter 1 Notes", category: "Biology" },
    { title: "NCERT Chemistry Class 12 – Organic Chemistry Summary", category: "Chemistry" },
    { title: "Physics Wallah Handwritten Notes – Motion in a Plane", category: "Physics" },
    { title: "KGS Institute – Polity Complete Notes PDF", category: "Polity" },
    { title: "Geography Module – Indian Climate Overview", category: "Geography" },
  ];

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } fixed top-0 left-0 h-full z-40 transition-all duration-300`}
        aria-label="Student navigation sidebar"
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
          marginLeft: isCollapsed ? 80 : 256,
          width: `calc(100vw - ${isCollapsed ? 80 : 256}px)`,
        }}
      >
        {/* Topbar */}
        <header
          className="fixed top-0 z-[999] bg-white shadow-sm h-[64px]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <StudentTopbar pageTitle="Study Materials" />
        </header>

        {/* Breadcrumb + Tabs */}
        <div
          className="sticky top-[64px] bg-[#F9FAFB] z-[998] border-b border-[#E6F4EC] px-6 py-3"
          style={{ left: sidebarWidthPx }}
        >
          <div className="w-full flex flex-col items-start">
            <p className="text-sm text-[#5B7065] mb-3">
              <span
                className="hover:underline hover:text-[#009846] cursor-pointer"
                onClick={() => navigate("/student-dashboard")}
              >
                Home
              </span>{" "}
              / Study Materials /{" "}
              <span className="text-[#124734] font-medium">All Notes</span>
            </p>

            <div className="flex gap-6 border-b border-[#E6F4EC]">
              {["all", "pdf", "handwritten"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-medium ${
                    activeTab === tab
                      ? "text-[#009846] border-b-2 border-[#009846]"
                      : "text-[#5B7065]"
                  }`}
                >
                  {tab === "all"
                    ? "All Notes"
                    : tab === "pdf"
                    ? "PDFs"
                    : "Handwritten Notes"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page Body */}
        <main
          className="flex-1 overflow-y-auto px-4 md:px-6 py-8"
          style={{ marginTop: "80px", height: "calc(100vh - 128px)" }}
          aria-labelledby="study-materials-heading"
        >
          {/* Hidden semantic heading */}
          <h1 id="study-materials-heading" className="sr-only">
            Student Study Materials
          </h1>

          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyMaterials.map((item, index) => (
              <article
                key={index}
                className="bg-white border border-[#E6F4EC] rounded-lg p-5 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <h3 className="text-[#124734] font-semibold text-md mb-2">
                  {item.title}
                </h3>
                <p className="text-[#5B7065] text-sm mb-4">
                  {item.category}
                </p>

                <button className="px-4 py-2 bg-[#009846] text-white text-sm rounded-md hover:bg-[#007a36] transition">
                  View / Download
                </button>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
