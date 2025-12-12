import { useState } from "react";
import TeacherSidebar from "../../components/Teacher/TeacherSidebar";
import TeacherTopbar from "../../components/Teacher/TeacherTopbar";

import DoubtsList from "../../components/Teacher/Queries/DoubtsList";
import ChatWindow from "../../components/Teacher/Queries/ChatWindow";

export default function QueriesDoubtsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const [selectedDoubt, setSelectedDoubt] = useState(null);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* FIXED SIDEBAR */}
      <div
        className="fixed left-0 top-0 h-full transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <TeacherSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* RIGHT SIDE */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <TeacherTopbar pageTitle="Reply to Doubts" />

        <div className="flex h-full">
          {/* LEFT SIDE = DOUBTS LIST */}
          <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
            <DoubtsList 
              onSelect={(d) => setSelectedDoubt(d)}
              selectedId={selectedDoubt?.id}
            />
          </div>

          {/* RIGHT SIDE = CHAT WINDOW */}
          <div className="flex-1">
            {selectedDoubt ? (
              <ChatWindow doubt={selectedDoubt} />
            ) : (
              <div className="h-full flex items-center justify-center text-[#5B7065]">
                Select a doubt to reply
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
