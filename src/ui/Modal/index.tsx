import { createPortal } from "react-dom";
import { Button } from "@/ui/Button";
import { BUTTON_VARIANT } from "@/ui/Button/types";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Yes",
  cancelText = "No",
}: IModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="fixed inset-0 bg-overlay/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        tabIndex={-1}
        aria-label="Close modal"
      />
      <div className="relative w-full max-w-md scale-100 transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
        <h3 className="font-semibold text-lg text-primary">{title}</h3>
        <p className="mt-2 text-secondary">{message}</p>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant={BUTTON_VARIANT.SECONDARY} onClick={onClose} className="w-full sm:w-auto">
            {cancelText}
          </Button>
          <Button variant={BUTTON_VARIANT.DANGER} onClick={onConfirm} className="w-full sm:w-auto">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
