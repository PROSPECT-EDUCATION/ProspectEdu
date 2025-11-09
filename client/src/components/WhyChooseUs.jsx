import { Code, Scale, Zap, Users } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Code className="text-[#009846]" size={36} />,
      title: "Learn from Industry Experts",
      description:
        "Get mentored by professionals from IT, Law, and Electrical domains with hands-on training and real-world projects.",
      bg: "bg-[#A7E1B2]/30",
    },
    {
      icon: <Scale className="text-[#009846]" size={36} />,
      title: "Skill-Focused Curriculum",
      description:
        "Courses designed to bridge the gap between theoretical knowledge and industry requirements for every learner.",
      bg: "bg-[#A7E1B2]/30",
    },
    {
      icon: <Zap className="text-[#009846]" size={36} />,
      title: "Flexible & Accessible Learning",
      description:
        "Study anytime, anywhere with online and hybrid options — empowering students and professionals alike.",
      bg: "bg-[#A7E1B2]/30",
    },
    {
      icon: <Users className="text-[#009846]" size={36} />,
      title: "Inclusive Learning Community",
      description:
        "Join a network of learners and mentors dedicated to growth, innovation, and meaningful learning experiences.",
      bg: "bg-[#A7E1B2]/30",
    },
  ];

  return (
    <section className="w-full bg-[#F9FAFB] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-heading font-semibold text-[#124734] mb-12">
          Why Choose ProspectEdu
        </h2>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-[#A7E1B2] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 ${feature.bg} rounded-full flex items-center justify-center mb-5`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg font-semibold text-[#124734] mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#5B7065] font-body">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
