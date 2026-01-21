import logo from "../assets/logo.png.webp";
import loginIllustration from "../assets/login-illustration.webp";
import AuthIllustration from "../components/Auth/AuthIllustration";
import LoginForm from "../components/Auth/LoginForm";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
  const meta = document.createElement("meta");
  meta.name = "robots";
  meta.content = "noindex, follow";
  document.head.appendChild(meta);

  return () => {
    document.head.removeChild(meta);
  };
}, []);

  return (
    <main
      className="min-h-screen bg-[#F9FAFB]"
      aria-labelledby="login-page-heading"
    >
      {/* ✅ SEO H1 (hidden, no UI impact) */}
      <h1 id="login-page-heading" className="sr-only">
        Login to ProspectEdu
      </h1>

      <section className="min-h-screen flex flex-col md:flex-row">
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
              <img
                src={logo}
                alt="ProspectEdu – Online Learning Platform"
                className="h-12 w-auto"
                loading="lazy"
              />
              <h2 className="text-2xl font-heading font-semibold text-[#124734]">
                ProspectEdu
              </h2>
            </div>

            {/* Form */}
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
