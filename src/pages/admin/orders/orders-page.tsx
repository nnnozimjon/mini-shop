import { useOrdersQuery, type Order } from "@entities/order";
import { orderTableColumns, orderItemsColumns } from "./constants";
import { DataTable, EmptyState, PageHeader } from "@widgets/admin";
import { PackagePlus } from "lucide-react";
import { useMemo, useState } from "react";
import { Modal } from "@shared/ui";

const AdminOrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: orders } = useOrdersQuery();

  const columns = useMemo(
    () =>
      orderTableColumns({
        onView: (order) => {
          setSelectedOrder(order);
          setIsModalOpen(true);
        },
      }),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="Manage your store orders" />

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <DataTable
          data={orders}
          columns={columns}
          rowKey={(p) => p.orderId}
          emptyState={
            <EmptyState
              title="No orders yet"
              description="You orders will be listed here"
              icon={<PackagePlus size={24} />}
            />
          }
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Items"
        onSubmit={() => {}}
      >
        <DataTable
          data={selectedOrder?.items ?? []}
          columns={orderItemsColumns}
          rowKey={(p) => p.id}
          emptyState={
            <EmptyState
              title="No orders items yet"
              description="You orders items will be listed here"
              icon={<PackagePlus size={24} />}
            />
          }
        />
      </Modal>
    </div>
  );
};

export default AdminOrdersPage;
