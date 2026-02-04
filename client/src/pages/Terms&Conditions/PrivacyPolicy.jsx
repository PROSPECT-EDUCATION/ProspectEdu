import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPolicy() {
  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20 text-left">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="h-[4px] w-32 bg-[#A7E1B2] mb-10"></div>

        <p className="text-gray-700 mb-6">
          ProspectEdu respects your privacy and is committed to protecting
          your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect basic details such as name, email, phone number,
          course preferences, and order information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Payment Security</h2>
        <p className="text-gray-700 mb-4">
          Payment details are processed securely through Razorpay.
          ProspectEdu does not store sensitive payment data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Use of Data</h2>
        <p className="text-gray-700 mb-4">
          Your data is used only for service delivery, account management,
          and communication purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Third Parties</h2>
        <p className="text-gray-700">
          We do not sell or share your data with third parties except
          required service providers.
        </p>
      </main>

      <Footer />
    </section>
  );
}
