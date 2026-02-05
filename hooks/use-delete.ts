import { useState } from "react";

interface ConfirmationOptions {
  title: string;
  message: string;
  onConfirm: () => void;
}

export const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationOptions, setConfirmationOptions] =
    useState<ConfirmationOptions | null>(null);

  const confirm = (options: ConfirmationOptions) => {
    setConfirmationOptions(options);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    confirmationOptions?.onConfirm();
    setIsOpen(false);
    setConfirmationOptions(null);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setConfirmationOptions(null);
  };

  return {
    isOpen,
    confirm,
    handleConfirm,
    handleCancel,
    confirmationOptions,
  };
};
