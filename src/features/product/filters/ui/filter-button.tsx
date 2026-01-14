import { SlidersHorizontal } from "lucide-react";

interface Props {
  onClick: () => void;
}

export const FilterButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl"
    >
      <SlidersHorizontal className="w-5 h-5" />
      <span className="font-medium">Filters</span>
    </button>
  );
};
