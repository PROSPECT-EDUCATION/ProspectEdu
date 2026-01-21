import { useEffect, useState } from "react";
import ParentSidebar from "../../components/Parent/ParentSidebar";
import ParentTopbar from "../../components/Parent/ParentTopbar";

import AnnouncementCard from "../../components/Parent/Announcements/AnnouncementCard";
import AnnouncementModal from "../../components/Parent/Announcements/AnnouncementModal";
import { api } from "../../lib/api";

export default function ParentAnnouncementsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      // ✅ Parent will receive only those announcements where recipients includes "parent"
      const res = await api.get("/announcements/me/for-me");
      setItems(res?.data?.data || []);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  (async () => {
    try {
      // ✅ mark all announcements as read when opening this page
      await api.post("/announcements/me/mark-all-read");
      window.dispatchEvent(new Event("announcements:refresh"));

    } catch (e) {
      // ignore
    }
    load();
  })();
}, []);


  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      {/* SIDEBAR */}
      <div
        className="fixed top-0 left-0 h-full transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <ParentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        <ParentTopbar pageTitle="Announcements" showStudentSwitcher={false} />

        <div className="p-6 space-y-4 overflow-y-auto text-left">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-500">No announcements.</p>
          ) : (
            items.map((a) => (
              <AnnouncementCard
                key={a._id}
                a={{ ...a, id: a._id }} // ✅ keep compatibility if card uses a.id
              />
            ))
          )}
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
