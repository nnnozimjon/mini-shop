import type { ModalProps } from "@shared/ui";

export interface DeleteProductModalProps extends Pick<ModalProps, 'isOpen' | "onClose"> {
  refetch?: () => void
  productId: string
}
