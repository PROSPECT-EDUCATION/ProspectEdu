import React from "react";
import { useParams } from "react-router-dom";
import blogImg from "../../assets/blog.webp";
import whatsappIcon from "../../assets/whatsapp.webp";
import linkedinIcon from "../../assets/linkedin.webp";

const blogData = {
  1: {
    title: "How to Study Smart",
    cardImg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=60",
    desc: "Studying smart means learning in a way that saves your time and gives you better results. Many students study for long hours but still forget things quickly because they don’t follow the right method. Smart study focuses on planning, breaking big topics into small parts, revising regularly, and testing yourself. Instead of reading everything again and again, you should use active recall and spaced repetition. These two techniques help your brain remember things for a long time. You can also make short notes, flowcharts, and mind maps to understand concepts easily. Studying in short sessions with breaks can improve focus, and practicing previous year questions helps you see what kind of problems are asked. When you study smart, you don’t feel stressed or overloaded. It makes your preparation simple, easy, and effective.",
  },
  2: {
    title: "Career Tips for Students",
    cardImg: "https://images.unsplash.com/photo-1498079022511-d15614cb1c02?auto=format&fit=crop&w=900&q=60",
    desc: "Choosing the right career is one of the most important decisions for every student. Many students feel confused because they don’t know which field matches their skills. The best way to start is by understanding your strengths, what you enjoy doing, and what kind of work you want in the future. Explore different fields like engineering, law, design, management, government jobs, or entrepreneurship. Talk to professionals and learn about the real work behind each career. Start building skills early because companies want students who know practical things, not just theory. You can learn communication skills, problem solving, coding, public speaking, and time management. Create a simple resume and take small internships to get real work experience. Set short goals, keep learning new things, and stay updated with technology. A successful career needs planning, patience, and continuous improvement.",
  },
  3: {
    title: "Tips for Competitive Exams",
    cardImg: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=60",
    desc: "Competitive exams need both smart work and discipline. Every student wants to score well, but many don’t know how to prepare in a structured way. First, understand the complete syllabus and mark important chapters that carry more weight. Make a time table that you can follow daily without stress. Study in small sessions so your mind stays fresh. Solve previous year papers because they show the level of questions and common patterns. Give mock tests every week to check your speed and accuracy. After each test, analyze your mistakes and focus on weak areas. Use simple tricks to remember formulas, diagrams, and important facts. Avoid distractions like social media while studying. Stay healthy, drink water, take small breaks, and sleep properly. Competitive exams become easier when you stay consistent and believe in yourself.",
  },
  4: {
    title: "Student Life Hacks",
    cardImg: "https://hackslifestyle.com/wp-content/uploads/2024/06/Student-Life-Hacks-1.jpeg.webp",
    desc: "Student life becomes a lot easier when you use small hacks that save your time and reduce stress. Organize your study table and keep only the things you need so you don’t feel distracted. Use timers like the Pomodoro method to study with better focus. Keep your notes clean and write short summaries after each chapter so revision becomes fast. Make separate folders in your phone or laptop for notes, PDF books, and assignments. Wake up early because morning time is great for learning tough subjects. Use digital tools like Google Keep, Notion, and online calendars to manage tasks and deadlines. Always keep a water bottle and healthy snacks near you while studying so you don’t feel tired. Talk to your friends, take small breaks, and go for short walks to refresh your mind. These simple habits make your work smooth and help you stay productive every day.",
  },
};

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogData[id];

  const shareOnWhatsApp = () => {
    const message = `Check out this blog: ${blog.title}\n\n${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, "_blank");
  };

  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">

      {/* ======= Header ======= */}
      <div className="bg-[#1E5631] text-white w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-6 md:px-8 gap-8">

          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-sm mb-3 text-gray-200">
              Home &gt; Blog &gt; {blog.title}
            </p>

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
              alt="blogHeader"
              className="w-40 sm:w-56 md:w-[250px] rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* ======= Blog Content ======= */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16">

        <div className="bg-[#A7E1B2] rounded-2xl shadow-lg p-6 md:p-10">

          {/* Blog Image */}
          <img
            src={blog.cardImg}
            alt="Blog"
            className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-xl mb-8"
          />

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#124734]">
            {blog.title}
          </h2>

          {/* Underline */}
          <div className="h-[4px] w-32 md:w-40 bg-[#124734] mb-6"></div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-[#0f3d24] mb-6">
            <p><span className="font-semibold">Author:</span> Prospect Edu Team</p>
            <p><span className="font-semibold">Published:</span> Nov 05, 2025</p>
          </div>

          <p className="text-sm text-[#0f3d24] mb-6">
            ⏱️ Estimated Read Time: 8 minutes
          </p>

          {/* Description */}
          <p className="text-lg leading-7 text-[#124734]">
            {blog.desc}
          </p>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-8">

            {/* WhatsApp */}
            <button
              onClick={shareOnWhatsApp}
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full shadow hover:scale-[1.05] transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <img src={whatsappIcon} className="w-5 h-5" />
              <span className="text-sm font-medium">Share on WhatsApp</span>
            </button>

            {/* LinkedIn */}
            <button
              onClick={shareOnLinkedIn}
              className="flex items-center gap-2 bg-[#0A66C2] text-white px-4 py-2 rounded-full shadow hover:scale-[1.05] transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <img src={linkedinIcon} className="w-5 h-5" />
              <span className="text-sm font-medium">Share on LinkedIn</span>
            </button>

          </div>

        </div>
      </div>

    </section>
  );
};

export default BlogDetails;
