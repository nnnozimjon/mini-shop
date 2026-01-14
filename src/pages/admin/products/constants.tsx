import type { Product, ProductColumnProps } from "@entities/product";
import type { DataTableColumn } from "@widgets/admin";

export const productTableColumns = ({ onEdit, onDelete }: ProductColumnProps): DataTableColumn<Product>[] => [
  {
    key: "image",
    header: "Image",
    render: (p: Product) => (
      <img src={p.image as string} alt="" className="size-8 rounded-sm" />
    ),
  },
  {
    key: "name",
    header: "Product",
    render: (p: any) => (
      <span className="font-medium text-slate-900">{p.name}</span>
    ),
  },
  {
    key: "price",
    header: "Price",
    render: (p: any) => `$${p.price}`,
  },
  {
    key: "description",
    header: "Description",
  },
  {
    key: "actions",
    header: "Actions",
    align: "right",
    render: (p) => (
      <div className="flex gap-4 justify-end">
        <button onClick={() => onEdit(p)} className="text-slate-600 hover:text-slate-900 transition cursor-pointer">
          Edit
        </button>
        <button onClick={() => onDelete(p)} className="text-slate-600 hover:text-slate-900 transition cursor-pointer">
          Delete
        </button>
      </div>
    ),
  },
];
