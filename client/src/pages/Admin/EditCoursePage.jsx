import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminTopbar from "../../components/Admin/Layout/AdminTopbar";
import { useToast } from "../../context/ToastContext";
import { coursesApi } from "../../services/courses"; // ✅ adjust path if needed

export default function EditCoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [short, setShort] = useState("");
  const [info, setInfo] = useState("");
  const [description, setDescription] = useState("");
  const [professors, setProfessors] = useState([""]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const [img, setImg] = useState("");

  // ✅ Fetch course from backend
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await coursesApi.adminGet(courseId);
        const course = res.data.course;

        setTitle(course.title || "");
        setCategory(course.category || "");
        setShort(course.short || "");
        setInfo(course.info || "");
        setDescription(course.description || "");
        setProfessors(course.professors?.length ? course.professors : [""]);
        setPrice(course.price ?? "");
        setDiscount(course.discount ?? "");
        setTax(course.tax ?? "");
        setDate(course.date || "");
        setTags(course.tags || []);
        setImg(course.img || "");
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  // Tags
  const handleAddTag = () => setShowTagInput(true);

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Professors
  const handleAddProfessor = () => setProfessors([...professors, ""]);

  const handleProfessorChange = (index, value) => {
    const updated = [...professors];
    updated[index] = value;
    setProfessors(updated);
  };

  // ✅ Submit -> PATCH backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        title,
        category,
        short,
        info,
        description,
        professors: professors.map((p) => p.trim()).filter(Boolean),
        price: Number(price || 0),
        discount: Number(discount || 0),
        tax: Number(tax || 0),
        date,
        tags,
        img,
      };

      await coursesApi.adminUpdate(courseId, payload);

      showToast("Course updated successfully!", "success");
      navigate(`/admin/courses/${courseId}`); // go back to detail page
    } catch (e) {
      showToast(e?.response?.data?.message || "Failed to update course", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content Area */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
        }}
      >
        <div
          className="fixed top-0 bg-white shadow-sm h-[64px] flex items-center z-[999]"
          style={{ left: sidebarWidth, right: 0 }}
        >
          <AdminTopbar pageTitle="Edit Course" />
        </div>

        {/* Page Content */}
        <div className="px-6 pt-[90px] pb-10 overflow-y-auto">
          <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold text-[#124734] mb-6">
              Edit Course Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* (your UI inputs stay EXACTLY the same) */}

              {/* Title */}
              <div>
                <label className="font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Category */}
              <div>
                <label className="font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Short */}
              <div>
                <label className="font-medium text-gray-700">Short Description</label>
                <input
                  type="text"
                  value={short}
                  onChange={(e) => setShort(e.target.value)}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Info */}
              <div>
                <label className="font-medium text-gray-700">Course Information</label>
                <textarea
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  rows="5"
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-medium text-gray-700">Course Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Professors */}
              <div>
                <label className="font-medium text-gray-700">Professors</label>
                {professors.map((pro, index) => (
                  <input
                    key={index}
                    type="text"
                    value={pro}
                    onChange={(e) => handleProfessorChange(index, e.target.value)}
                    className="w-full mt-2 p-2 border rounded"
                  />
                ))}
                <button
                  type="button"
                  onClick={handleAddProfessor}
                  className="mt-2 text-sm text-[#124734] underline"
                >
                  + Add another professor
                </button>
              </div>

              {/* Price */}
              <div>
                <label className="font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Discount */}
              <div>
                <label className="font-medium text-gray-700">Discount (%)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Tax */}
              <div>
                <label className="font-medium text-gray-700">Tax (%)</label>
                <input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(Number(e.target.value))}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Date */}
              <div>
                <label className="font-medium text-gray-700">Course Start Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="font-medium text-gray-700">Tags</label>

                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#ECF5EE] text-[#124734] rounded-full text-xs cursor-pointer"
                      onClick={() => handleRemoveTag(i)}
                    >
                      {tag} ✕
                    </span>
                  ))}
                </div>

                {showTagInput ? (
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyPress}
                    placeholder="Type tag & press Enter"
                    className="mt-2 p-2 border rounded w-full"
                    autoFocus
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="mt-2 text-sm text-[#124734] underline"
                  >
                    + Add Tag
                  </button>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="font-medium text-gray-700">Course Image URL</label>
                <input
                  type="text"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#124734] text-white px-6 py-2 rounded-md hover:bg-[#0E3A2B] disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
