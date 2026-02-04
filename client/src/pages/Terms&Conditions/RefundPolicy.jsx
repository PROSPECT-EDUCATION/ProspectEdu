import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

export default function RefundPolicy() {
  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20 text-left">
        <h1 className="text-4xl font-bold mb-6">Refund Policy</h1>
        <div className="h-[4px] w-28 bg-[#A7E1B2] mb-10"></div>

        <p className="text-gray-700 mb-6">
          Please read this policy carefully before making any purchase.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">No Refund</h2>
        <p className="text-gray-700 mb-4">
          All course enrollments and ecommerce purchases are non-refundable
          once payment is completed.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Duplicate Payments</h2>
        <p className="text-gray-700 mb-4">
          In case of duplicate payments, the excess amount will be refunded
          within 7 working days.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Failed Transactions</h2>
        <p className="text-gray-700">
          Failed or incomplete transactions are automatically handled by Razorpay.
        </p>
      </main>

      <Footer />
    </section>
  );
}
