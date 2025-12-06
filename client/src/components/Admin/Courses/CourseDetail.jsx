import React, { useState } from "react";
import courses from "../../../data/courses";
import { useToast } from "../../../context/ToastContext";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { useNavigate } from "react-router-dom";

export default function CourseDetail({ slug }) {
  const course = courses.find((c) => c.slug === slug);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);

  if (!course) {
    return <p className="text-red-500">Course not found.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT SIDE — IMAGE + BASIC INFO */}
      <div className="col-span-1">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <img
            src={course.img}
            alt={course.title}
            className="w-full h-40 object-contain bg-[#F0F5F2] rounded-t-xl"
          />

          <div className="p-4">
            <h1 className="text-xl font-semibold text-[#124734]">
              {course.title}
            </h1>

            <p className="text-gray-600 mt-2">{course.short}</p>

            {/* Admin Actions */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate(`/admin/course-edit/${slug}`)}
                className="bg-[#124734] text-white px-4 py-2 rounded-md hover:bg-[#0E3A2B]"
              >
                Edit Course
              </button>

              <button
                onClick={() => setOpenDelete(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>

        {/* About Course Box */}
        <div className="bg-white rounded-xl shadow p-5 mt-6">
          <h2 className="font-semibold text-[#124734] mb-3">About Course</h2>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <p className="text-gray-500">Duration</p>
            <p className="font-medium">{course.duration || "3 Years"}</p>

            {/* UPDATED: MULTIPLE PROFESSORS */}
            <p className="text-gray-500">Professor(s)</p>
            <div className="font-medium flex flex-col">
              {course.professors?.length
                ? course.professors.map((pro, i) => (
                    <span key={i} className="leading-tight">• {pro}</span>
                  ))
                : "N/A"}
            </div>

            <p className="text-gray-500">Price</p>
            <p className="font-medium">₹{course.price || "1500"}</p>

            <p className="text-gray-500">Date</p>
            <p className="font-medium">{course.date || "07 August 2021"}</p>
          </div>

          {/* COST BREAKDOWN */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-[#124734] mb-2">Cost Breakdown</h3>

            <table className="w-full text-sm">
              <tbody className="text-gray-700">

                {/* Base Price */}
                <tr>
                  <td className="py-2">Base Price</td>
                  <td className="py-2 font-medium text-right">
                    ₹{course.price?.toLocaleString() || "1500"}
                  </td>
                </tr>

                {/* Discount */}
                {course.discount && (
                  <tr>
                    <td className="py-2">Discount ({course.discount}%)</td>
                    <td className="py-2 font-medium text-red-600 text-right">
                      -₹{((course.price * course.discount) / 100).toFixed(2)}
                    </td>
                  </tr>
                )}

                {/* Tax */}
                {course.tax && (
                  <tr>
                    <td className="py-2">Tax ({course.tax}%)</td>
                    <td className="py-2 font-medium text-yellow-600 text-right">
                      +₹{((course.price * course.tax) / 100).toFixed(2)}
                    </td>
                  </tr>
                )}

                {/* FINAL PRICE */}
                <tr className="border-t">
                  <td className="py-3 font-semibold">Total Cost</td>
                  <td className="py-3 font-semibold text-[#124734] text-right">
                    ₹{(
                      course.price +
                      (course.tax ? (course.price * course.tax) / 100 : 0) -
                      (course.discount ? (course.price * course.discount) / 100 : 0)
                    ).toFixed(2)}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — FULL COURSE INFORMATION */}
      <div className="col-span-2">
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-[#124734] mb-4">
            Course Description
          </h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
          <h2 className="text-lg font-semibold text-[#124734] mb-4">
            Course Information
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            {course.info || course.description}
          </p>

          {/* Tags Section */}
          <div className="mt-6">
            <h3 className="font-semibold text-[#124734] mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#ECF5EE] text-[#124734] rounded-full text-xs"
                >
                  {tag}
                </span>
              )) || "No tags available"}
            </div>
          </div>

          {/* Languages */}
          <div className="mt-6">
            <h3 className="font-semibold text-[#124734] mb-2">Languages</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[#ECF5EE] text-[#124734] rounded-full text-xs">
                English
              </span>
              <span className="px-3 py-1 bg-[#ECF5EE] text-[#124734] rounded-full text-xs">
                French
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION */}
      <ConfirmDialog
        open={openDelete}
        title="Delete Course?"
        message="Are you sure you want to delete this course? This action cannot be undone."
        onConfirm={() => {
          showToast("Course deleted successfully!", "success");
          navigate("/admin/courses");
        }}
        onCancel={() => setOpenDelete(false)}
      />

    </div>
  );
}
