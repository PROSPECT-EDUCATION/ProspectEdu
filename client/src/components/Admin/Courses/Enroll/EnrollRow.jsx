import React, { useState } from "react";
import ConfirmDialog from "../../../ui/ConfirmDialog";
import { useToast } from "../../../../context/ToastContext";

export default function EnrollRow({ student, setEnrolled }) {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  const removeStudent = () => {
    setEnrolled((prev) => prev.filter((s) => s.id !== student.id));
    showToast("Enrollment removed successfully!", "success");
  };

  return (
    <>
       <tr className="border-t">
      <td className="p-3 w-24">{student.roll}</td>
      <td className="p-3 w-40">{student.name}</td>
      <td className="p-3 w-48">{student.course}</td>
      <td className="p-3 w-40">{student.date}</td>

      <td className="p-3 text-center w-32">
        <button
          onClick={removeStudent}
          className="text-red-500 hover:underline"
        >
          Remove
           </button>
        </td>
      </tr>

      <ConfirmDialog
        open={open}
        title="Remove Enrollment?"
        message="Are you sure you want to remove this student's enrollment?"
        onConfirm={() => {
          removeStudent();
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
