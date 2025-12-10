import {
  Pencil,
  Trash,
  Check,
  CheckCheck,
  Paperclip,
} from "lucide-react";
import { useState } from "react";

export default function MessageBubble({
  msg,
  index,
  onDelete,
  onEdit,
}) {
  const isParent = msg.from === "parent";

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(msg.text);

  const iconColor = isParent ? "text-white" : "text-[#124734]";
  const iconBtnBg = isParent ? "bg-[#0E3A29]" : "bg-white";

  return (
    <div
      className={`p-3 rounded-lg max-w-[85%] md:max-w-md break-words ${
        isEditing
          ? "ml-auto bg-white text-[#124734] border"
          : isParent
          ? "ml-auto bg-[#124734] text-white"
          : "bg-white border text-[#124734]"
      }`}
    >

      {/* EDIT MODE */}
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border p-2 rounded-md outline-[#124734] text-black text-sm"
          />

          <div className="flex justify-end gap-2 text-xs">
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-gray-200 rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onEdit(index, editValue);
                setIsEditing(false);
              }}
              className="px-2 py-1 bg-[#124734] text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start gap-2 md:gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base break-words">{msg.text}</p>

              {/* Edited Label */}
              {msg.edited && (
                <p classWind="text-[10px] opacity-70 mt-1 italic">
                  (edited)
                </p>
              )}

              {/* Attachment */}
              {msg.attachment && (
                <div className="mt-2">
                  {msg.attachment.type === "image" ? (
                    <img
                      src={msg.attachment.url}
                      className="rounded-lg border w-32 md:w-40"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-lg bg-white text-[#124734] mt-2">
                      <Paperclip size={16} />
                      <span className="text-xs truncate max-w-[100px] md:max-w-[150px]">
                        {msg.attachment.name}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            {isParent && (
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className={`p-1 ${iconBtnBg} border rounded-full hover:opacity-80`}
                >
                  <Pencil size={14} className={iconColor} />
                </button>

                <button
                  onClick={() => onDelete(index)}
                  className={`p-1 ${iconBtnBg} border rounded-full hover:opacity-80`}
                >
                  <Trash size={14} className={iconColor} />
                </button>
              </div>
            )}
          </div>

          {/* Time + Status */}
          <div className="mt-1 flex items-center gap-2 text-[10px] md:text-xs opacity-80">
            <span>{msg.time}</span>

            {isParent && (
              <>
                {msg.status === "sent" && <Check size={14} />}
                {msg.status === "delivered" && (
                  <CheckCheck size={14} className="text-gray-300" />
                )}
                {msg.status === "seen" && (
                  <CheckCheck size={14} className="text-blue-300" />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
