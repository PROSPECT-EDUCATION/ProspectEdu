import { useState, useEffect } from "react";
import ParentSidebar from "../../components/Parent/ParentSidebar";
import ParentTopbar from "../../components/Parent/ParentTopbar";

import ConversationList from "../../components/Parent/Messages/ConversationList";
import ParentChatWindow from "../../components/Parent/Messages/ParentChatWindow";

export default function ParentMessagesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const [selectedChat, setSelectedChat] = useState(null);

  /* ----------------- RESIZABLE LEFT PANEL ----------------- */
  const [panelWidth, setPanelWidth] = useState(300); // starting width
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const newWidth = Math.min(
      Math.max(200, e.clientX - sidebarWidth),
      450
    );

    setPanelWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, sidebarWidth]);

  /* -------------------------------------------------------- */

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
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>

        {/* TOPBAR */}
        <ParentTopbar pageTitle="Messages" showStudentSwitcher={false} />

        {/* CONTENT: RESIZABLE LAYOUT */}
        <div className="flex h-full">

          {/* LEFT: CONVERSATION LIST */}
          <div
            className="bg-white border-r border-[#E6F4EC]"
            style={{ width: panelWidth }}
          >
            <ConversationList onSelect={(chat) => setSelectedChat(chat)} />
          </div>

          {/* DRAGGABLE DIVIDER */}
          <div
            onMouseDown={startResizing}
            className="w-1 cursor-ew-resize bg-[#E6F4EC] hover:bg-[#CDECD7] transition"
          ></div>

          {/* RIGHT: CHAT WINDOW */}
          <div className="flex-1 bg-[#F9FAFB]">
            {selectedChat ? (
              <ParentChatWindow chat={selectedChat} />
            ) : (
              <div className="flex items-center justify-center h-full text-[#5B7065]">
                Select a conversation to start messaging
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
