import React from "react";
import hiringImg from "../../assets/hiring2.webp";
import ContactUs from "../../components/Contact";
import { useNavigate } from "react-router-dom";

const Career = () => {  
  const navigate = useNavigate();
  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">

      {/* ------------ Header ------------ */}
      <div className="bg-[#1E5631] text-white w-full py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-6 md:px-8 gap-8">

          {/* Left Content */}
          <div className="w-full md:w-1/2 md:pr-8 text-center md:text-left">
            <p className="text-sm mb-2 text-gray-200">Home &gt; Career</p>

            <h1 className="font-semibold text-3xl md:text-4xl mb-2 leading-snug">
              Join the Future of Education
            </h1>

            <p className="text-[#B7F399] text-lg font-medium leading-relaxed">
              Unlock your potential and make a difference in the lives  
              of millions of learners worldwide.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
            <img
              src={hiringImg}
              alt="Career Hiring Illustration"
              className="w-52 sm:w-64 md:w-[250px] rounded-lg shadow-md object-contain"
            />
          </div>

        </div>
      </div>

      {/* ------------ About the Company Section ------------ */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

        <h2 className="text-3xl font-bold mb-10 text-center md:text-left">About the Company</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {/* Mission Card */}
          <div className="bg-[#A7E1B2] p-8 rounded-xl shadow-md text-center md:text-left">
            <img src="https://cdn-icons-png.flaticon.com/512/9971/9971421.png" className="w-12 mb-4 mx-auto md:mx-0" />
            <h3 className="text-2xl font-semibold mb-2">Mission</h3>
            <p className="text-sm leading-relaxed">
              Our mission is to revolutionize education by providing innovative
              and accessible learning solutions to students all over India.
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-[#A7E1B2] p-8 rounded-xl shadow-md text-center md:text-left">
            <img src="https://cdn-icons-png.flaticon.com/512/8279/8279756.png" className="w-12 mb-4 mx-auto md:mx-0" />
            <h3 className="text-2xl font-semibold mb-2">Values</h3>
            <p className="text-sm leading-relaxed">
              We are committed to excellence, collaboration, and continuous
              improvement. We believe in empowering learners and fostering a
              love for lifelong learning.
            </p>
          </div>

          {/* Achievements Card */}
          <div className="bg-[#A7E1B2] p-8 rounded-xl shadow-md text-center md:text-left">
            <img src="https://cdn-icons-png.flaticon.com/512/13680/13680271.png" className="w-12 mb-4 mx-auto md:mx-0" />
            <h3 className="text-2xl font-semibold mb-2">Achievements</h3>
            <p className="text-sm leading-relaxed">
              Over the years, we have helped millions of students achieve
              academic success. Our platform has been recognized and awarded
              for its impact on education.
            </p>
          </div>

        </div>
      </div>

      {/* ------------ Open Positions Section ------------ */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

        <h2 className="text-3xl font-bold mb-10 text-center md:text-left">Open Positions</h2>

        <div className="space-y-6">

          {/* Job Card 1 */}
          <div className="p-6 rounded-xl shadow-md bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold">Subject Matter Expert (Engineering)</h3>
              <p className="text-sm mt-1">
                Vacancy: 3 &nbsp;/&nbsp; Location: Bhopal &nbsp;/&nbsp; Job Type: Full-Time
              </p>
            </div>
            <button
              onClick={() => navigate("/career/1")}
              className="bg-[#1E5631] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#154727] transition w-full md:w-auto"
            >
              View Details
            </button>
          </div>

          {/* Job Card 2 */}
          <div className="p-6 rounded-xl shadow-md bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold">Content Writer (Law Entrance)</h3>
              <p className="text-sm mt-1">
                Vacancy: 2 &nbsp;/&nbsp; Location: Bhopal &nbsp;/&nbsp; Job Type: Full-Time
              </p>
            </div>
            <button
              onClick={() => navigate("/career/2")}
              className="bg-[#1E5631] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#154727] transition w-full md:w-auto"
            >
              View Details
            </button>
          </div>

          {/* Job Card 3 */}
          <div className="p-6 rounded-xl shadow-md bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold">Mock Test Creator (Engineering & Law)</h3>
              <p className="text-sm mt-1">
                Vacancy: 4 &nbsp;/&nbsp; Location: Remote &nbsp;/&nbsp; Job Type: Part-Time
              </p>
            </div>
            <button
              onClick={() => navigate("/career/3")}
              className="bg-[#1E5631] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#154727] transition w-full md:w-auto"
            >
              View Details
            </button>
          </div>

          {/* Job Card 4 */}
          <div className="p-6 rounded-xl shadow-md bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold">Batch Manager (Engineering/Law)</h3>
              <p className="text-sm mt-1">
                Vacancy: 1 &nbsp;/&nbsp; Location: Bhopal &nbsp;/&nbsp; Job Type: Full-Time
              </p>
            </div>
            <button
              onClick={() => navigate("/career/4")}
              className="bg-[#1E5631] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#154727] transition w-full md:w-auto"
            >
              View Details
            </button>
          </div>

        </div>
      </div>

      {/* ------------ Company Culture Section ------------ */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

        <h2 className="text-3xl font-bold mb-10 text-center md:text-left">Company Culture</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Collaborative Work Environment */}
          <div className="bg-[#A7E1B2] p-8 rounded-xl shadow-md flex items-start gap-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/12535/12535136.png"
              alt="Collaborative Icon"
              className="w-14"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Collaborative Work Environment</h3>
              <p className="text-sm leading-relaxed">
                We foster a collaborative workplace where everyone’s ideas matter. 
                Our team works together to solve problems and create innovative solutions.
              </p>
            </div>
          </div>

          {/* Innovation */}
          <div className="bg-[#A7E1B2] p-8 rounded-xl shadow-md flex items-start gap-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8917/8917893.png"
              alt="Innovation Icon"
              className="w-14"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Innovation</h3>
              <p className="text-sm leading-relaxed">
                We believe in pushing the boundaries of education technology. 
                Our team is always exploring new ideas to transform the way students learn.
              </p>
            </div>
          </div>

          {/* Diversity and Inclusion */}
          <div className="bg-[#A7E1B2] p-8 rounded-xl shadow-md flex items-start gap-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11817/11817390.png"
              alt="Diversity Icon"
              className="w-14"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Diversity and Inclusion</h3>
              <p className="text-sm leading-relaxed">
                We celebrate diversity and believe it leads to stronger results. 
                We work to build an inclusive workplace where everyone feels valued and respected.
              </p>
            </div>
          </div>

          {/* Professional Growth */}
          <div className="bg-[#A7E1B2] p-8 rounded-xl shadow-md flex items-start gap-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10893/10893970.png"
              alt="Growth Icon"
              className="w-14"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Professional Growth</h3>
              <p className="text-sm leading-relaxed">
                We support the professional development of our team. 
                We offer opportunities for learning, advancement, and personal growth.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ------------ Contact Us Section ------------ */}
      <ContactUs />

    </section>
  );
};

export default Career;
