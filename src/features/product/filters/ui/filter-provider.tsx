import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface FiltersState {
  selectedCategories: string[];
  selectedColors: string[];
  selectedOccasions: string[];
  expandedSections: {
    category: boolean;
    price: boolean;
    color: boolean;
    occasion: boolean;
  };
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedOccasions: React.Dispatch<React.SetStateAction<string[]>>;
  setExpandedSections: React.Dispatch<
    React.SetStateAction<FiltersState["expandedSections"]>
  >;
  clearFilters: () => void
}

const FiltersContext = createContext<FiltersState | undefined>(undefined);

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: true,
    occasion: true,
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedOccasions([]);
    setExpandedSections({
      category: true,
      price: true,
      color: true,
      occasion: true,
    });
  };

  return (
    <FiltersContext.Provider
      value={{
        selectedCategories,
        selectedColors,
        selectedOccasions,
        expandedSections,
        setSelectedCategories,
        setSelectedColors,
        setSelectedOccasions,
        setExpandedSections,
        clearFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
