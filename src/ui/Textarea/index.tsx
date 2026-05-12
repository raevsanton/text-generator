import { forwardRef } from "react";
import { Label } from "@/ui/Label";
import { cn } from "@/utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  limit?: number;
  classNames?: {
    wrapper?: string;
    label?: string;
    textarea?: string;
  };
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, rows = 8, limit, classNames, value, defaultValue, ...props }, ref) => {
    const currentValue = (value as string) || (defaultValue as string) || "";
    const trimmedValue = currentValue.trim();
    const isError = typeof limit !== "undefined" && trimmedValue.length > limit;

    const baseStyles =
      "block w-full resize-none rounded-lg border bg-white px-3 py-2 text-primary shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-hidden transition-all placeholder:text-secondary";

    const statusStyles = isError
      ? "border-error-light focus:border-error-light focus:shadow-focus-error"
      : "border-border-dark focus:border-success-200 focus:shadow-focus-success";

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
        <textarea
          ref={ref}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          {...props}
          className={cn(baseStyles, statusStyles, classNames?.textarea)}
        />
        {typeof limit !== "undefined" ? (
          <div className={cn("mt-[6px] text-sm", isError ? "text-error-base" : "text-tertiary")}>
            {trimmedValue.length}/{limit}
          </div>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
