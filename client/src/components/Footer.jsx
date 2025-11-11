import { Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/logo.png.jpeg"; // your logo path
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#124734] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + Address */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img src={logo} alt="ProspectEdu Logo" className="h-12 w-auto" />
            <h2 className="text-2xl font-heading font-semibold text-[#A7E1B2]">
              ProspectEdu
            </h2>
          </Link>
          <p className="text-sm text-[#F9FAFB] leading-relaxed">
            ProspectEdu Learning <br />
            R-52, First Floor, &, Chetak Bridge, <br />
            near Hotel Shree Vatika, Zone-1, <br />
            MP Nagar, Bhopal, Madhya Pradesh 462003
          </p>

          <div className="mt-4 flex flex-col gap-2 text-sm">
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-[#A7E1B2]" /> 
              India’s Trusted E-Learning Platform
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-[#A7E1B2]" /> 
              enquiry@prospectedu.in
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-[#A7E1B2]" /> 
              +91 98765 43210
            </p>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-[#A7E1B2] mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#A7E1B2] transition">About Us</a></li>
            <li><a href="#" className="hover:text-[#A7E1B2] transition">Contact</a></li>
            <li><a href="#" className="hover:text-[#A7E1B2] transition">Careers</a></li>
            <li><a href="#" className="hover:text-[#A7E1B2] transition">Blog</a></li>
            <li><a href="#" className="hover:text-[#A7E1B2] transition">FAQs</a></li>
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <h3 className="text-lg font-semibold text-[#A7E1B2] mb-3">Popular Courses</h3>
          <ul className="space-y-2 text-sm">
           <li><Link to="/courses/engineering" className="hover:text-[#A7E1B2] transition">Engineering</Link></li>
            <li><Link to="/courses/law" className="hover:text-[#A7E1B2] transition">Law</Link></li>
            <li><Link to="/courses/management" className="hover:text-[#A7E1B2] transition">Management</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-[#A7E1B2] mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#A7E1B2] transition">Scholarships</a></li>
            <li><a href="#" className="hover:text-[#A7E1B2] transition">Research</a></li>
            <li><a href="#" className="hover:text-[#A7E1B2] transition">E-Commerce System</a></li>
            <li><a href="#" className="hover:text-[#A7E1B2] transition">Parent Dashboard</a></li>
            <li><a href="#" className="hover:text-[#A7E1B2] transition">News & Updates</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#A7E1B2]/30 my-6 mx-8"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#F9FAFB]/90">
        <p>© {new Date().getFullYear()} ProspectEdu. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:scale-110 transition">
            <i className="fab fa-facebook text-[#A7E1B2] text-xl"></i>
          </a>
          <a href="#" className="hover:scale-110 transition">
            <i className="fab fa-x-twitter text-[#A7E1B2] text-xl"></i>
          </a>
          <a href="#" className="hover:scale-110 transition">
            <i className="fab fa-instagram text-[#A7E1B2] text-xl"></i>
          </a>
          <a href="#" className="hover:scale-110 transition">
            <i className="fab fa-linkedin text-[#A7E1B2] text-xl"></i>
          </a>
          <a href="#" className="hover:scale-110 transition">
            <i className="fab fa-youtube text-[#A7E1B2] text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
