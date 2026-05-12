import { memo, useState } from "react";
import checkIcon from "@/assets/images/check-icon.svg";
import copyIcon from "@/assets/images/copy-03.svg";
import { Button } from "@/ui/Button";
import { BUTTON_VARIANT } from "@/ui/Button/types";
import { cn } from "@/utils/cn";

interface ButtonCopyProps {
  content: string;
  className?: string;
}

export const ButtonCopy = memo(({ content, className }: ButtonCopyProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <Button
      variant={BUTTON_VARIANT.GHOST}
      onClick={handleCopy}
      rightIcon={<img src={isCopied ? checkIcon : copyIcon} alt="copy" className="h-5 w-5" />}
      className={cn("px-0 hover:bg-transparent", className)}
    >
      {isCopied ? "Copied!" : "Copy to clipboard"}
    </Button>
  );
});

ButtonCopy.displayName = "ButtonCopy";
