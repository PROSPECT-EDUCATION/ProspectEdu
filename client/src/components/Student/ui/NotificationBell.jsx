import React, { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { api } from "../../../lib/api";

const prettyDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  } catch {
    return "";
  }
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const wrapRef = useRef(null);

  const load = async () => {
    try {
      const res = await api.get("/announcements/me/for-me");
      setItems(res?.data?.data || []);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 20000); // auto refresh every 20 sec
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const count = items.length;

  return (
    <div className="relative text-left" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Bell className="text-[#124734]" size={22} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[320px] bg-white shadow-xl rounded-xl border z-50 overflow-hidden">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold text-[#124734]">Announcements</p>
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {items.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">No announcements</p>
            ) : (
              items.slice(0, 8).map((a) => (
                <div key={a._id} className="px-4 py-3 border-b">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-gray-800 line-clamp-1">{a.title}</p>
                    <span className="text-[11px] text-gray-500">{prettyDate(a.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{a.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
