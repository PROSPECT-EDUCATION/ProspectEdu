import { useState } from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseBasicForm({ initialData = {}, onSubmit }) {
  const navigate = useNavigate();

  const [thumbnailPreview, setThumbnailPreview] = useState(
    initialData.thumbnailPreview || null
  );

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    category: initialData.category || "",
    description: initialData.description || "",
    level: initialData.level || "",
    duration: initialData.duration || "",
    language: initialData.language || "",
    thumbnail: initialData.thumbnail || null,
  });

  // Update fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // remove error on typing
  };

  // Thumbnail upload
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      setThumbnailPreview(URL.createObjectURL(file));
      setErrors({ ...errors, thumbnail: "" });
    }
  };

  // Validation before going to next step
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Course title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.level) newErrors.level = "Course level is required";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.thumbnail) newErrors.thumbnail = "Thumbnail is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = () => {
    if (validateForm()) {
      // Send data to parent
      onSubmit(formData);

      // Navigate WITH DATA
      navigate("/teacher/add-modules", {
        state: { courseData: formData },
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E6F4EC] shadow-sm p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* COURSE TITLE */}
        <div>
          <label className="block text-[#124734] font-medium mb-1">
            Course Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter course title"
            className={`w-full border rounded-md px-4 py-2 ${
              errors.title ? "border-red-500" : "border-[#A7E1B2]"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-[#124734] font-medium mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full border rounded-md px-4 py-2 ${
              errors.category ? "border-red-500" : "border-[#A7E1B2]"
            }`}
          >
            <option value="">Select category</option>
            <option>Information Technology</option>
            <option>Management</option>
            <option>Law</option>
            <option>General</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* DURATION */}
        <div>
          <label className="block text-[#124734] font-medium mb-1">
            Duration (hours) *
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={`w-full border rounded-md px-4 py-2 ${
              errors.duration ? "border-red-500" : "border-[#A7E1B2]"
            }`}
            placeholder="e.g. 40"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
          )}
        </div>

        {/* LEVEL */}
        <div>
          <label className="block text-[#124734] font-medium mb-1">
            Level *
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={`w-full border rounded-md px-4 py-2 ${
              errors.level ? "border-red-500" : "border-[#A7E1B2]"
            }`}
          >
            <option value="">Select level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">{errors.level}</p>
          )}
        </div>

        {/* LANGUAGE */}
        <div>
          <label className="block text-[#124734] font-medium mb-1">
            Language
          </label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full border border-[#A7E1B2] rounded-md px-4 py-2"
            placeholder="e.g. English, Hindi"
          />
        </div>

        {/* THUMBNAIL */}
        <div>
          <label className="block text-[#124734] font-medium mb-2">
            Thumbnail *
          </label>
          <div
            className={`border p-4 rounded-md cursor-pointer ${
              errors.thumbnail ? "border-red-500" : "border-[#A7E1B2]"
            }`}
          >
            <label className="flex flex-col items-center cursor-pointer">
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  className="h-32 w-full rounded-md object-cover mb-2"
                />
              ) : (
                <Upload className="text-[#124734] mb-2" size={32} />
              )}

              <span className="text-[#124734] text-sm">
                {thumbnailPreview ? "Change Thumbnail" : "Upload Thumbnail"}
              </span>

              <input
                type="file"
                onChange={handleThumbnail}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <label className="block text-[#124734] font-medium mb-1">
          Course Description *
        </label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className={`w-full border rounded-md px-4 py-2 ${
            errors.description ? "border-red-500" : "border-[#A7E1B2]"
          }`}
          placeholder="Write a brief description..."
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-[#009846] text-white px-6 py-2 rounded-md hover:bg-[#0b7c3f]"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
