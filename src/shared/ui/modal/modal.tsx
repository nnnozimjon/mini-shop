import { X } from "lucide-react";
import type { ModalProps } from "./modal.types";
import { IconButton } from "@shared/ui";

export const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  title,
  children,
  action = {
    cancelLabel: "Cancel",
    submitLabel: "Submit",
  }
}: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg mx-4 rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        <div className="h-fit max-h-[60vh] overflow-y-scroll scrollbar-hide px-6 py-4 space-y-4">
          {children}
        </div>

        {/* footer */}
        <div className="flex justify-end gap-3 pt-4 m-4 mx-0 px-4 border-t border-gray-300">
          <IconButton onClick={onClose} variant="ghost">{action.cancelLabel}</IconButton>
          <IconButton onClick={onSubmit} disabled={loading}>
            {loading ? "loading..." : action.submitLabel}
          </IconButton>
        </div>
      </div>
    </div>
  );
};
