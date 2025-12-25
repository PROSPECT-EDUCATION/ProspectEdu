import React from "react";
import donateImg from "../../assets/donate.webp";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const navigate = useNavigate();

  const goToDonateAmount = () => {
    navigate("/donate-amount");
  };

  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">

      {/* ---------------- Header ---------------- */}
      <div className="bg-[#1E5631] text-white w-full py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-6 md:px-8 gap-8">
          
          {/* Left Text */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8">
            <p className="text-sm mb-3 text-gray-200">Home &gt; Donate</p>
            <h1 className="font-semibold text-4xl mb-3 leading-snug">
              Make a Difference with Your Donation.
            </h1>
            <p className="text-[#B7F399] text-lg font-medium">
              Your support helps provide education, resources, and opportunities
              to students who need them most. Together, we can build a stronger
              and brighter future for everyone.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
            <img
              src={donateImg}
              alt="Donate Illustration"
              className="w-[220px] md:w-[350px] rounded-lg shadow-md"
            />
          </div>

        </div>
      </div>

      {/* ---------------- Donate Us Section ---------------- */}
      <div className="bg-white py-16 px-6 md:px-8 text-center shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E5631] mb-4">
          Donate Us
        </h2>
        <div className="h-[2px] w-32 bg-[#A7E1B2] mx-auto mb-6 shadow-sm shadow-green-300"></div>
        <p className="max-w-5xl mx-auto text-gray-700 text-lg leading-relaxed">
          Welcome to our donate page! We are a Bhopal-based non-profit
          organization dedicated to making a positive impact on our community
          and beyond. Your donation can help us continue our work and make a
          difference in the lives of those in need. When you donate to a social
          cause, you’re not only making a difference in the lives of others, but
          you’re also making a positive impact on yourself. Studies have shown
          that people who donate to charity experience a “helper’s high,” a
          feeling of well-being and happiness that comes from doing something
          good for others.
        </p>
      </div>

      {/* ---------------- Why Donate & How to Donate ---------------- */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#1E5631] mb-4">Why Donate?</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          Your donation can make a real difference in the world. It can help
          provide food and shelter to the homeless, fund research for a cure for
          a disease, support education and literacy programs for underprivileged
          communities, and so much more. Your contribution, no matter how small,
          can help create positive change.
        </p>

        <h2 className="text-3xl font-bold text-[#1E5631] mb-4">
          How to Donate?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We offer a variety of ways to donate to our cause. You can make a
          one-time donation through our website, or you can set up a recurring
          monthly contribution to help sustain our work. We also accept
          donations through cheque or in person at our office in Bhopal (M.P.).
        </p>
      </div>

      {/* ---------------- Donate Online & Bank Transfer ---------------- */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-200">
        
        {/* Left: Donate Online */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-red-600 mb-2 underline underline-offset-4">
            Donate Us Online
          </h2>
          <p className="text-gray-700 mb-6 text-[17px] leading-relaxed">
            You can donate to us online using <b>Net Banking</b>, <b>Debit Card</b>, 
            <b> Credit Card</b>, <b>UPI</b>, or <b>QR Code</b>.  
            To donate online, click the button below.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={goToDonateAmount}
              className="flex items-center gap-3 bg-[#1E5631] hover:bg-[#144923] text-white font-semibold text-lg px-6 py-2 rounded-full shadow-md transition"
            >
              <span className="text-xl">➤</span> DONATE NOW
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[2px] bg-[#A7E1B2] h-52"></div>

        {/* Right: Bank Transfer */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-red-600 mb-2 underline underline-offset-4">
            Donate Us via Bank Transfer
          </h2>
          <ul className="text-gray-700 text-[17px] leading-relaxed space-y-2">
            <li><b>BANK NAME:</b> IDBI Bank Limited</li>
            <li><b>A/C NAME:</b> Prospect Education and Social Welfare Society</li>
            <li><b>A/C NUMBER:</b> 0030104000401791</li>
            <li><b>IFS CODE:</b> IBKL0000030</li>
            <li><b>BANK BRANCH ADDRESS:</b> TT Nagar, Bhopal (M.P.) 462023</li>
          </ul>
        </div>

      </div>

      {/* ---------------- What Does Donation Support ---------------- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 px-6 md:px-8 py-16">

        {/* Left Content */}
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-[#1E5631] mb-6 text-center md:text-left">
            What does your donation support?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Your donation goes directly to support our programs and initiatives.
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
            <li><b>Education and literacy:</b> We believe in access to education for all.</li>
            <li><b>Health and wellness:</b> Supporting healthcare and research.</li>
            <li><b>Environment and sustainability:</b> Protecting our planet.</li>
            <li><b>Community development:</b> Creating opportunities for growth.</li>
          </ul>
        </div>

        {/* Right Contact Section */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h3 className="text-2xl font-bold text-[#1E5631] mb-4">Contact us for Donation</h3>
          <p className="text-gray-800 text-lg mb-3">📞 9752-81-2898</p>
          <p className="text-gray-800 text-lg mb-6">📞 9750-777-88</p>
          <div className="h-[2px] w-40 bg-[#A7E1B2] mx-auto md:mx-0 mb-6"></div>

          <h3 className="text-2xl font-bold text-[#1E5631] mb-4">Visit our Office</h3>
          <p className="text-gray-700 text-md leading-relaxed font-medium">
            Prospect Education & Social Welfare Society <br />
            R-52, First Floor, Zone-1, MP Nagar <br />
            Near Hotel Shree Vatika & Chetak Bridge <br />
            Bhopal, Madhya Pradesh – 462011
          </p>
        </div>

      </div>

      {/* ---------------- How Else Can You Help ---------------- */}
      <div className="max-w-6xl mx-auto text-center px-6 md:px-8 py-16">
        <h2 className="text-3xl font-bold text-[#1E5631] mb-8">
          How else can you help?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          In addition to financial donations, we also accept donations of goods and services.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          We also offer corporate sponsorships and partnerships.
        </p>
        <p className="text-gray-800 text-lg mb-3">
          <b>Is my donation tax-deductible:</b> No, not yet, we are working on it.
        </p>
        <p className="text-red-600 text-lg font-semibold">
          Thank you for considering a donation to our organization. Together, we can create a brighter future.
        </p>
      </div>

    </section>
  );
};

export default Donate;
