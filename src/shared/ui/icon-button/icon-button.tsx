import type { FC } from "react";
import clsx from "clsx";
import type { ButtonVariant, ButtonProps } from "./types";


const baseStyles =
  "inline-flex items-center py-4 justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800",
  secondary:
    "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100",
  danger:
    "bg-red-600 text-white hover:bg-red-500",
};

export const IconButton: FC<ButtonProps> = ({
  children,
  icon,
  variant = "primary",
  isLoading = false,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {!isLoading && icon}
      {children}
    </button>
  );
};
