import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { publicCoursesApi } from "../../services/publicCourses";

export default function PublicCourseDetail() {
  const { slug } = useParams();
  
  console.log("PUBLIC COURSE PAGE LOADED, slug =", slug);
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH COURSE (PUBLIC) =================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await publicCoursesApi.getBySlug(slug);
        console.log("API RESPONSE:", res.data);
        setCourse(res.data.course);
      } catch (e) {
        setError(e?.response?.data?.message || "Course not found");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCourse();
  }, [slug]);
  useEffect(() => {
  console.log("FETCHING COURSE FOR SLUG:", slug);
}, [slug]);

  // ================= PRICE CALCULATION =================
  const cost = useMemo(() => {
    const price = Number(course?.price || 0);
    const tax = Number(course?.tax || 0);
    const discount = Number(course?.discount || 0);

    const discountAmt = (price * discount) / 100;
    const taxAmt = (price * tax) / 100;
    const total = price + taxAmt - discountAmt;

    return { price, tax, discount, discountAmt, taxAmt, total };
  }, [course]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center py-20 text-gray-600">Loading...</p>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <p className="text-center py-20 text-red-500">{error}</p>
        <Footer />
      </>
    );
  }

  if (!course) return null;
const handleBuyNow = () => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    // ❌ Not logged in → go to login
    navigate("/login", {
      state: { from: `/checkout/${course._id}` },
    });
    return;
  }

  // ✅ Logged in → go to checkout
  navigate(`/checkout/${course._id}`);
};

  // ================= UI (MATCHES ADMIN DETAIL) =================
  return (
    <>
      <Navbar />

      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="col-span-1">
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <img
                  src={course.img || "/placeholder-course.png"}
                  alt={course.title}
                  className="w-full h-40 object-contain bg-[#F0F5F2] rounded-t-xl"
                />

                <div className="p-4">
                  <h1 className="text-xl font-semibold text-[#124734]">
                    {course.title}
                  </h1>

                  <p className="text-gray-600 mt-2">
                    {course.short}
                  </p>

                  {/* BUY BUTTON (PUBLIC) */}
                 <button
  onClick={handleBuyNow}
  className="mt-6 w-full bg-[#009846] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#007a3a]"
>
  Buy Now
</button>
                </div>
              </div>

              {/* ABOUT COURSE */}
              <div className="bg-white rounded-xl shadow p-5 mt-6">
                <h2 className="font-semibold text-[#124734] mb-3">
                  About Course
                </h2>

                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <p className="text-gray-500">Professor(s)</p>
<div className="font-medium flex flex-col">
  {course.assignedTeachers?.length
    ? course.assignedTeachers.map((t, i) => (
        <span key={t._id || i}>• {t.fullName}</span>
      ))
    : course.professors?.length
    ? course.professors.map((pro, i) => (
        <span key={i}>• {pro}</span>
      ))
    : "N/A"}
</div>


                  <p className="text-gray-500">Start Date</p>
                  <p className="font-medium">{course.date || "—"}</p>
                </div>

                {/* COST BREAKDOWN */}
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-semibold text-[#124734] mb-2">
                    Cost Breakdown
                  </h3>

                  <table className="w-full text-sm">
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="py-2">Base Price</td>
                        <td className="py-2 text-right font-medium">
                          ₹{cost.price}
                        </td>
                      </tr>

                      {cost.discount > 0 && (
                        <tr>
                          <td className="py-2">Discount</td>
                          <td className="py-2 text-right text-red-600">
                            -₹{cost.discountAmt.toFixed(2)}
                          </td>
                        </tr>
                      )}

                      {cost.tax > 0 && (
                        <tr>
                          <td className="py-2">Tax</td>
                          <td className="py-2 text-right text-yellow-600">
                            +₹{cost.taxAmt.toFixed(2)}
                          </td>
                        </tr>
                      )}

                      <tr className="border-t">
                        <td className="py-3 font-semibold">Total</td>
                        <td className="py-3 font-semibold text-right text-[#124734]">
                          ₹{cost.total.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-2">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold text-[#124734] mb-4">
                  Course Description
                </h2>
                <p className="text-gray-600 mb-4">
                  {course.description}
                </p>

                <h2 className="text-lg font-semibold text-[#124734] mb-4">
                  Course Information
                </h2>
                <p className="text-gray-600">
                  {course.info || course.description}
                </p>

                <div className="mt-6">
                  <h3 className="font-semibold text-[#124734] mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags?.length
                      ? course.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-[#ECF5EE] text-[#124734] rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))
                      : "No tags available"}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
