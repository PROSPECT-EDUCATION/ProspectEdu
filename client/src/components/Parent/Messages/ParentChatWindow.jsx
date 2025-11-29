import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { Paperclip } from "lucide-react";

export default function ParentChatWindow({ chat }) {
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
      attachment: attachment,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Update statuses
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

  // Handle File Upload
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
    <div className="flex flex-col h-full">

      {/* HEADER */}
      <div className="p-4 border-b bg-white flex items-center gap-3">
        <img src={chat.avatar} className="h-12 w-12 rounded-full border border-[#A7E1B2]" />
        <div>
          <h2 className="text-lg font-semibold text-[#124734]">{chat.name}</h2>
          <p className="text-sm text-[#5B7065]">{chat.subject}</p>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FFFA]">
        {messages.map((msg, i) => (
  <MessageBubble
    key={i}
    msg={msg}
    index={i}
    onDelete={(index) => {
      setMessages((prev) => prev.filter((_, j) => j !== index));
    }}
    onEdit={(index, newText) => {
  setMessages((prev) =>
    prev.map((m, j) =>
      j === index ? { ...m, text: newText, edited: true } : m
    )
  );
}}

  />
))}

        <div ref={bottomRef} />
      </div>

      {/* INPUT AREA */}
      <div className="p-4 border-t bg-white flex items-center gap-2">

        {/* File Upload Button */}
        <label className="cursor-pointer p-2 bg-[#E6F4EC] rounded-lg hover:bg-[#CDECD7]">
          <Paperclip size={18} className="text-[#124734]" />
          <input type="file" className="hidden" onChange={handleFile} />
        </label>

        {/* Text Input */}
        <input
          className="flex-1 p-2 border border-[#E6F4EC] rounded-lg outline-[#124734]"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Send Button */}
        <button
          onClick={() => sendMessage()}
          className="px-5 py-2 bg-[#124734] text-white rounded-lg hover:bg-[#0E3A29]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
