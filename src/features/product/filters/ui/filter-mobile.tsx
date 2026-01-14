import { X } from "lucide-react";
import { FilterContent } from "./filter-content";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const FilterMobile = ({ open, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white flex flex-col">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <FilterContent />
        </div>

        <div className=" p-6">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 text-white font-semibold"
          >
            Show products
          </button>
        </div>
      </div>
    </div>
  );
};
