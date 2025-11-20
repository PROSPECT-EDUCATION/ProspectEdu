import { Pencil, Trash, Check, CheckCheck } from "lucide-react";
import { useState } from "react";

export default function MessageBubble({
  m,
  index,
  onDelete,
  onEditSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(m.text);

  return (
    <div
      className={`p-3 rounded-lg max-w-md ${
        m.from === "teacher"
          ? "ml-auto bg-[#DFF6E6] text-[#124734]"
          : "bg-white border text-[#124734]"
      }`}
    >
      {/* EDIT MODE */}
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border p-1 rounded-md outline-[#124734]"
          />

          <button
            onClick={() => {
              onEditSave(index, editValue);
              setIsEditing(false);
            }}
            className="text-xs px-2 py-1 bg-[#124734] text-white rounded-md self-end"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          {/* Text + buttons */}
          <div className="flex justify-between items-start gap-4">
            <p className="flex-1">{m.text}</p>

            {m.from === "teacher" && (
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 bg-white border rounded-full hover:bg-gray-100"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => onDelete(index)}
                  className="p-1 bg-white border rounded-full hover:bg-gray-100"
                >
                  <Trash size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Timestamp + edited + ticks */}
          <div className="mt-1 flex items-center gap-2 text-xs text-[#5B7065]">
            {/* timestamp */}
            <span>{m.time}</span>

            {/* edited */}
            {m.edited && (
              <span className="italic text-[#2F6B4F]">(edited)</span>
            )}

            {/* ticks (teacher only) */}
            {m.from === "teacher" && (
              <>
                {m.status === "sent" && <Check size={14} />}
                {m.status === "delivered" && <CheckCheck size={14} className="text-gray-500" />}
                {m.status === "seen" && <CheckCheck size={14} className="text-[#124734]" />}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
