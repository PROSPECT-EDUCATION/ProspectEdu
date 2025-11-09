export default function DropdownMenu({ items }) {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white shadow-md border rounded-md py-2 w-48 z-40">
      {items.map((item, index) => (
        <button
          key={index}
          className="block w-full text-left px-4 py-2 text-sm text-dark hover:bg-blue-50 hover:text-primary"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
