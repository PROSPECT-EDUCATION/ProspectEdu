import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

export default function ShippingAndDeliveryPolicy() {
  return (
    <section className="bg-[#F9FAFB] text-[#124734] font-[Open_Sans,sans-serif]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20 text-left">
        <h1 className="text-4xl font-bold mb-6">
          Shipping & Delivery Policy
        </h1>
        <div className="h-[4px] w-48 bg-[#A7E1B2] mb-10"></div>

        <p className="text-gray-700 mb-6">
          ProspectEdu offers only digital services and products.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Digital Delivery</h2>
        <p className="text-gray-700 mb-4">
          Course access and digital products are delivered instantly or
          within 24 hours after successful payment.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">No Physical Shipping</h2>
        <p className="text-gray-700">
          No physical products are shipped.
        </p>
      </main>

      <Footer />
    </section>
  );
}
