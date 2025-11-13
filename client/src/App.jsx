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
import StudentDashboard from './pages/Student/StudentDashboard';
import LiveClasses from "./pages/Student/LiveClasses";
import MyCourses from './pages/Student/MyCourses';
import MyTestSeries from './pages/Student/MyTestSeries';
import StudyMaterials from './pages/Student/StudyMaterials';
import Practice from './pages/Student/Practice';
import AllTestSeries from './pages/Student/AllTestSeries';
import AllCourses from './pages/Student/AllCourses';
import StorePage from './pages/Store/StorePage';
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
      <Route path="/student-dashboard" element={<StudentDashboard/>}/>
      <Route path="/student/live-classes" element={<LiveClasses />} />
      <Route path="/student/my-courses" element={<MyCourses/>}/>
      <Route path="/student/test-series" element={<MyTestSeries/>}/>
      <Route path="/student/study-materials" element={<StudyMaterials/>}/>
      <Route path="/student/practice" element={<Practice/>}/>
      <Route path="/student/all-test-series" element={<AllTestSeries/>}/>
      <Route path="/student/all-courses" element={<AllCourses/>}/>
      <Route path="/store" element={<StorePage/>}/>

    </Routes>
    </>
  )
}
export default App
