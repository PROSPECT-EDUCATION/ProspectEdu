import './App.css'
import Home from "./pages/home";
import {Routes, Route} from "react-router-dom";
import Courses from "./pages/Courses";
import EngineeringCourses from "./pages/Courses/EngineeringCourses";
import LawCourses from "./pages/Courses/LawCourses";
import ManagementCourses from "./pages/Courses/ManagementCourses";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import SignupPage from "./pages/Auth/SignupPage";

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/engineering" element={<EngineeringCourses />} />
      <Route path="/courses/law" element={<LawCourses />} />
      <Route path="/courses/management" element={<ManagementCourses />} />
      <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<SignupPage />} />
    </Routes>
    </>
  )
}
export default App
