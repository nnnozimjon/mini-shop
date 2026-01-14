import type { DataTableProps } from "./types";

export function DataTable<T>({
  data,
  columns,
  rowKey,
  emptyState,
}: DataTableProps<T>) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      {data.length === 0 && emptyState ? (
        emptyState
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-slate-600">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className={`px-6 py-3 font-medium ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {data.map((row) => (
                <tr key={rowKey(row)} className="hover:bg-slate-50 transition">
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`px-6 py-4 ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left"
                      }`}
                    >
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
