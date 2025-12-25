import { useLocation } from "react-router-dom";
import SignupForm from "../../components/Signup/SignupForm";
import SignupIllustration from "../../components/Signup/SignupIllustration";
import { useEffect } from "react";
export default function SignupPage() {
  const location = useLocation();
  const role = location.state?.role || "Learner"; // default
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
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Illustration */}
      <SignupIllustration />

      {/* Right Form */}
      <div className="flex flex-col justify-center items-center bg-white px-10 py-16">
        <div className="max-w-md w-full">
          <img
            src="/src/assets/logo.png.webp"
            alt="ProspectEdu Logo"
            className="h-12 mb-4 mx-auto"
          />
          <h2 className="text-2xl font-heading text-[#124734] text-center mb-6">
            Register as {role}
          </h2>
          <SignupForm />
        </div>
      </div>
    </section>
  );
}

