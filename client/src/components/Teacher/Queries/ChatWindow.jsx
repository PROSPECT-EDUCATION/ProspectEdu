import { useEffect, useRef, useState } from "react";
import UploadBar from "./UploadBar";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ doubt }) {
  const [messages, setMessages] = useState([
    {
      from: "student",
      text: doubt.question,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      edited: false,
      status: "seen", // student message always seen
    },
  ]);

  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        from: "teacher",
        text: input,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        edited: false,
        status: "sent", // first status
      },
    ]);

    setInput("");

    // simulate delivery + seen (fake but realistic)
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, status: "delivered" } : m
        )
      );
    }, 600);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, status: "seen" } : m
        )
      );
    }, 1500);
  };

  const deleteMessage = (index) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const editMessage = (index, newText) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, text: newText, edited: true }
          : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <h2 className="text-lg font-semibold text-[#124734]">
          {doubt.student}
        </h2>
        <p className="text-sm text-[#5B7065]">Doubt Discussion</p>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FFFA]">

        {messages.map((m, index) => (
          <MessageBubble
            key={index}
            m={m}
            index={index}
            onDelete={deleteMessage}
            onEditSave={editMessage}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Upload bar */}
      <UploadBar />

      {/* Message input */}
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          className="flex-1 p-2 border rounded-lg outline-[#124734]"
          placeholder="Type your reply..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={send}
          className="px-4 bg-[#124734] text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
