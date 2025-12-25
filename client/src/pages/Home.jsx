import React, { Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../App.css";

import HomeBanner from "../components/HomeBanner";
import DashboardSelection from "../components/Dashboard/DashboardSelection";
import CategorySection from "../components/CategorySection";
import StudyMaterialsSection from "../components/StudyMaterialsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import MobileCTA from "../components/MobileCTA";
import Footer from "../components/Footer";

// 🔥 Lazy-loaded heavy sections
const PopularCourses = React.lazy(() =>
  import("../components/PopularCourses")
);
const FreeVideos = React.lazy(() =>
  import("../components/FreeVideos")
);
const YouTubeChannels = React.lazy(() =>
  import("../components/YouTubeChannels")
);

function Home() {
  return (
    <>
      {/* Header */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-[#F9FAFB] text-dark font-body">

        {/* SEO H1 (only one per page) */}
        <h1 className="sr-only">
          ProspectEdu – Career Focused Online Learning Platform
        </h1>

        <HomeBanner />
        <DashboardSelection />
        <CategorySection />

        {/* Lazy sections */}
        <Suspense fallback={<div className="text-center py-12">Loading courses...</div>}>
          <PopularCourses />
        </Suspense>

        <StudyMaterialsSection />

        <Suspense fallback={<div className="text-center py-12">Loading videos...</div>}>
          <FreeVideos />
        </Suspense>

        <WhyChooseUs />

        <Suspense fallback={<div className="text-center py-12">Loading channels...</div>}>
          <YouTubeChannels />
        </Suspense>

        <MobileCTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
