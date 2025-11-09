import React from "react";
import questionIllustration from "../assets/question-illustration.jpg";

const AskDoubtSection = () => {
  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">
      <div className="max-w-7xl mx-auto flex justify-between items-start px-8">

        {/* Left Text Section */}
        <div className="w-1/2 pr-8 flex flex-col justify-start">
          <p className="text-sm mb-3 mt-0 text-gray-500">
            Home &gt; Ask Question
          </p>
          <h1 className="font-semibold text-4xl mb-3 leading-snug">
            Go from questioning to understanding!
          </h1>
          <p className="text-green-800 text-lg font-medium">
            Discover the benefits of Ask a Doubt!
          </p>
        </div>

        {/* Right Image Section */}
        <div className="w-1/2 flex justify-end items-start">
          <img
            src={questionIllustration}
            alt="Ask a Doubt Illustration"
            className="w-[250px] rounded-lg shadow-md mt-0"
          />
        </div>
      </div>
    </section>
  );
};

export default AskDoubtSection;
