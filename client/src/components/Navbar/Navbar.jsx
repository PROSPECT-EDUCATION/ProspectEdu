import { useState } from "react";
import { ChevronDown } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import logo from "../../assets/logo.png.jpeg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const toggleMenu = (menu) => setActiveMenu(activeMenu === menu ? null : menu);
  const links = [
    { label: "Home" },
    { label: "Courses", dropdown: ["Engineering", "Law", "Management"] },
    { label: "Test & Learning", dropdown: ["Active Test Series 1", "Active Test Series 2"] },
    { label: "Scholarship", dropdown: ["Active Scholarship 1", "Active Scholarship 2"] },
    { label: "Research" },
    { label: "E-commerce" },
    { label: "Donation" },
    { label: "More", dropdown: ["Parent Company", "Blog", "About Us", "News", "Contact Us"] },
  ];
  return (
    <header className="w-full bg-[#FFFFFF] shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-3 max-w-7xl mx-auto">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ProspectEdu Logo" className="h-10 w-auto object-contain" />
          <h1 className="text-xl font-heading font-semibold text-[#124734] whitespace-nowrap">
            ProspectEdu
          </h1>
        </Link>

        {/* Center: Navigation */}
<nav className="hidden lg:flex items-center justify-center gap-6 font-medium text-[#124734] font-body">
  {links.map((item) =>
    item.dropdown ? (
      <div key={item.label} className="relative group">
        <button
          onClick={() => toggleMenu(item.label)}
          className="flex items-center gap-1 whitespace-nowrap hover:text-[#009846] transition"
        >
          {item.label} <ChevronDown size={15} />
        </button>
        {activeMenu === item.label && <DropdownMenu items={item.dropdown} />}
      </div>
    ) : item.label === "Home" ? ( // ✅ condition directly here
      <Link
        key={item.label}
        to="/"
        className="whitespace-nowrap hover:text-[#009846] transition"
      >
        Home
      </Link>
    ) : (
      <button
        key={item.label}
        className="whitespace-nowrap hover:text-[#009846] transition"
      >
        {item.label}
      </button>
    )
  )}
</nav>

        {/* Right: Login */}
      <Link to = "/login"
      className = "border border-[#009846] text-[#009846] rounded-full px-5 py-2 font-medium hover:bg-[#009846] hover:text-white transition-all duration-300 whitespace-nowrap">
        Login
      </Link>
      </div>
    </header>
  );
}
