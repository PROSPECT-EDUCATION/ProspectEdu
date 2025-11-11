import logo from "../assets/logo.png.jpeg";
import loginIllustration from "../assets/login-illustration.png";
import AuthIllustration from "../components/Auth/AuthIllustration";
import LoginForm from "../components/Auth/LoginForm";

export default function Login() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-[#F9FAFB]">
      {/* Left Side - Illustration */}
      <AuthIllustration
        image={loginIllustration}
        title="Login to access the courses and materials"
        description="Create your account to access courses, tests, and study materials with ease."
      />

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-12 bg-white shadow-sm">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="ProspectEdu Logo" className="h-12 w-auto" />
            <h2 className="text-2xl font-heading font-semibold text-[#124734]">
              ProspectEdu
            </h2>
          </div>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
