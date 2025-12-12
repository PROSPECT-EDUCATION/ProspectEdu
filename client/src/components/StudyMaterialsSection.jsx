import syllabusIcon from "../assets/syllabus.png";
import previousYearIcon from "../assets/previous.png";
import currentAffairsIcon from "../assets/current.png";
import caseStudiesIcon from "../assets/case.png";
import projectGuideIcon from "../assets/project.png";
import labManualIcon from "../assets/lab.png";
import mindMapIcon from "../assets/mindmap.png";
import infographicIcon from "../assets/infographic.png";
import assignmentIcon from "../assets/assignment.png";
import quizIcon from "../assets/quiz.png";

export default function StudyMaterialsSection() {
  const materials = [
    { title: "Syllabus", icon: syllabusIcon, color: "#E0F2E9" },
    { title: "Previous Year Questions", icon: previousYearIcon, color: "#F9EDEB" },
    { title: "Current Affairs", icon: currentAffairsIcon, color: "#E1F3EC" },
    { title: "Case Studies", icon: caseStudiesIcon, color: "#FFF3E0" },
    { title: "Project Guides", icon: projectGuideIcon, color: "#E6F4EA" },
    { title: "Lab Manuals", icon: labManualIcon, color: "#F0F9F2" },
    { title: "Mind Maps", icon: mindMapIcon, color: "#FFFBE6" },
    { title: "Infographics", icon: infographicIcon, color: "#E3F2FD" },
    { title: "Assignments", icon: assignmentIcon, color: "#F9E8E8" },
    { title: "Daily Quiz", icon: quizIcon, color: "#E8F5E9" },
  ];

  return (
    <section className="w-full bg-[#F9FAFB] py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl font-heading font-semibold text-[#124734] mb-10">
          Study Materials
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {materials.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-[#A7E1B2] p-6 hover:shadow-md hover:scale-[1.03] transition-all duration-300 group"
            >
              <div
                className="rounded-lg flex flex-col items-center justify-center p-4"
                style={{ backgroundColor: item.color }}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-16 h-16 mb-4 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-3 font-heading text-[#124734] font-semibold text-base">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
