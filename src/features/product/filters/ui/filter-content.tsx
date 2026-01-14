import { useFilters } from "@features/product";
import { useCategoriesQuery } from "@entities/category";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FilterContent = () => {
  const { categories } = useCategoriesQuery();
  const {
    selectedCategories,
    setSelectedCategories,
    selectedColors,
    setSelectedColors,
    selectedOccasions,
    setSelectedOccasions,
    expandedSections,
    setExpandedSections,
    clearFilters,
  } = useFilters();

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleOccasion = (occasion: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasion)
        ? prev.filter((o) => o !== occasion)
        : [...prev, occasion]
    );
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedColors.length +
    selectedOccasions.length;

  const colors = [
    { name: "Красный", hex: "#EF4444" },
    { name: "Розовый", hex: "#EC4899" },
    { name: "Белый", hex: "#FFFFFF" },
    { name: "Желтый", hex: "#FBBF24" },
    { name: "Фиолетовый", hex: "#A855F7" },
    { name: "Оранжевый", hex: "#F97316" },
  ];

  const occasions = [
    { name: "День рождения" },
    { name: "Свадьба" },
    { name: "Сочувствие" },
    { name: "Поправляйся" },
    { name: "Благодарю" },
  ];
  return (
    <div className="space-y-6">
      {activeFiltersCount > 0 && (
        <div className="flex justify-between p-4 bg-rose-50 rounded-xl">
          <span className="text-sm font-medium">
            {activeFiltersCount} filters active
          </span>
          <button
            onClick={clearFilters}
            className="text-sm text-rose-500 font-medium cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Categories */}
      <div className="border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900">Категории</h3>
          {expandedSections.category ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.category && (
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category.name}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-5 h-5 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900">
                    {category.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection("color")}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900">Цвета</h3>
          {expandedSections.color ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.color && (
          <div className="space-y-3">
            {colors.map((color) => (
              <label
                key={color.name}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color.name)}
                      onChange={() => toggleColor(color.name)}
                      className="sr-only"
                    />
                    <div
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColors.includes(color.name)
                          ? "border-rose-500 scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColors.includes(color.name) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-rose-500 rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900">
                    {color.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Occasions */}
      <div>
        <button
          onClick={() => toggleSection("occasion")}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900">Повод</h3>
          {expandedSections.occasion ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.occasion && (
          <div className="space-y-3">
            {occasions.map((occasion) => (
              <label
                key={occasion.name}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedOccasions.includes(occasion.name)}
                    onChange={() => toggleOccasion(occasion.name)}
                    className="w-5 h-5 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900">
                    {occasion.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
