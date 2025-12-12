import { Link } from "react-router-dom";

export default function DropdownMenu({ items }) {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white shadow-md border border-[#A7E1B2] rounded-md py-2 w-48 z-40">
      {items.map((item, index) => (
        <Link
          key={index}
          to={`/courses/${item.toLowerCase().replace(/\s+/g, "-")}`} // example: "Active Test Series 1" → "/active-test-series-1"
          className="block w-full text-left px-4 py-2 text-sm text-[#124734] hover:bg-[#A7E1B2]/30 hover:text-[#009846] transition"
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
