import { useLocation } from "react-router-dom";

export default function SignupPage() {
  const location = useLocation();
  const userRole = location.state?.role || "Learner";

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#124734] mb-4">
        Register as {userRole}
      </h1>
      {/* rest of your signup form */}
    </div>
  );
}

