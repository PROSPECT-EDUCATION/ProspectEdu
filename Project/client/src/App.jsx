import { Routes, Route } from "react-router-dom";

import AskDoubtSection from "./pages/AskDoubtSection";
import ResearchReport from "./pages/ResearchReport";
import ReportDetails from "./pages/ReportDetails";
import Scholarship from "./pages/Scholarship";


function App() {
  return (
    <Routes>
      <Route path="/ask-doubt" element={<AskDoubtSection />} />
       <Route path="/research-report" element={<ResearchReport />} />
       <Route path="/research-report/:id" element={<ReportDetails />} />
       <Route path="/scholarship" element={<Scholarship />} />
    </Routes>
      
  );
}

export default App;
