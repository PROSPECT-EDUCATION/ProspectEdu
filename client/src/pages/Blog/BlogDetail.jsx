import React from "react";
import { useParams } from "react-router-dom";

import blogImg from "../../assets/blog.webp";
import whatsappIcon from "../../assets/whatsapp.webp";
import linkedinIcon from "../../assets/linkedin.webp";
import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

import { blogData } from "../../data/BlogData";

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogData.find((item) => item.slug === slug);

  if (!blog) {
    return <p className="text-center mt-20 text-lg">Blog not found</p>;
  }

  const shareOnWhatsApp = () => {
    const message = `Check out this blog: ${blog.title}\n\n${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />
      {/* Header */}
            <HeaderSection
              page="Blog"
              title="Blogs made simple."
              subtitle="Explore helpful blogs written in a simple way. Stay updated with
              ideas, insights, and useful information from technology, education,
              careers, and many more fields."
              image={blogImg}
            />

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 text-left">
        <div className="bg-[#A7E1B2] rounded-2xl shadow-lg p-6 md:p-10">

          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-xl mb-8"
          />

          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {blog.title}
          </h2>

          <div className="h-[4px] w-40 bg-[#124734] mb-6"></div>

          <p className="text-sm mb-4">
            <b>Author:</b> Prospect Edu Team &nbsp; | &nbsp;
            <b>Published:</b> Nov 05, 2025
          </p>

          <p className="text-sm mb-6">⏱️ Estimated Read Time: 8 minutes</p>

          <p className="text-lg leading-7 whitespace-pre-line">
            {blog.description}
          </p>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={shareOnWhatsApp}
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full"
            >
              <img src={whatsappIcon} className="w-5 h-5" />
              Share on WhatsApp
            </button>

            <button
              onClick={shareOnLinkedIn}
              className="flex items-center gap-2 bg-[#0A66C2] text-white px-4 py-2 rounded-full"
            >
              <img src={linkedinIcon} className="w-5 h-5" />
              Share on LinkedIn
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default BlogDetails;
