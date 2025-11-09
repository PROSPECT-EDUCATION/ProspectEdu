export default function HomeBanner() {
  return (
    <section
      className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/src/assets/banner.png')",
      }}
    >
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-[#124734]/40"></div>

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Empowering Education for Every Child
        </h1>
        <p className="max-w-2xl mx-auto text-lg font-body">
          Together we build a future full of hope, learning, and opportunity.
        </p>
      </div>
    </section>
  );
}
