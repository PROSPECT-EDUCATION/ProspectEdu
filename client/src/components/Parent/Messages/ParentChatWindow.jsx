import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { Paperclip } from "lucide-react";

export default function ParentChatWindow({ chat, onBack }) {
  const [messages, setMessages] = useState([
    {
      from: "teacher",
      text: chat.lastMessage || "Hello, how can I assist you?",
      time: "12:45 PM",
      status: "seen",
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (attachment = null) => {
    if (!input.trim() && !attachment) return;

    const newMsg = {
      from: "parent",
      text: input || "",
      attachment,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, status: "delivered" } : m
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, status: "seen" } : m
        )
      );
    }, 1500);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const attachment = {
      type: file.type.startsWith("image") ? "image" : "file",
      url: URL.createObjectURL(file),
      name: file.name,
    };

    sendMessage(attachment);
  };

  return (
    <div className="flex flex-col h-full w-full">

      {/* HEADER */}
      <div className="p-3 md:p-4 border-b bg-white flex items-center gap-3 sticky top-0 z-10">
        {/* Back button only on mobile */}
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden text-[#124734] text-sm font-medium"
          >
            ← Back
          </button>
        )}

        <img src={chat.avatar} className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-[#A7E1B2]" />

        <div className="truncate">
          <h2 className="text-base md:text-lg font-semibold text-[#124734] truncate">
            {chat.name}
          </h2>
          <p className="text-xs md:text-sm text-[#5B7065] truncate">
            {chat.subject}
          </p>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 bg-[#F8FFFA]">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            msg={msg}
            index={i}
            onDelete={(index) => setMessages((prev) => prev.filter((_, j) => j !== index))}
            onEdit={(index, newText) =>
              setMessages((prev) =>
                prev.map((m, j) => (j === index ? { ...m, text: newText, edited: true } : m))
              )
            }
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* INPUT AREA */}
      <div className="p-3 md:p-4 border-t bg-white flex items-center gap-2 md:gap-3">
        <label className="cursor-pointer p-2 bg-[#E6F4EC] rounded-lg hover:bg-[#CDECD7]">
          <Paperclip size={18} className="text-[#124734]" />
          <input type="file" className="hidden" onChange={handleFile} />
        </label>

        <input
          className="flex-1 p-2 border border-[#E6F4EC] rounded-lg outline-[#124734] text-sm md:text-base"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={() => sendMessage()}
          className="px-4 py-2 md:px-5 md:py-2 bg-[#124734] text-white rounded-lg hover:bg-[#0E3A29] text-sm md:text-base"
        >
          Send
        </button>
      </div>
    </div>
  );
}
