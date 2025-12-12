import { FileText, HelpCircle, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AssessmentDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Create Assignment",
      desc: "Upload instructions, add due date, attachments.",
      icon: <FileText size={30} />,
      path: "/teacher/assessment/assignment",
    },
    {
      title: "Create Quiz",
      desc: "Add MCQs, short answers, timer.",
      icon: <HelpCircle size={30} />,
      path: "/teacher/assessment/quiz",
    },
    {
      title: "View Submissions",
      desc: "Track submissions & evaluate.",
      icon: <Inbox size={30} />,
      path: "/teacher/assessment/submissions",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          onClick={() => navigate(card.path)}
          className="cursor-pointer bg-white border border-[#A7E1B2] p-6 rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-full bg-[#E6F4EC] flex items-center justify-center text-[#124734] mb-4">
            {card.icon}
          </div>

          <h3 className="text-lg font-semibold text-[#124734]">{card.title}</h3>
          <p className="text-sm text-[#5B7065] mt-1">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}
