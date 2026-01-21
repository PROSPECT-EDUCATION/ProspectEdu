import StudentCard from "./StudentCard";

export default function StudentsGrid({ students, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((s) => (
        <StudentCard key={s.id} student={s} onSelect={onSelect} />
      ))}
    </div>
  );
}
