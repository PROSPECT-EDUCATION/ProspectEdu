import { Routes, Route } from "react-router-dom";

import AskDoubtSection from "./pages/AskDoubtSection";
import ResearchReport from "./pages/ResearchReport";
import ReportDetails from "./pages/ReportDetails";
import Scholarship from "./pages/Scholarship";
import TestAndLearning from "./pages/Test";
import TestDetails from "./pages/TestDetails";



function App() {
  return (
    <Routes>
      <Route path="/ask-doubt" element={<AskDoubtSection />} />
       <Route path="/research-report" element={<ResearchReport />} />
       <Route path="/research-report/:id" element={<ReportDetails />} />
       <Route path="/scholarship" element={<Scholarship />} />
       <Route path="/test-learning" element={<TestAndLearning />} />
       <Route path="/test-learning/:id" element={<TestDetails />} />
    </Routes>
      
  );
}

export default App;
