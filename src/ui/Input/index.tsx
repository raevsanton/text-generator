import { forwardRef } from "react";
import { Label } from "@/ui/Label";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classNames?: {
    wrapper?: string;
    label?: string;
    input?: string;
  };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, classNames, ...props }, ref) => {
    return (
      <div className={classNames?.wrapper}>
        {label && (
          <Label
            id={props.id}
            className={cn("mb-[6px] block font-medium text-gray-700 text-sm", classNames?.label)}
          >
            {label}
          </Label>
        )}
        <input
          {...props}
          ref={ref}
          className={cn(
            "block w-full rounded-lg border border-border-dark bg-white px-3 py-2 text-primary shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-hidden transition-all placeholder:text-secondary focus:border-success-200 focus:shadow-focus-success",
            classNames?.input,
          )}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
