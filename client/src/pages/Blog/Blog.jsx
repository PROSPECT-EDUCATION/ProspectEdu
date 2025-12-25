import React from "react";
import blogImg from "../../assets/blog.webp";

const Blog = () => {
  return (
    <>
      <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">

        {/* ---------------- Blog Header ---------------- */}
        <div className="bg-[#1E5631] text-white w-full py-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-8 gap-8">

            <div className="w-full md:w-1/2 pr-0 md:pr-8 text-center md:text-left">
              <p className="text-sm mb-3 text-gray-200">Home &gt; Blog</p>

              <h1 className="font-semibold text-3xl md:text-4xl mb-3 leading-snug">
                Blogs made simple.
              </h1>

              <p className="text-[#B7F399] text-lg font-medium">
                Explore helpful blogs written in a simple way. Stay updated with
                ideas, insights, and useful information from technology, education,
                careers, and many more fields.
              </p>
            </div>

            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                src={blogImg}
                alt="Blog"
                className="w-48 sm:w-56 md:w-[250px] rounded-lg shadow-md"
              />
            </div>

          </div>
        </div>

        {/* ======= Blog List ======= */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* ---------- Blog Card 1 ---------- */}
            <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=60"
                alt="Blog"
                className="w-full h-48 sm:h-52 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">How to Study Smart</h2>
                <p className="text-sm mb-4">
                  Learn simple tricks to study faster and remember more.
                </p>
                <a
                  href={`/blog/${1}`}
                  className="px-4 py-2 bg-[#1E5631] text-white rounded-lg text-sm"
                >
                  Read More
                </a>
              </div>
            </div>

            {/* ---------- Blog Card 2 ---------- */}
            <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1498079022511-d15614cb1c02?auto=format&fit=crop&w=900&q=60"
                alt="Blog"
                className="w-full h-48 sm:h-52 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">Career Tips for Students</h2>
                <p className="text-sm mb-4">
                  Small advice that can help you plan your future better.
                </p>
                <a
                  href={`/blog/${2}`}
                  className="px-4 py-2 bg-[#1E5631] text-white rounded-lg text-sm"
                >
                  Read More
                </a>
              </div>
            </div>

            {/* ---------- Blog Card 3 ---------- */}
            <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=60"
                alt="Blog"
                className="w-full h-48 sm:h-52 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">Tips for Competitive Exams</h2>
                <p className="text-sm mb-4">
                  Simple ways to stay focused and prepare better for exams.
                </p>
                <a
                  href={`/blog/${3}`}
                  className="px-4 py-2 bg-[#1E5631] text-white rounded-lg text-sm"
                >
                  Read More
                </a>
              </div>
            </div>

            {/* ---------- Blog Card 4 ---------- */}
            <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200">
              <img
                src="https://hackslifestyle.com/wp-content/uploads/2024/06/Student-Life-Hacks-1.jpeg.webp"
                alt="Blog"
                className="w-full h-48 sm:h-52 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">Student Life Hacks</h2>
                <p className="text-sm mb-4">
                  Easy hacks to make your daily study life simple.
                </p>
                <a
                  href={`/blog/${4}`}
                  className="px-4 py-2 bg-[#1E5631] text-white rounded-lg text-sm"
                >
                  Read More
                </a>
              </div>
            </div>

          </div>
        </div>

      </section>
    </>
  );
};

export default Blog;
