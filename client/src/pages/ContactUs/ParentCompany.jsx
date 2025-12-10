import React from "react";
import parentImg from "../../assets/ParentCompany.png";

const ParentCompany = () => {
  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">

      {/* ================= Header ================= */}
      <div className="bg-[#1E5631] text-white w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-8 gap-8">

          {/* Left Text */}
          <div className="w-full md:w-1/2 pr-0 md:pr-10 text-center md:text-left">
            <p className="text-sm mb-3 text-gray-200">
              Home &gt; Parent Company
            </p>

            <h1 className="font-semibold text-3xl md:text-4xl mb-3 leading-snug">
              Prospect Education — Our Parent Company
            </h1>

            <p className="text-[#B7F399] text-lg font-medium">
              Prospect Education is the parent organization that manages,
              guides, and supports all our learning platforms. With a strong
              vision to make education simple and accessible, it empowers
              students, institutes, and educators through technology, research,
              and innovation.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={parentImg}
              alt="Parent Company"
              className="w-48 sm:w-60 md:w-[260px] rounded-xl shadow-md"
            />
          </div>

        </div>
      </div>

      {/* ================= Content Section ================= */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="bg-[#A7E1B2] p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl">
          
          <h2 className="text-2xl sm:text-3xl font-bold text-[#124734] mb-4">
            About Services
          </h2>
          
          <div className="h-[4px] w-32 sm:w-40 bg-[#124734] mb-6 sm:mb-8"></div>

          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-[#124734]">
            Prospect Education is the foundation and main umbrella company that
            powers several educational services across India. It aims to make
            learning smooth, modern, and student-friendly. With a team of
            skilled educators, developers, and academic experts, the company
            works continuously to deliver reliable resources for students of
            engineering, law, medical, and competitive exam backgrounds.
            <br /><br />
            It focuses on blending technology with education. Through research,
            digital tools, modern learning platforms, test series, guides, and
            training programs, Prospect Education ensures that every student
            receives high-quality, accessible, and affordable learning support.
            <br /><br />
            The company also works closely with schools, colleges, and training
            institutes to help them grow digitally by offering website
            solutions, academic content, management software, and more. With a
            clear vision of transforming the education system, Prospect
            Education continues to build new projects that help students learn
            better and faster.
          </p>

        </div>
      </div>

    </section>
  );
};

export default ParentCompany;
