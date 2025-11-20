import { useState, useMemo } from "react";
import QueryItem from "./QueryItem";
import DoubtSearchBar from "./DoubtSearchBar";

export default function DoubtsList({ onSelect, selectedId }) {
  const [search, setSearch] = useState("");

  const [doubts, setDoubts] = useState([
    {
      id: 1,
      student: "Aarav Singh",
      question: "Ma'am, I am not understanding DP Tabulation for Frog Jump.",
      time: "2h ago",
      pinned: true,
      resolved: false,
      unread: 2,
      date: "today",
    },
    {
      id: 2,
      student: "Sneha Verma",
      question: "What is the difference between BFS and DFS in trees?",
      time: "5h ago",
      pinned: false,
      resolved: false,
      unread: 0,
      date: "today",
    },
    {
      id: 3,
      student: "Raghav S.",
      question: "Test cases failing in Binary Search assignment.",
      time: "Yesterday",
      pinned: false,
      resolved: true,
      unread: 1,
      date: "yesterday",
    },
  ]);

  // PIN TOGGLE
  const togglePin = (id) => {
    setDoubts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, pinned: !d.pinned } : d))
    );
  };

  // RESOLVE TOGGLE
  const toggleResolved = (id) => {
    setDoubts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, resolved: !d.resolved } : d))
    );
  };

  // FILTER + SORT PINNED FIRST
  const filtered = useMemo(() => {
    return doubts
      .filter(
        (d) =>
          d.student.toLowerCase().includes(search.toLowerCase()) ||
          d.question.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.pinned - a.pinned);
  }, [search, doubts]);

  // GROUP BY DATE
  const groups = {
    today: filtered.filter((d) => d.date === "today"),
    yesterday: filtered.filter((d) => d.date === "yesterday"),
    older: filtered.filter(
      (d) => d.date !== "today" && d.date !== "yesterday"
    ),
  };

  return (
    <div className="p-4 space-y-4">

      <h2 className="text-xl font-semibold text-[#124734]">
        Student Doubts
      </h2>

      {/* SEARCH BAR */}
      <DoubtSearchBar value={search} onChange={setSearch} />

      {/* TODAY SECTION */}
      {groups.today.length > 0 && (
        <>
          <h3 className="text-xs uppercase text-[#5B7065]">Today</h3>
          {groups.today.map((q) => (
            <QueryItem
              key={q.id}
              data={q}
              selected={selectedId === q.id}
              onClick={() => onSelect(q)}
              onPin={() => togglePin(q.id)}
              onResolve={() => toggleResolved(q.id)}
            />
          ))}
        </>
      )}

      {/* YESTERDAY SECTION */}
      {groups.yesterday.length > 0 && (
        <>
          <h3 className="text-xs uppercase text-[#5B7065]">Yesterday</h3>
          {groups.yesterday.map((q) => (
            <QueryItem
              key={q.id}
              data={q}
              selected={selectedId === q.id}
              onClick={() => onSelect(q)}
              onPin={() => togglePin(q.id)}
              onResolve={() => toggleResolved(q.id)}
            />
          ))}
        </>
      )}

      {/* OLDER SECTION */}
      {groups.older.length > 0 && (
        <>
          <h3 className="text-xs uppercase text-[#5B7065]">Older</h3>
          {groups.older.map((q) => (
            <QueryItem
              key={q.id}
              data={q}
              selected={selectedId === q.id}
              onClick={() => onSelect(q)}
              onPin={() => togglePin(q.id)}
              onResolve={() => toggleResolved(q.id)}
            />
          ))}
        </>
      )}

    </div>
  );
}
