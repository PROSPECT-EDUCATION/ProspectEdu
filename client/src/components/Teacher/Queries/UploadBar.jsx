import { Paperclip, ImageIcon } from "lucide-react";

export default function UploadBar() {
  return (
    <div className="px-4 py-2 border-t bg-white">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-[#124734]">
          <Paperclip size={18} />
          <input type="file" className="hidden" />
          File
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-[#124734]">
          <ImageIcon size={18} />
          <input type="file" accept="image/*" className="hidden" />
          Screenshot
        </label>
      </div>
    </div>
  );
}
