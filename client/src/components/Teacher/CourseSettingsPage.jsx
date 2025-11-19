import { useState } from "react";
import { Upload, Trash2, Archive, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseSettingsPage() {
  const navigate = useNavigate();

  // FORM STATES
  const [title, setTitle] = useState("Course Title");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [language, setLanguage] = useState("English");
  const [thumbnail, setThumbnail] = useState(null);

  const [visibility, setVisibility] = useState("public");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState("");

  const [allowDownloads, setAllowDownloads] = useState(true);
  const [allowSkip, setAllowSkip] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [enableComments, setEnableComments] = useState(true);
  const [enableCertificates, setEnableCertificates] = useState(false);

  // MODAL STATES
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // MOCK SAVE FUNCTION
  const handleSave = () => {
    setShowSaveModal(true);
    setTimeout(() => setShowSaveModal(false), 1800);
  };

  return (
    <div className="pb-10">

      {/* Breadcrumb */}
      <p className="text-sm text-[#5B7065] mb-3">
        <span
          className="hover:text-[#009846] cursor-pointer hover:underline"
          onClick={() => navigate("/teacher-dashboard")}
        >
          Dashboard
        </span>{" "}
        /{" "}
        <span
          className="hover:text-[#009846] cursor-pointer hover:underline"
          onClick={() => navigate("/teacher/courses")}
        >
          Courses
        </span>{" "}
        /{" "}
        <span className="text-[#124734] font-medium">Settings</span>
      </p>

      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-[#124734] mb-6">
        Course Settings
      </h2>

      <div className="space-y-8">

        {/* 1️⃣ Course Details */}
        <div className="bg-white p-6 border border-[#A7E1B2] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#124734] mb-4">
            Course Details
          </h3>

          <input
            className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-3"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-3"
            placeholder="Short Description"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />

          <textarea
            className="w-full border border-[#A7E1B2] px-3 py-2 rounded-md mb-3"
            placeholder="Full Description"
            rows={4}
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
          />

          <label className="cursor-pointer bg-[#009846] text-white px-4 py-2 rounded-md flex items-center gap-2 w-fit mb-4">
            <Upload size={16} />
            Upload Thumbnail
            <input
              type="file"
              hidden
              onChange={(e) =>
                setThumbnail(e.target.files?.[0]?.name || null)
              }
            />
          </label>

          {thumbnail && (
            <p className="text-sm text-[#124734]">📸 {thumbnail}</p>
          )}

          <div className="grid grid-cols-3 gap-4 mt-4">
            <select
              className="border border-[#A7E1B2] px-3 py-2 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Engineering</option>
              <option>Management</option>
              <option>Law</option>
              <option>Medical</option>
            </select>

            <select
              className="border border-[#A7E1B2] px-3 py-2 rounded-md"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <select
              className="border border-[#A7E1B2] px-3 py-2 rounded-md"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>

        {/* 2️⃣ Visibility & Access */}
        <div className="bg-white p-6 border border-[#A7E1B2] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#124734] mb-4">
            Visibility & Access
          </h3>

          <div className="space-y-3">

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="visibility"
                checked={visibility === "public"}
                onChange={() => setVisibility("public")}
              />
              Public Course
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="visibility"
                checked={visibility === "private"}
                onChange={() => setVisibility("private")}
              />
              Private Course
            </label>

            <label className="flex items-center gap-3 pt-3">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={() => setIsPaid(!isPaid)}
              />
              Paid Course
            </label>

            {isPaid && (
              <input
                type="number"
                placeholder="Course Price (INR)"
                className="border border-[#A7E1B2] px-3 py-2 rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* 3️⃣ Instructor Preferences */}
        <div className="bg-white p-6 border border-[#A7E1B2] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#124734] mb-4">
            Instructor Preferences
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allowDownloads}
                onChange={() => setAllowDownloads(!allowDownloads)}
              />
              Allow students to download PDFs
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allowSkip}
                onChange={() => setAllowSkip(!allowSkip)}
              />
              Allow skipping lessons
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={showAnswers}
                onChange={() => setShowAnswers(!showAnswers)}
              />
              Show quiz answers after completion
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={enableComments}
                onChange={() => setEnableComments(!enableComments)}
              />
              Enable comments/discussions
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={enableCertificates}
                onChange={() => setEnableCertificates(!enableCertificates)}
              />
              Enable completion certificates
            </label>
          </div>
        </div>

        {/* 4️⃣ Danger Zone */}
        <div className="bg-white p-6 border border-red-300 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-red-600 mb-3">
            Danger Zone
          </h3>

          <div className="flex items-center justify-between mb-3">
            <p className="text-[#5B7065]">Archive this course</p>
            <button
              className="text-orange-700 hover:underline flex items-center gap-2"
              onClick={() => setShowArchiveModal(true)}
            >
              <Archive size={16} /> Archive Course
            </button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#5B7065]">Delete this course permanently</p>
            <button
              className="text-red-600 hover:underline flex items-center gap-2"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} /> Delete Course
            </button>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="bg-[#124734] text-white px-6 py-3 rounded-md hover:bg-[#0d3a28] w-50"
        >
          Save Changes
        </button>
      </div>

      {/* ─────────────────────────────── */}
      {/*  MODALS BELOW                  */}
      {/* ─────────────────────────────── */}

      {/* 1️⃣ SAVE SUCCESS MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#A7E1B2] text-center">
            <CheckCircle className="text-[#009846] w-12 h-12 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[#124734]">
              Saved Successfully!
            </h3>
            <p className="text-sm text-[#5B7065]">
              Your course settings have been updated.
            </p>
          </div>
        </div>
      )}

      {/* 2️⃣ ARCHIVE CONFIRMATION MODAL */}
      {showArchiveModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center">
            <h3 className="text-xl font-semibold text-[#124734] mb-3">
              Archive Course?
            </h3>
            <p className="text-[#5B7065] mb-5">
              Students won't be able to access the course until restored.
            </p>

            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => setShowArchiveModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-orange-600 text-white rounded-md"
                onClick={() => setShowArchiveModal(false)}
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3️⃣ DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              Delete Course?
            </h3>
            <p className="text-[#5B7065] mb-5">
              This action cannot be undone. All data will be permanently lost.
            </p>

            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={() => setShowDeleteModal(false)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
