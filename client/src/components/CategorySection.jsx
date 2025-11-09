import itIcon from "../assets/it.png";
import lawIcon from "../assets/law.png";
import electricalIcon from "../assets/electrical.png";

export default function CategorySection() {
  const categories = [
    {
      title: "Information Technology",
      icon: itIcon,
      description: "Explore programming, networking, and software courses.",
    },
    {
      title: "Law",
      icon: lawIcon,
      description: "Understand the principles of law and legal studies.",
    },
    {
      title: "Electrical",
      icon: electricalIcon,
      description: "Dive into power systems and electrical engineering.",
    },
  ];

  return (
    <section className="w-full bg-[#F9FAFB] py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-heading font-semibold text-[#124734] mb-10">
          Categories
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white border border-[#A7E1B2] rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] group"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <img
                  src={cat.icon}
                  alt={cat.title}
                  className="w-16 h-16 mb-4 object-contain group-hover:scale-110 transition-transform duration-300"
                />

                {/* Title */}
                <h3 className="font-heading text-xl font-semibold text-[#124734] mb-2">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#5B7065] font-body">
                  {cat.description}
                </p>

                {/* Button */}
                <button className="mt-5 px-5 py-2 rounded-full border border-[#009846] text-[#009846] text-sm font-medium hover:bg-[#009846] hover:text-white transition">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
