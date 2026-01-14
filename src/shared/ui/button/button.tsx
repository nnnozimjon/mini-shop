import { colors } from "./constants";
import type { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  color = "purple",
  rounded = true,
  children,
  className = "",
  ...props
}) => {
  let baseClasses = "px-4 py-2 font-semibold transition w-full";

  if (rounded) baseClasses += " rounded-full";
  else baseClasses += " rounded-md";

  let variantClasses = "";
  if (variant === "solid") variantClasses = colors[color] || colors.purple;
  else if (variant === "outline")
    variantClasses = `border ${color}-500 text-${color}-500 hover:bg-${color}-500 hover:text-white`;
  else if (variant === "ghost")
    variantClasses = `bg-transparent text-${color}-500 hover:bg-${color}-100`;

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
