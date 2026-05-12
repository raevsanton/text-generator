import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Spinner } from "@/ui/Spinner";
import { cn } from "@/utils/cn";
import { BUTTON_VARIANT } from "./types";

const buttonVariants = cva(
  // Common styles
  "flex items-center justify-center gap-2 transition-colors duration-200 rounded-md cursor-pointer disabled:bg-border-dark disabled:text-gray-400 disabled:border-border-dark disabled:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:hover:bg-border-dark font-semibold",
  {
    variants: {
      variant: {
        [BUTTON_VARIANT.PRIMARY]: "bg-brand-primary hover:bg-brand-hover text-white",
        [BUTTON_VARIANT.SECONDARY]:
          "bg-white text-gray-700 border border-border-dark shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-gray-25",
        [BUTTON_VARIANT.DANGER]: "bg-error-base hover:bg-error-dark text-white",
        [BUTTON_VARIANT.GHOST]: "bg-transparent hover:bg-bg-gray text-tertiary hover:text-primary",
      },
      size: {
        default: "px-[18px] py-[10px] text-base",
        lg: "px-7 py-4 text-lg",
      },
      iconOnly: {
        true: "p-2 aspect-square",
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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  iconClassName?: string;
}

export const Button = ({
  children,
  className,
  size,
  variant = BUTTON_VARIANT.PRIMARY,
  iconOnly,
  leftIcon,
  rightIcon,
  iconClassName,
  isLoading,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({ size, variant, iconOnly, className }),
        isLoading && "pointer-events-none",
      )}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {leftIcon && (
            <span className={cn("inline-flex shrink-0", iconClassName)}>{leftIcon}</span>
          )}
          {!iconOnly && children}
          {rightIcon && (
            <span className={cn("inline-flex shrink-0", iconClassName)}>{rightIcon}</span>
          )}
        </>
      )}
    </button>
  );
};
