import { Routes, Route } from "react-router-dom";

import AskDoubtSection from "./pages/AskDoubtSection";
import ResearchReport from "./pages/ResearchReport";
import ReportDetails from "./pages/ReportDetails";
import Scholarship from "./pages/Scholarship";
import TestAndLearning from "./pages/Test";
import TestDetails from "./pages/TestDetails";
import Donation from "./pages/Donate";
import DonationAmount from "./pages/DonateAmount";
import AboutUs from "./pages/AboutUs";
import Career from "./pages/Career";
import JobDetail from "./pages/JobDetail";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Career />} />
      <Route path="/ask-doubt" element={<AskDoubtSection />} />
       <Route path="/research-report" element={<ResearchReport />} />
       <Route path="/research-report/:id" element={<ReportDetails />} />
       <Route path="/scholarship" element={<Scholarship />} />
       <Route path="/test-learning" element={<TestAndLearning />} />
       <Route path="/test-learning/:id" element={<TestDetails />} />
       <Route path="/donate" element={<Donation />} />
        <Route path="/about-us" element={<AboutUs />} />
       <Route path="/donate-amount" element={<DonationAmount />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/:id" element={<JobDetail />} />


    </Routes>
      
  );
}

export default App;
