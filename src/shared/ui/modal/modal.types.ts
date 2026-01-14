import type React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e?: any) => void;
  loading?: boolean;
  title?: string;
  children?: React.ReactNode
  action?: {
    cancelLabel?: string;
    submitLabel?: string;
  }
}