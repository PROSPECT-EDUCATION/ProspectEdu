import { Check, CheckCheck, Paperclip } from "lucide-react";

export default function MessageBubble({ msg }) {
  const isParent = msg.from === "parent";

  const bubbleStyle = isParent
    ? "bg-[#124734] text-white rounded-br-none"
    : "bg-white border border-[#E6F4EC] text-[#124734] rounded-bl-none";

  return (
    <div className={`flex ${isParent ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs p-3 rounded-xl shadow-sm text-sm ${bubbleStyle}`}>

        {/* TEXT */}
        <p>{msg.text}</p>

        {/* ATTACHMENT */}
        {msg.attachment && (
          <div className="mt-2">
            {msg.attachment.type === "image" ? (
              <img
                src={msg.attachment.url}
                className="rounded-lg border w-40"
              />
            ) : (
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-white text-[#124734] mt-1">
                <Paperclip size={16} />
                <span className="text-xs">{msg.attachment.name}</span>
              </div>
            )}
          </div>
        )}

        {/* TIME + STATUS */}
        <div className="flex justify-end gap-1 items-center mt-2">
          <p className="text-[10px] opacity-60">{msg.time}</p>

          {isParent && (
            <>
              {msg.status === "sent" && <Check size={12} className="opacity-60" />}
              {msg.status === "delivered" && <CheckCheck size={12} className="opacity-60" />}
              {msg.status === "seen" && (
                <CheckCheck size={12} className="text-blue-300" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
