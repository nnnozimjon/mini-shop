import type { FC } from "react";
import { IconButton } from "@shared/ui";
import type { EmptyStateProps } from "./types";


export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {icon && (
        <div className="mb-4 h-12 w-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-500">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          {description}
        </p>
      )}

      {action && (
        <IconButton
          icon={action.icon}
          onClick={action.onClick}
          className="mt-6"
        >
          {action.label}
        </IconButton>
      )}
    </div>
  );
};
