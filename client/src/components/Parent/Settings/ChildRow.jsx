import { User2 } from "lucide-react";
import { useConfirm } from "../../../context/ConfirmContext";
import { useToast } from "../../../context/ToastContext";

export default function ChildRow({ child, onRemove }) {
  const { openConfirm } = useConfirm();
  const { showToast } = useToast();

  const handleRemoveClick = () => {
    openConfirm(
      "Remove Child?",
      `Are you sure you want to remove ${child.name}?`,
      () => {
        onRemove();
        showToast("Child removed successfully", "success");
      }
    );
  };

  return (
    <div className="flex items-center justify-between p-4 border border-[#F0F6F2] rounded-lg">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[#E6F4EC] flex items-center justify-center text-[#124734]">
          <User2 />
        </div>

        <div>
          <p className="font-semibold text-[#124734]">{child.name}</p>
          <p className="text-sm text-[#5B7065] mt-1">
            Course: <span className="font-medium text-[#124734]">{child.class || child.course || "—"}</span>
            {" • "}
            Roll: <span className="font-medium text-[#124734]">{child.roll || child.rollNo || "—"}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleRemoveClick}
          className="px-3 py-1 bg-white border border-red-100 text-red-600 rounded-md hover:bg-red-50"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
