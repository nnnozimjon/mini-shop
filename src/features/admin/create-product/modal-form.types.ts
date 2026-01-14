import type { ModalProps } from "@shared/ui";

export interface FormState {
  title: string;
  price: string;
  description: string;
  categoryId: string;
  image: File | null;
  preview: string | null;
}

export interface CreateProductModalFormProps extends Pick<ModalProps, 'isOpen' | "onClose"> {
  refetch?: () => void
}
