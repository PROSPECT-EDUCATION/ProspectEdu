import Navbar from "../components/Navbar/Navbar";
import '../App.css'
import DashboardSelection from "../components/Dashboard/DashboardSelection";
import HomeBanner from '../components/HomeBanner';
import CategorySection from '../components/CategorySection';
import StudyMaterialsSection from "../components/StudyMaterialsSection";
import PopularCourses from '../components/PopularCourses';
import FreeVideos from '../components/FreeVideos';
import WhyChooseUs from '../components/WhyChooseUs';
import YouTubeChannels from '../components/YouTubeChannels';
import MobileCTA from '../components/MobileCTA';
import Footer from '../components/Footer';

function Home() {

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-dark font-body">
      <Navbar />
      <HomeBanner/>
      <DashboardSelection />
      <CategorySection/>
      <PopularCourses />
      <StudyMaterialsSection />
      <FreeVideos/>
      <WhyChooseUs/>
      <YouTubeChannels/>
      <MobileCTA/>
      <Footer/>
    </div>
  )
}

export default Home
