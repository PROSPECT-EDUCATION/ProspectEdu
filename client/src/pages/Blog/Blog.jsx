import React, { useEffect, useState } from "react";
import blogImg from "../../assets/blog.webp";
import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { fetchPublicBlogs } from "../../lib/blogApi";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPublicBlogs();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />

      <HeaderSection
        page="Blog"
        title="Blogs made simple."
        subtitle="Explore helpful blogs written in a simple way. Stay updated with
        ideas, insights, and useful information from technology, education,
        careers, and many more fields."
        image={blogImg}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {loading ? (
          <p className="text-center text-gray-600">Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {blogs.map((blog) => (
              <div key={blog.slug} className="shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-white">
                <img
                  src={blog.coverUrl || blogImg}
                  alt={blog.title}
                  className="w-full h-48 sm:h-52 object-contain bg-[#F9FAFB]"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-sm mb-4">{blog.subtitle}</p>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-block px-4 py-2 bg-[#1E5631] text-white rounded-lg text-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </section>
  );
};

export default Blog;
