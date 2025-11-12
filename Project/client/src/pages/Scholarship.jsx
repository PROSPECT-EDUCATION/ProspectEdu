import React, { useState } from "react";
import scholarshipImg from "../assets/Scholarship.jpg";
import scholarshipPool from "../assets/scholarshipPool.png";

const Scholarship = () => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    parent: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Your enrollment form has been submitted successfully!");
    setFormData({
      name: "",
      parent: "",
      email: "",
      phone: "",
      course: "",
    });
  };

  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">
      {/* ---------------- Header ---------------- */}
      <div className="bg-[#1E5631] text-white w-full py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8">
          <div className="w-full md:w-1/2 pr-8">
            <p className="text-sm mb-3 text-gray-200">Home &gt; Scholarship</p>
            <h1 className="font-semibold text-4xl mb-3 leading-snug">
              Unlock your potential with Scholarships.
            </h1>
            <p className="text-[#B7F399] text-lg font-medium">
              Discover opportunities to support your education with merit-based,
              need-based, and special category scholarships. Stay updated with
              latest announcements and eligibility criteria from top institutions
              and organizations.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-end mt-8 md:mt-0">
            <img
              src={scholarshipImg}
              alt="Scholarship Illustration"
              className="w-[250px] md:w-[350px] rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* ---------------- Scholarship Description ---------------- */}
      <div className="bg-[#F9FAFB] py-16 px-8">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#124734] mb-8">
            Scholarships, cash rewards & more!
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-blue-700 text-2xl">⚡</div>
              <p className="text-gray-700 text-lg">
                Gives an early start to <strong>professional students</strong> aiming to
                build their future careers.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-blue-700 text-2xl">🏅</div>
              <p className="text-gray-700 text-lg">
                Nurtures young talent with <strong>scholarships, cash rewards & more.</strong>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-blue-700 text-2xl">⏰</div>
              <p className="text-gray-700 text-lg">
                Includes a <strong>2-hour online evaluation</strong> (in English) designed
                to help students test their skills effectively.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Scholarship Offer Image ---------------- */}
      <div className="flex justify-center my-10 px-50">
        <img
          src={scholarshipPool}
          alt="Scholarship Offer"
          className="w-full max-w-xl rounded-xl shadow-md transform transition duration-500 hover:scale-105 hover:shadow-2xl"
        />
      </div>

      {/* ---------------- Result Status Section ---------------- */}
      
      <div className="bg-white py-10 px-6 text-center rounded-xl shadow-md max-w-3xl mx-auto border border-gray-200">
        <h2 className="text-2xl font-semibold text-[#124734] mb-4 flex items-center justify-center gap-2">
          Scholarship Results
          
          {true && (
            <span className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded-full animate-pulse">
              🔴 LIVE
            </span>
          )}
        </h2>

        {true ? (
          <div>
            <p className="text-green-700 font-medium mb-3">
              🎉 Results are Live! Click below to download.
            </p>
            <a
              href="/results/ScholarshipResult.pdf"
              download
              className="bg-[#1E5631] text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              📄 Download Result PDF
            </a>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 text-lg font-medium mb-2">
              ⏳ Results will be out soon!
            </p>
            <p className="text-sm text-gray-500">Stay tuned for updates.</p>
          </div>
        )}
      </div>

      {/* ---------------- Unique Benefits Section ---------------- */}
      <div className="bg-[#F9FAFB] py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#124734] mb-12">
            Unique Benefits of the Scholarship Exam
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1724/1724611.png"
                alt="Rank Icon"
                className="w-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-[#1E5631] mb-2">
                National Rank & Performance Report
              </h3>
              <p className="text-gray-600">
                Get an India-wide rank with detailed subject-wise analysis to
                understand your strengths and improve your weak areas.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
                alt="Certificate Icon"
                className="w-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-[#1E5631] mb-2">
                Scholarship Eligibility Certificate
              </h3>
              <p className="text-gray-600">
                Earn an official certificate that boosts your profile and helps you
                apply for various national and institutional scholarships.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3343/3343974.png"
                alt="Mentorship Icon"
                className="w-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-[#1E5631] mb-2">
                Expert Mentorship Sessions
              </h3>
              <p className="text-gray-600">
                Top performers will be invited to attend special mentorship and
                career guidance sessions with experienced faculty.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712029.png"
                alt="Growth Icon"
                className="w-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-[#1E5631] mb-2">
                Early Career Advantage
              </h3>
              <p className="text-gray-600">
                Build your academic confidence early and gain a competitive edge for
                future entrance exams and opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------- Frequently Asked Questions Section ---------------- */}
<div className="bg-[#F9FAFB] py-16 px-8">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-[#124734] mb-10 text-center">
      Frequently Asked Questions
    </h2>

    {/* FAQ Items */}
    <div className="space-y-4">
      {/* FAQ 1 */}
      <details className="bg-white p-6 rounded-lg shadow-md open:shadow-lg transition">
        <summary className="text-lg font-semibold cursor-pointer text-[#1E5631]">
          How many times can I take the Scholarship Test?
        </summary>
        <p className="text-gray-600 mt-3">
          You can attempt the test only once in an academic year. However, if you
          register but do not appear, you can re-register immediately for the
          next available slot.
        </p>
      </details>

      {/* FAQ 2 */}
      <details className="bg-white p-6 rounded-lg shadow-md open:shadow-lg transition">
        <summary className="text-lg font-semibold cursor-pointer text-[#1E5631]">
          What is the pattern of the Scholarship Test?
        </summary>
        <p className="text-gray-600 mt-3">
          The test consists of multiple-choice questions from logical reasoning,
          aptitude, and general academics. The total duration is 2 hours.
        </p>
      </details>

      {/* FAQ 3 */}
      <details className="bg-white p-6 rounded-lg shadow-md open:shadow-lg transition">
        <summary className="text-lg font-semibold cursor-pointer text-[#1E5631]">
          Who can appear for the Scholarship Test?
        </summary>
        <p className="text-gray-600 mt-3">
          Any student currently enrolled in a recognized college or school can
          apply for the test. The test is open for both freshers and ongoing
          students.
        </p>
      </details>

      {/* FAQ 4 */}
      <details className="bg-white p-6 rounded-lg shadow-md open:shadow-lg transition">
        <summary className="text-lg font-semibold cursor-pointer text-[#1E5631]">
          What is the test-taking process?
        </summary>
        <p className="text-gray-600 mt-3">
          The test will be conducted online. Students will receive login details
          via email before the exam. Make sure your camera and internet connection
          are stable during the test.
        </p>
      </details>

      {/* FAQ 5 */}
      <details className="bg-white p-6 rounded-lg shadow-md open:shadow-lg transition">
        <summary className="text-lg font-semibold cursor-pointer text-[#1E5631]">
          When will the scholarship results be announced?
        </summary>
        <p className="text-gray-600 mt-3">
          Results will be announced within 7–10 days after the test on the
          official website. You’ll also receive an email notification when they
          are live.
        </p>
      </details>
    </div>
  </div>
</div>


      {/* ---------------- Enroll Now Form Section ---------------- */}
      <div className="bg-white py-16 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#124734] mb-10 text-center">
            Register Now!
          </h2>

          <form
            onSubmit={handleSubmit}
            className={`p-8 rounded-xl shadow-md space-y-6 transition-all duration-500 ${
              formData.name &&
              formData.parent &&
              formData.email &&
              formData.phone &&
              formData.course
                ? "bg-[#A7E1B2]"
                : "bg-[#F9FAFB]"
            }`}
          >
            <div>
              <label className="block text-[#124734] font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
              />
            </div>

            <div>
              <label className="block text-[#124734] font-medium mb-2">
                Parent's Name
              </label>
              <input
                type="text"
                name="parent"
                value={formData.parent}
                onChange={handleChange}
                placeholder="Enter your parent’s name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
              />
            </div>

            <div>
              <label className="block text-[#124734] font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
              />
            </div>

            <div>
              <label className="block text-[#124734] font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
              />
            </div>

            <div>
              <label className="block text-[#124734] font-medium mb-2">
                Select Course
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
              >
                <option value="">-- Choose a course --</option>
                <option value="IT">Information Technology</option>
                <option value="electrical">Electrical Engineering</option>
                <option value="civil">Civil Engineering</option>
                <option value="law">Law</option>
                <option value="management">Management</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#1E5631] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                 Submit Enrollment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Scholarship;
