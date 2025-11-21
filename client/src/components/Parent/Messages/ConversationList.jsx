import { useState } from "react";

export default function ConversationList({ onSelect }) {
  // Dummy Chat List (replace with API later)
  const conversations = [
    {
      id: 1,
      name: "Mrs. Shalini Gupta",
      subject: "Mathematics",
      avatar: "/src/assets/profile.png",
      lastMessage: "Riya performed very well today.",
      time: "12:45 PM",
      unread: 2,
    },
    {
      id: 2,
      name: "Mr. Ramesh Verma",
      subject: "Science",
      avatar: "/src/assets/profile.png",
      lastMessage: "Test on Monday. Please prepare.",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Ms. Neha Kapoor",
      subject: "English",
      avatar: "/src/assets/profile.png",
      lastMessage: "Submitted Assignment 4.",
      time: "Tue",
      unread: 1,
    },
  ];

  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (chat) => {
    setSelectedId(chat.id);
    onSelect(chat); // send the entire conversation object upward
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      <h2 className="text-lg font-semibold text-[#124734] px-5 py-4 border-b border-[#E6F4EC]">
        Conversations
      </h2>

      {conversations.map((chat) => (
        <div
          key={chat.id}
          className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition border-b border-[#F0F0F0]
            ${
              selectedId === chat.id
                ? "bg-[#E6F4EC] border-l-4 border-[#009846]"
                : "hover:bg-[#F4FBF7]"
            }
          `}
          onClick={() => handleSelect(chat)}
        >
          {/* Avatar */}
          <img
            src={chat.avatar}
            className="h-12 w-12 rounded-full border border-[#A7E1B2]"
          />

          {/* Text Content */}
          <div className="flex-1">
            <h3 className="font-semibold text-[#124734]">{chat.name}</h3>
            <p className="text-xs text-[#5B7065]">{chat.subject}</p>

            <p className="text-sm text-[#5B7065] truncate mt-1">
              {chat.lastMessage}
            </p>
          </div>

          {/* Time + Unread */}
          <div className="text-right">
            <p className="text-xs text-[#98A6A2]">{chat.time}</p>

            {chat.unread > 0 && (
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#009846] text-white text-xs">
                {chat.unread}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
