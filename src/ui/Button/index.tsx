import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Spinner } from "@/ui/Spinner";
import { cn } from "@/utils/cn";
import { BUTTON_VARIANT } from "./types";

const buttonVariants = cva(
  // Common styles
  "flex items-center justify-center gap-2 transition-colors duration-200 rounded-md cursor-pointer disabled:bg-border-dark disabled:text-[#98A2B3] disabled:border-border-dark disabled:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:hover:bg-border-dark font-semibold",
  {
    variants: {
      variant: {
        [BUTTON_VARIANT.PRIMARY]: "bg-brand-primary hover:bg-brand-hover text-white",
        [BUTTON_VARIANT.SECONDARY]:
          "bg-white text-[#344054] border border-border-dark shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#F9FAFB]",
      },
      size: {
        default: "px-[18px] py-[10px] text-base",
        lg: "px-7 py-4 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type TButtonVariants = VariantProps<typeof buttonVariants>;

interface IButtonProps extends ComponentProps<"button">, TButtonVariants {
  variant?: TButtonVariants["variant"];
  leadingIcon?: React.ReactNode;
  isLoading?: boolean;
  leadingIconClassName?: string;
}

export const Button = ({
  children,
  className,
  size,
  leadingIcon,
  leadingIconClassName,
  isLoading,
  variant = BUTTON_VARIANT.PRIMARY,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({ size, variant, className }),
        isLoading && "pointer-events-none",
      )}
      {...props}
    >
      {leadingIcon && (
        <span className={cn("inline-flex shrink-0", leadingIconClassName)}>{leadingIcon}</span>
      )}
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
