import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import logo from "../../assets/logo.png.jpeg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = (menu) =>
    setActiveMenu(activeMenu === menu ? null : menu);

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
          <img
            src={logo}
            alt="ProspectEdu Logo"
            className="h-10 w-auto object-contain"
          />
          <h1 className="text-xl font-heading font-semibold text-[#124734] whitespace-nowrap">
            ProspectEdu
          </h1>
        </Link>

        {/* ----------- DESKTOP NAV (unchanged) -------------- */}
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
                {activeMenu === item.label && (
                  <DropdownMenu items={item.dropdown} />
                )}
              </div>
            ) : item.label === "Home" ? (
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

        {/* Desktop Login */}
        <Link
          to="/login"
          className="hidden lg:block border border-[#009846] text-[#009846] rounded-full px-5 py-2 font-medium hover:bg-[#009846] hover:text-white transition-all duration-300 whitespace-nowrap"
        >
          Login
        </Link>

        {/* ----------- MOBILE RIGHT SIDE (Login + Menu) -------------- */}
        <div className="flex items-center gap-4 lg:hidden">

          {/* Mobile Login Button */}
          <Link
            to="/login"
            className="border border-[#009846] text-[#009846] rounded-full px-4 py-1.5 text-sm font-medium hover:bg-[#009846] hover:text-white transition"
          >
            Login
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="text-[#124734]"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ----------- MOBILE MENU DROPDOWN (ADDED) -------------- */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#A7E1B2] shadow-sm px-6 py-4 space-y-3">

          {links.map((item) => (
            <div key={item.label}>
              {/* If NO dropdown */}
              {!item.dropdown ? (
                <Link
                  to={item.label === "Home" ? "/" : `/${item.label.toLowerCase()}`}
                  className="block py-2 text-[#124734] font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  {/* Dropdown Parent */}
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="flex justify-between items-center w-full py-2 font-medium text-[#124734]"
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={`${
                        activeMenu === item.label ? "rotate-180" : ""
                      } transition`}
                    />
                  </button>

                  {/* Dropdown Items */}
                  {activeMenu === item.label && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((d, i) => (
                        <Link
                          key={i}
                          to={`/${d.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block text-sm text-[#5B7065] hover:text-[#009846] transition"
                        >
                          {d}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {/* (Mobile login is now OUTSIDE, so we removed the login button here) */}
        </div>
      )}
    </header>
  );
}
