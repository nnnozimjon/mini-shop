import { Modal } from "@shared/ui";
import type { DeleteProductModalProps } from "./delete-modal.types";
import { useDeleteProductQuery } from "@entities/product";

export const DeleteProductModal = ({
  isOpen,
  onClose,
  productId,
  refetch = () => {},
}: DeleteProductModalProps) => {
  const { deleteProduct } = useDeleteProductQuery(productId);
  const handleDelete = async () => {
    await deleteProduct();
    refetch();
    onClose();
  };
  return (
    <Modal
      title="Удалить продукт"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDelete}
      action={{
        cancelLabel: "Отменить",
        submitLabel: "Удалить",
      }}
    >
      <div className="flex items-center justify-center h-full w-full">
        <h1>Вы действительно хотите удалить продукт?</h1>
      </div>
    </Modal>
  );
};
