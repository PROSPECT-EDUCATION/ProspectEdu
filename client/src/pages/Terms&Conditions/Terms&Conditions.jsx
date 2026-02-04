import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

export default function TermsAndCondition() {
  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20 text-left">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <div className="h-[4px] w-40 bg-[#A7E1B2] mb-10"></div>

        <p className="text-gray-700 mb-6">
          These Terms & Conditions govern your use of ProspectEdu’s website,
          online courses, scholarship programs, and ecommerce services.
          By accessing or using our platform, you agree to comply with these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Services Offered</h2>
        <p className="text-gray-700 mb-4">
          ProspectEdu provides online educational courses, digital learning
          resources, scholarship exams, and ecommerce products. All services
          are delivered digitally unless otherwise stated.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">2. User Responsibilities</h2>
        <p className="text-gray-700 mb-4">
          Users must provide accurate information during registration and
          must not misuse the platform, copy content, or perform illegal activities.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Payments</h2>
        <p className="text-gray-700 mb-4">
          All payments are processed securely via Razorpay. ProspectEdu does not
          store card, UPI, or banking details.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          All content, videos, study material, and product images belong to
          ProspectEdu and may not be reused without written permission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Changes</h2>
        <p className="text-gray-700">
          ProspectEdu reserves the right to update these terms at any time.
        </p>
      </main>

      <Footer />
    </section>
  );
}
