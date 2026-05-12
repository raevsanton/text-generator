import { memo, useState } from "react";
import trashIcon from "@/assets/images/trash-01.svg";
import { useStore } from "@/store/useStore";
import { Button } from "@/ui/Button";
import { ButtonCopy } from "@/ui/Button/ButtonCopy";
import { BUTTON_VARIANT } from "@/ui/Button/types";
import { Modal } from "@/ui/Modal";

interface ICardProps {
  id: string;
  content: string;
}

export const Card = memo(({ id, content }: ICardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteApplication = useStore((state) => state.deleteApplication);

  return (
    <>
      <div className="min-h-60 rounded-xl bg-bg-gray p-6">
        <div className="relative">
          <p className="line-clamp-6 whitespace-pre-wrap">{content}</p>
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-bg-gray to-transparent" />
        </div>
        <div className="mt-2 flex items-center justify-between font-semibold text-tertiary">
          <Button
            variant={BUTTON_VARIANT.GHOST}
            onClick={() => setIsModalOpen(true)}
            leftIcon={<img src={trashIcon} alt="delete" />}
            className="px-0 hover:bg-transparent"
          >
            Delete
          </Button>
          <ButtonCopy content={content} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => deleteApplication(id)}
        title="Delete application"
        message="Are you sure you want to delete this application? This action cannot be undone."
        confirmText="Yes, delete"
        cancelText="No, keep it"
      />
    </>
  );
});

Card.displayName = "Card";
