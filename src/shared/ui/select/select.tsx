import { ChevronDownIcon, ChevronUp } from "lucide-react";
import type { SelectOption, SelectProps } from "./select.types";
import { useState, useRef, useEffect } from "react";

export function Select<T>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className = "",
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) || null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: SelectOption<T>) => {
    if (option.disabled) return;
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        className={`w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setOpen(!open)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {open ? <ChevronDownIcon /> : <ChevronUp />}
        </span>
      </button>

      {open && !disabled && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto scrollbar-hide rounded-lg bg-white shadow-lg ring-1 ring-purple-500 ring-opacity-5">
          {options.map((option) => (
            <li
              key={String(option.value)}
              className={`cursor-pointer select-none px-4 py-2 ${
                option.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : option.value === value
                  ? "font-semibold bg-purple-100"
                  : "hover:bg-purple-500 hover:text-white"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
