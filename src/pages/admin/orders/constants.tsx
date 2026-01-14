import type { Order, OrderItem, OrderColumnsProps } from "@entities/order";
import type { DataTableColumn } from "@widgets/admin";

export const orderTableColumns = ({
  onView,
}: OrderColumnsProps): DataTableColumn<Order>[] => [
  {
    key: "orderId",
    header: "Order ID",
    render: (o) => (
      <span className="font-mono text-xs text-slate-600">
        {o.orderId.slice(0, 8)}…
      </span>
    ),
  },
  {
    key: "fullName",
    header: "Customer",
    render: (o) => (
      <div>
        <div className="font-medium text-slate-900">{o.fullName}</div>
        <div className="text-xs text-slate-500">{o.userEmail}</div>
      </div>
    ),
  },
  {
    key: "totalPrice",
    header: "Total",
    render: (o) => `$${o.totalPrice}`,
  },
  {
    key: "itemsCount",
    header: "Items",
    align: "center",
  },
  {
    key: "status",
    header: "Status",
    render: (o) => (
      <span className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700">
        {o.status}
      </span>
    ),
  },
  {
    key: "createdAt",
    header: "Created",
    render: (o) => new Date(o.createdAt).toLocaleDateString(),
  },
  {
    key: "actions",
    header: "Actions",
    align: "right",
    render: (order) => (
      <button
        onClick={() => onView(order)}
        className="text-slate-600 hover:text-slate-900 transition"
      >
        View
      </button>
    ),
  },
];

export const orderItemsColumns: DataTableColumn<OrderItem>[] = [
  {
    key: "productImage",
    header: "Image",
    render: (item) => (
      <img
        src={item.productImage}
        alt={item.productName}
        className="size-10 rounded-md object-cover"
      />
    ),
  },
  {
    key: "productName",
    header: "Product",
    render: (item) => (
      <span className="font-medium text-slate-900">{item.productName}</span>
    ),
  },
  {
    key: "quantity",
    header: "Qty",
    align: "center",
    render: (item) => <span className="font-medium">{item.quantity}</span>,
  },
  {
    key: "price",
    header: "Price",
    align: "right",
    render: (item) => <span>${item.price}</span>,
  },
  {
    key: "total",
    header: "Total",
    align: "right",
    render: (item) => (
      <span className="font-semibold">${item.price * item.quantity}</span>
    ),
  },
];
