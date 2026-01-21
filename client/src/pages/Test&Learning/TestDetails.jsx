// src/pages/Test/TestDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import testImg from "../../assets/test1.webp";
import whyTestImg from "../../assets/WhyTest.webp";
import HeaderSection from "../../components/HeaderSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import WhyTestSeries from "../../components/WhyTestSeries";
import { fetchPublicTestSeriesById } from "../../lib/testSeriesApi";
import { hasPurchasedSeries } from "../../lib/testPurchaseApi";

const TestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  const [checkingPurchase, setCheckingPurchase] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const token = sessionStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchPublicTestSeriesById(id);
        setTest(data);
      } catch (e) {
        console.error(e);
        setTest(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // ✅ check purchase only when logged in
  useEffect(() => {
    (async () => {
      if (!isLoggedIn || !id) {
        setPurchased(false);
        return;
      }
      try {
        setCheckingPurchase(true);
        const ok = await hasPurchasedSeries(id);
        setPurchased(ok);
      } catch (e) {
        console.error(e);
        setPurchased(false);
      } finally {
        setCheckingPurchase(false);
      }
    })();
  }, [id, isLoggedIn]);

  const getStatusColor = (status) => {
    if (status === "Free Quiz") return "bg-blue-100 text-blue-700 border border-blue-300";
    if (status === "Upcoming") return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    if (status === "Live Now") return "bg-green-100 text-green-700 border border-green-300 animate-pulse";
    if (status === "Test Ended") return "bg-red-100 text-red-700 border border-red-300";
    return "text-gray-600 border-gray-400";
  };

  const onBuyNow = () => {
    const target = `/checkout-test-learning/${id}`;

    // ✅ not logged in -> go login + store redirect
    if (!isLoggedIn) {
      sessionStorage.setItem("postLoginRedirect", target);
      navigate("/login");
      return;
    }

    // ✅ logged in -> go checkout
    navigate(target);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#124734]">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#124734]">
        <p className="text-lg font-medium">⚠️ Test not found!</p>
      </div>
    );
  }

  const includedItems = [
    { icon: "📄", label: "Question Paper" },
    { icon: "📘", label: "Model Answer" },
    { icon: "📚", label: "Answer Booklet" },
    { icon: "🧾", label: "Evaluation" },
  ];

  // ✅ tests list prefer: test.tests, fallback: test.schedule
const testsList = Array.isArray(test.tests)
  ? test.tests
  : Array.isArray(test.schedule)
  ? test.schedule.map((x) => ({ name: x.name }))
  : [];


  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />

      <HeaderSection
        page={`Test Series > ${test.title}`}
        title={test.title}
        subtitle={
          <div>
            <p className="text-[#B7F399] text-lg font-medium mb-4">What’s Included</p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-12 text-white max-w-xl">
              {includedItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        }
        image={test.imageUrl || testImg}
      />

      <div className="max-w-7xl mx-auto mt-12 px-6 md:px-8 flex flex-col md:flex-row gap-8 text-left">
        {/* Schedule */}
        {/* Tests Included (names only) */}
<div className="bg-white rounded-xl shadow-md p-6 w-full md:w-2/3">
  <h2 className="text-2xl font-semibold mb-6">Tests Included</h2>

  {testsList.length === 0 ? (
    <p className="text-gray-600">No tests available.</p>
  ) : (
    <div className="divide-y divide-gray-200">
      {testsList.map((t, idx) => (
        <div key={idx} className="py-4 px-2 hover:bg-[#F9FAFB] flex items-center gap-3">
          <span className="text-purple-700 text-xl">🧾</span>
          <p className="font-semibold text-[#124734]">{t.name || `Test ${idx + 1}`}</p>
        </div>
      ))}
    </div>
  )}
</div>


        {/* Right Card */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/3 h-fit text-left">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">{test.title}</h3>

          <p className="text-gray-700 text-base mb-2">
            <strong>Registration fee - </strong>
            {Number(test.price || 0) === 0 ? "Free" : `₹${test.price}/-`}
            {Number(test.mrp || 0) > Number(test.price || 0) && (
              <span className="line-through text-gray-400 ml-2">₹{test.mrp}/-</span>
            )}
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Expire At - Not Available</li>
            <li>🧾 Total Test - {test.totalTest}</li>
            <li>❓ Total Question - {test.totalQuestion}</li>
            <li>🌐 Language - {test.language}</li>
            <li>🧠 Question Type - {test.questionType}</li>
          </ul>

          {/* ✅ Hide Buy Now if purchased */}
          {isLoggedIn && checkingPurchase ? (
            <button className="bg-gray-200 text-gray-600 w-full py-2 mt-6 rounded-md font-medium cursor-wait">
              Checking...
            </button>
          ) : purchased ? null : (
            <button
              onClick={onBuyNow}
              className="bg-[#1E5631] text-white w-full py-2 mt-6 rounded-md font-medium hover:bg-[#A7E1B2] transition"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>

      <WhyTestSeries image={whyTestImg} />
      <div className="pt-10">
        <Footer />
      </div>
    </section>
  );
};

export default TestDetails;
