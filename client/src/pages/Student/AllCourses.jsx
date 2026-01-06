import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentSidebar from "../../components/Student/StudentSidebar";
import StudentTopbar from "../../components/Student/StudentTopbar";
import CourseCard from "../Courses/CourseCard";
import { publicCoursesApi } from "../../services/publicCourses";

export default function AllCourses() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  const [coursesByCategory, setCoursesByCategory] = useState({
    all: [],
    engineering: [],
    management: [],
    law: [],
    medical: [],
  });

  const navigate = useNavigate();
  const sidebarWidthPx = isCollapsed ? 80 : 256;

  // ✅ NOINDEX
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);

    return () => document.head.removeChild(meta);
  }, []);

  // ================= FETCH COURSES =================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const mapToUI = (courses) =>
          courses.map((c) => ({
            _id: c._id,
            slug: c.slug,
            title: c.title,
            image: c.img,
            mode: c.short,
            startDate: c.date,
            price: c.price,
          }));

        const [all, eng, mgmt, law, med] = await Promise.all([
          publicCoursesApi.listAll(),
          publicCoursesApi.listByCategory("engineering"),
          publicCoursesApi.listByCategory("management"),
          publicCoursesApi.listByCategory("law"),
          publicCoursesApi.listByCategory("medical"),
        ]);

        setCoursesByCategory({
          all: mapToUI(all.data.courses || []),
          engineering: mapToUI(eng.data.courses || []),
          management: mapToUI(mgmt.data.courses || []),
          law: mapToUI(law.data.courses || []),
          medical: mapToUI(med.data.courses || []),
        });
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </aside>

      {/* Main */}
      <div
        className="flex flex-col flex-1 h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidthPx,
          width: `calc(100vw - ${sidebarWidthPx}px)`,
        }}
      >
        {/* Topbar */}
        <header
          className="fixed top-0 bg-white shadow-sm z-[999] h-[64px]"
          style={{ left: sidebarWidthPx, right: 0 }}
        >
          <StudentTopbar pageTitle="All Courses" />
        </header>

        {/* Sub-header */}
        <nav
          className="sticky top-[64px] bg-[#F9FAFB] border-b border-[#E6F4EC] px-6 py-3 z-[998]"
        >
          {/* Breadcrumb */}
          <div className="w-full flex flex-col items-start ">
          <p className="text-sm text-[#5B7065] mb-3">
            <span
              onClick={() => navigate("/student-dashboard")}
              className="cursor-pointer hover:text-[#009846] hover:underline"
            >
              Home
            </span>{" "}
            / <span className="text-[#124734] font-medium">All Courses</span>
          </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-[#E6F4EC]">
            {[
              ["all", "All Courses"],
              ["engineering", "Engineering Courses"],
              ["management", "Management Courses"],
              ["law", "Law Courses"],
              ["medical", "Medical Courses"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`pb-2 text-sm font-medium transition ${
                  activeTab === id
                    ? "text-[#009846] border-b-2 border-[#009846]"
                    : "text-[#5B7065]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main
          className="flex-1 overflow-y-auto px-6"
          style={{ marginTop: "80px" }}
        >
          {loading ? (
            <p className="text-center text-[#5B7065] py-10">
              Loading courses...
            </p>
          ) : coursesByCategory[activeTab]?.length === 0 ? (
            <p className="text-center text-[#5B7065] py-10">
              No courses available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesByCategory[activeTab].map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
