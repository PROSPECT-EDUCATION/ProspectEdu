// src/components/Student/StudentTopbar.jsx
import CourseDropdown from "./ui/CourseDropdown";
import SearchBar from "./ui/SearchBar";
import StoreButton from "./ui/StoreButton";
import NotificationBell from "./ui/NotificationBell";
import ProfileAvatar from "./ui/ProfileAvatar";

export default function StudentTopbar({ isCollapsed = false, pageTitle }) {
  return (
    <header className="w-full bg-white px-6 py-3 flex items-center justify-between">
      {/* Left Section (Dynamic Title or Greeting) */}
      <div>
        {pageTitle ? (
          // ✅ Custom page title
          <h2 className="text-lg font-heading font-semibold text-[#124734]">
            {pageTitle}
          </h2>
        ) : (
          // ✅ Default greeting for dashboard
          <>
            <p className="text-sm text-[#5B7065] font-body">
              Hello <span className="font-semibold text-[#124734]">Pratima</span>, Welcome Back!
            </p>
            <h2 className="text-lg font-heading font-semibold text-[#124734]">
              Your Dashboard Today
            </h2>
          </>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <CourseDropdown />
        <SearchBar />
        <StoreButton />
        <NotificationBell />
        <ProfileAvatar />
      </div>
    </header>
  );
}

