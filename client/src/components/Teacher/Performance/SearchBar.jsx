import { Search } from "lucide-react";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="flex items-center bg-white border border-[#DFF6E6] rounded-lg px-3 py-2">
      <Search size={16} className="text-[#124734] mr-2" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, roll or email"
        className="outline-none text-sm w-60"
      />
    </div>
  );
}
