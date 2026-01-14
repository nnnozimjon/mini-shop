import type { FC } from "react";
import { IconButton } from "@shared/ui";
import type { PageHeaderProps } from "./types";



export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900 leading-tight">
          {title}
        </h1>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>

      {action && (
        <IconButton icon={action.icon} onClick={action.onClick}>
          {action.label}
        </IconButton>
      )}
    </div>
  );
};
