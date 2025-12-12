import { useState } from "react";
import ParentSidebar from "../../components/Parent/ParentSidebar";
import ParentTopbar from "../../components/Parent/ParentTopbar";

import AnnouncementCard from "../../components/Parent/Announcements/AnnouncementCard";
import AnnouncementModal from "../../components/Parent/Announcements/AnnouncementModal";
import { parentAnnouncements } from "../../data/parentAnnouncements";

export default function ParentAnnouncementsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* SIDEBAR */}
      <div
        className="fixed top-0 left-0 h-full transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <ParentSidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
      </div>

      {/* MAIN */}
      <div 
        className="flex-1 flex flex-col"
        style={{ marginLeft: sidebarWidth }}
      >
        <ParentTopbar pageTitle="Announcements" showStudentSwitcher={false} />

        <div className="p-6 space-y-4 overflow-y-auto">

          {parentAnnouncements.map((a) => (
            <AnnouncementCard
              key={a.id}
              a={a}
              onClick={setSelectedAnnouncement}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedAnnouncement && (
        <AnnouncementModal
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}
    </div>
  );
}
