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
import EditProfile from "./pages/Student/EditProfile";
import ChangePassword from './pages/Student/ChangePassword';
import OrdersPage from './pages/Student/OrdersPage';
import Doubts from './pages/Student/Doubts';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import TeacherCoursesPage from './pages/Teacher/TeacherCoursesPage';
import CreateCourse from './pages/Teacher/CreateCourse';
import AddModulesPage from './pages/Teacher/AddModulesPage';
import PublishCoursePage from './pages/Teacher/PublishCoursePage';
import CourseManagement from './pages/Teacher/CourseManagement';
import AssessmentDashboardPage from './pages/Teacher/AssessmentDashboardPage';
import CreateAssignmentPage from './pages/Teacher/CreateAssignmentPage';
import CreateQuizPage from './pages/Teacher/CreateQuizPage';
import ViewSubmissionsPage from './pages/Teacher/ViewSubmissionsPage';
import ReviewSubmissionsPageWrapper from './pages/Teacher/ReviewSubmissionsPageWrapper';
import StudentsPerformancePage from './pages/Teacher/StudentsPerformancePage';
import QueriesDoubtsPage from './pages/Teacher/QueriesDoubtsPage';
import ChangePasswordTeacher from './pages/Teacher/ChangePasswordTeacher'
import TeacherOrdersPage from './pages/Teacher/TeacherOrdersPage';
import EditProfilePage from './pages/Teacher/EditProfilePage';
import ParentDashboard from './pages/Parent/ParentDashboard';
import ParentStudentsPage from './pages/Parent/ParentStudentPage';
import StudentDetailsPage from './pages/Parent/StudentDetailsPage';
import ParentMessagesPage from './pages/Parent/ParentMessagePage';
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
      <Route path="/student/edit-profile" element={<EditProfile />} />
      <Route path="/store" element={<StorePage/>}/>
      <Route path="/student/change-password" element = {<ChangePassword/>}/>
      <Route path="/student/orders" element={<OrdersPage />} />
      <Route path="/student/doubts" element={<Doubts/>}/>
      <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
      <Route path="/teacher/courses" element={<TeacherCoursesPage />} />
      <Route path="/teacher/create-course" element={<CreateCourse/>}/>
      <Route path="/teacher/add-modules" element={<AddModulesPage />} />
      <Route path= "/teacher/publish-course" element ={<PublishCoursePage/>}/>
      <Route path="/teacher/course/:courseId" element={<CourseManagement />} />
      <Route path="/teacher/add-modules" element={<AddModulesPage />} />
      <Route path="/teacher/assessments" element={<AssessmentDashboardPage />} />
      <Route path="/teacher/assessment/assignment" element={<CreateAssignmentPage />} />
      <Route path="/teacher/assessment/quiz" element={<CreateQuizPage />} />
      <Route path="/teacher/assessment/submissions" element={<ViewSubmissionsPage />} />
      <Route path="/teacher/assessments/review" element={<ReviewSubmissionsPageWrapper />} />
      <Route path="/teacher/students/performance" element={<StudentsPerformancePage />} />
      <Route path= "/teacher/queries/doubts" element = {<QueriesDoubtsPage/>}/>
      <Route path="/teacher/change-password" element = {<ChangePasswordTeacher/>}/>
      <Route path="/teacher/orders" element={<TeacherOrdersPage />}/>
      <Route path="/teacher/edit-profile" element = {<EditProfilePage/>}/>
      <Route path="/parent-dashboard" element = {<ParentDashboard/>}/>
      <Route path="/parent/students" element = {<ParentStudentsPage/>}/>
      <Route path="/parent/students/:id" element={<StudentDetailsPage />} />
      <Route path="/parent/messages" element={<ParentMessagesPage/>}/>
      </Routes>
    </>
  )
}
export default App
