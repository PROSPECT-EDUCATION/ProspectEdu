import React from "react";
import contactImg from "../../assets/contact.webp";
import ContactUs from "../../components/Contact";

const ContactDetails = () => {
  return (
    <>
      {/* ---------------- Contact Us Header ---------------- */}
      <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">

        <div className="w-full bg-[#1E5631] text-white py-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-8 gap-8">

            {/* Left Text */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p className="text-sm opacity-90 mb-3">Home &gt; Contact Us</p>

              <h1 className="font-semibold text-3xl md:text-4xl mb-3 leading-snug">
                Get in Touch
              </h1>

              <p className="text-[#B7F399] text-lg font-medium">
                We’re here to help you, every step of the way.
              </p>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                src={contactImg}
                alt="Contact"
                className="w-40 sm:w-56 md:w-[250px] rounded-lg shadow-md"
              />
            </div>

          </div>
        </div>

        {/* ---------------- Contact Form Section ---------------- */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <ContactUs />
        </div>

        {/* ---------------- Location Section ---------------- */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 text-center text-[#124734]">

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E5631]">
            Prospect Education
          </h2>

          <p className="text-lg font-semibold mb-1">
            Prospect Education
          </p>

          <p className="text-lg font-semibold mb-1">
            R-52, First Floor, Zone-1, MP Nagar, Near Shree Vatika, Bhopal (M.P.)
          </p>

          <p className="text-lg font-semibold mb-1">
            9752812898
          </p>

          {/* Google Map */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-lg border-2 border-[#A7E1B2] mt-6">
            <iframe
              title="Prospect Digital Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.9057282443933!2d77.41913397530306!3d23.23311867902944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4264ff94d31f%3A0x7e476c631d36f0f7!2sR-52%2C%20Zone-I%2C%20Maharana%20Pratap%20Nagar%2C%20Bhopal%2C%20Madhya%20Pradesh%20462011!5e0!3m2!1sen!2sin!4v1700000000001"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </section>
    </>
  );
};

export default ContactDetails;
