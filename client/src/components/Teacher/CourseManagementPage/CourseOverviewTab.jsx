// src/components/Teacher/CourseManagement/CourseOverviewTab.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit3, Play, Layers, CheckCircle } from "lucide-react";

export default function CourseOverviewTab() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // courseId is an index (string). If your app stores an id, adapt accordingly.
    const all = JSON.parse(localStorage.getItem("teacherCourses") || "[]");
    const idx = parseInt(courseId, 10);

    // defensive
    if (!all || all.length === 0) {
      setCourse(null);
      return;
    }

    // If courseId is numeric index
    const found =
      Number.isInteger(idx) && idx >= 0 && idx < all.length ? all[idx] : null;

    // If you stored a real id inside object, uncomment this block
    // const found = all.find(c => c.id === courseId) || null;

    setCourse(found);
  }, [courseId]);

  if (!course) {
    return (
      <div className="bg-white p-6 rounded-xl border border-[#E6F4EC] shadow-sm">
        <p className="text-[#124734]">Course not found. Make sure it is published or exists.</p>
      </div>
    );
  }

  // Basic aggregations
  const modulesCount = (course.modules || []).length;
  const studentsCount = course.students || course.studentsCount || 0;

  // estimate completion: if you store progress, adapt logic. Fallback to 0
  const completion = course.completion || 0;

  const handleEdit = () => {
    // navigate to edit/create page where you can prefill basic form
    // we'll navigate to Create Course with state for editing
    navigate("/teacher/create-course", { state: { courseToEdit: course, courseIndex: courseId } });
  };

  const handleManageModules = () => {
    navigate("/teacher/course/" + courseId + "?tab=modules");
  };

  const togglePublish = () => {
    const all = JSON.parse(localStorage.getItem("teacherCourses") || "[]");
    const idx = parseInt(courseId, 10);
    if (!Number.isInteger(idx) || !all[idx]) return;
    all[idx].settings = all[idx].settings || {};
    all[idx].settings.live = !all[idx].settings.live;
    localStorage.setItem("teacherCourses", JSON.stringify(all));
    setCourse(all[idx]);
  };

  return (
    <div className="space-y-6">

      {/* Header card */}
      <div className="bg-white rounded-xl border border-[#E6F4EC] shadow-sm px-6 py-6 flex gap-6 items-start">
        <div className="w-48 h-32 rounded-md overflow-hidden bg-[#F2FBF6] flex items-center justify-center">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-contain" />
          ) : (
            <div className="text-[#124734]">No Image</div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-[#124734]">{course.title}</h1>
          <p className="text-sm text-[#5B7065] mt-1">{course.category} • {course.level} • {course.duration} hrs</p>

          <p className="text-sm text-[#5B7065] mt-3 max-w-3xl">{course.description}</p>

          <div className="flex gap-4 mt-4 items-center">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#A7E1B2] text-[#124734] hover:bg-[#8ccf9a]"
            >
              <Edit3 size={16} /> Edit Course
            </button>

            <button
              onClick={handleManageModules}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-[#A7E1B2] text-[#124734] hover:bg-[#F2FBF6]"
            >
              <Layers size={16} /> Manage Modules
            </button>

            <button
              onClick={togglePublish}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${course.settings?.live ? "bg-[#009846] text-white hover:bg-[#007a39]" : "bg-white border border-[#A7E1B2] text-[#124734]"}`}
            >
              <CheckCircle size={16} />
              {course.settings?.live ? "Published" : "Publish"}
            </button>
          </div>
        </div>

        {/* right metrics */}
        <div className="w-48 flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-sm text-[#5B7065]">Students</p>
            <p className="text-2xl font-semibold text-[#124734]">{studentsCount}</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-[#5B7065]">Modules</p>
            <p className="text-2xl font-semibold text-[#124734]">{modulesCount}</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-[#5B7065]">Completion</p>
            <p className="text-2xl font-semibold text-[#124734]">{completion}%</p>
          </div>
        </div>
      </div>

      {/* Quick analytics / CTA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl border border-[#E6F4EC]">
          <p className="text-sm text-[#5B7065]">Recent Activity</p>
          <ul className="mt-3 space-y-2 text-sm text-[#124734]">
            <li>{course.recentActivity?.[0] || "No recent activity"}</li>
            <li>{course.recentActivity?.[1]}</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E6F4EC]">
          <p className="text-sm text-[#5B7065]">Quick Actions</p>
          <div className="mt-3 flex flex-col gap-2">
            <button onClick={() => navigate(`/teacher/course/${courseId}?tab=modules`)} className="text-left px-3 py-2 rounded-md border border-[#A7E1B2] hover:bg-[#F2FBF6]">Add Lecture / Content</button>
            <button onClick={() => navigate(`/teacher/course/${courseId}?tab=assessments`)} className="text-left px-3 py-2 rounded-md border border-[#A7E1B2] hover:bg-[#F2FBF6]">Create Assignment / Quiz</button>
            <button onClick={() => navigate(`/teacher/course/${courseId}?tab=students`)} className="text-left px-3 py-2 rounded-md border border-[#A7E1B2] hover:bg-[#F2FBF6]">View Students</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E6F4EC]">
          <p className="text-sm text-[#5B7065]">Course Links</p>
          <div className="mt-3 flex flex-col gap-2">
            <a className="text-sm text-[#009846] hover:underline" href={`/course/${courseId}`} target="_blank" rel="noreferrer">View Public Course</a>
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="text-sm text-[#5B7065]">Copy Management Link</button>
          </div>
        </div>
      </div>

    </div>
  );
}
