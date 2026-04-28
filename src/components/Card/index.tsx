import trashIcon from "@/assets/images/trash-01.svg";
import { useStore } from "@/store/useStore";
import { ButtonCopy } from "@/ui/ButtonCopy";

interface ICardProps {
  id: string;
  content: string;
}

export const Card = ({ id, content }: ICardProps) => {
  const deleteApplication = useStore((state) => state.deleteApplication);

  return (
    <div className="min-h-60 rounded-xl bg-bg-gray p-6">
      <div className="relative">
        <p className="line-clamp-6 whitespace-pre-wrap">{content}</p>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-bg-gray to-transparent" />
      </div>
      <div className="mt-2 flex items-center justify-between font-semibold text-tertiary">
        <button
          className="flex cursor-pointer items-center gap-2 transition-colors hover:text-primary"
          onClick={() => deleteApplication(id)}
        >
          <img src={trashIcon} alt="delete" /> Delete
        </button>
        <ButtonCopy text="Copy to clipboard" value={content} />
      </div>
    </div>
  );
};
