// src/pages/Test/CheckoutTestLearning.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import testImg from "../../assets/test1.webp";
import { fetchPublicTestSeries, fetchPublicTestSeriesById } from "../../lib/testSeriesApi";
import { confirmTestPurchase, hasPurchasedSeries } from "../../lib/testPurchaseApi";

export default function CheckoutTestLearning() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const token = sessionStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  // ✅ if not logged in -> go login and return here
  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem("postLoginRedirect", `/checkout-test-learning/${id}`);
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, id]);

  // ✅ load series (with fallback)
  useEffect(() => {
    (async () => {
      if (!id) return;

      setLoading(true);
      try {
        // 1) Try direct fetch by id
        let data = null;
        try {
          data = await fetchPublicTestSeriesById(id);
        } catch (err) {
          // 2) Fallback: fetch public list and find by id
          const list = await fetchPublicTestSeries();
          data = Array.isArray(list) ? list.find((x) => String(x._id) === String(id)) : null;
        }

        setSeries(data);

        // purchase check (only if logged in)
        if (isLoggedIn) {
          const ok = await hasPurchasedSeries(id);
          setPurchased(ok);
        } else {
          setPurchased(false);
        }
      } catch (e) {
        console.error("Checkout load error:", e);
        setSeries(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isLoggedIn]);

  const price = useMemo(() => Number(series?.price || 0), [series]);
  const mrp = useMemo(() => Number(series?.mrp || 0), [series]);
  const discount = useMemo(() => (mrp > price ? mrp - price : 0), [mrp, price]);

  const onPayNow = async () => {
    if (!series) return;

    setPaying(true);
    try {
      await confirmTestPurchase({
        testSeriesId: series._id,
        provider: "MANUAL",
        transactionId: "TXN_" + Date.now(),
      });

      // ✅ go to my series after success
      navigate("/student/test-series", { replace: true });
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#124734]">
        Loading...
      </div>
    );
  }

  if (!series) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#124734]">
        Checkout item not found.
      </div>
    );
  }

  if (purchased) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E6F4EC] p-8 text-center">
            <p className="text-xl font-bold text-[#124734]">✅ Already Purchased</p>
            <p className="text-[#5B7065] mt-2">This test series is already in your account.</p>
            <button
              onClick={() => navigate("/student/test-series")}
              className="mt-6 px-5 py-2 rounded-xl bg-[#009846] text-white fsont-semibold"
            >
              Go to My Test Series
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 text-left">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#E6F4EC] overflow-hidden">
            <div className="relative">
              <img
                src={series.imageUrl || testImg}
                alt={series.title}
                className="w-full h-56 object-contain bg-[#F9FAFB]"
              />
              <div className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-[#124734] text-white">
                {series.type}
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-extrabold text-[#124734]">{series.title}</h1>
              <p className="text-[#5B7065] mt-2">
                Language: <b className="text-[#124734]">{series.language}</b> • Tests:{" "}
                <b className="text-[#124734]">{series.totalTest}</b> • Questions:{" "}
                <b className="text-[#124734]">{series.totalQuestion}</b>
              </p>

              <div className="mt-5 bg-[#F9FAFB] border border-[#E6F4EC] rounded-2xl p-5">
                <p className="font-bold text-[#124734]">What you will get</p>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#5B7065]">
                  <li>✅ Full Test Access</li>
                  <li>✅ Schedule (if provided)</li>
                  <li>✅ Updates / Improvements</li>
                  <li>✅ Mobile Friendly</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right - Summary */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E6F4EC] p-6 sticky top-24">
              <h2 className="text-lg font-extrabold text-[#124734]">Order Summary</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#5B7065]">Price</span>
                  <span className="font-bold">{price === 0 ? "Free" : `₹${price}`}</span>
                </div>

                {mrp > price && (
                  <div className="flex justify-between">
                    <span className="text-[#5B7065]">MRP</span>
                    <span className="line-through text-gray-400">₹{mrp}</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#5B7065]">Discount</span>
                    <span className="font-bold text-[#009846]">-₹{discount}</span>
                  </div>
                )}

                <hr className="border-[#E6F4EC]" />

                <div className="flex justify-between text-base">
                  <span className="font-extrabold">Total</span>
                  <span className="font-extrabold">{price === 0 ? "Free" : `₹${price}`}</span>
                </div>
              </div>

              <button
                onClick={onPayNow}
                disabled={paying}
                className={`mt-6 w-full py-3 rounded-xl font-bold shadow transition ${
                  paying
                    ? "bg-gray-200 text-gray-600 cursor-wait"
                    : "bg-[#009846] text-white hover:opacity-95"
                }`}
              >
                {paying ? "Processing..." : price === 0 ? "Unlock Now" : "Pay Now"}
              </button>

              <p className="text-xs text-[#5B7065] mt-3">
                Note: This is manual success payment for now. Later you can integrate Razorpay/Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
