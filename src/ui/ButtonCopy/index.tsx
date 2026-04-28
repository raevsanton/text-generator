import copyIcon from "@/assets/images/copy-03.svg";
import { cn } from "@/utils/cn";

interface IButtonCopyProps {
  text: string;
  value: string;
  className?: string;
}

export const ButtonCopy = ({ text, value, className }: IButtonCopyProps) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <button
      className={cn(
        "flex cursor-pointer items-center gap-2 font-semibold text-tertiary transition-colors hover:text-primary",
        className,
      )}
      onClick={handleCopy}
    >
      {text} <img src={copyIcon} alt="copy" />
    </button>
  );
};
