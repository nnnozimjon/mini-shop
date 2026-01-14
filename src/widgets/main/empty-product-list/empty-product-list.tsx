import type { EmptyProdyctListProps } from "./empty-product-list.types";

export const EmptyProdyctList = ({
  label = "Цветы не найдены",
  description = "Попробуйте изменить параметры поиска или фильтра.",
}: EmptyProdyctListProps) => {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🌸</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{label}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
