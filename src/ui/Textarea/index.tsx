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

export const Textarea = ({ label, rows = 8, limit, classNames, ...props }: TextareaProps) => {
  const isError = typeof limit !== "undefined" && ((props.value as string)?.length || 0) > limit;

  const baseStyles =
    "block w-full resize-none rounded-lg border bg-white px-3 py-2 text-primary shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-hidden transition-all placeholder:text-secondary";

  const statusStyles = isError
    ? "border-error-light focus:border-error-light focus:shadow-[0px_0px_0px_4px_#FEE4E2,0px_1px_2px_0px_rgba(16,24,40,0.05)]"
    : "border-border-dark focus:border-[#73E2A3] focus:shadow-[0px_0px_0px_4px_#D3F8DF,0px_1px_2px_0px_rgba(16,24,40,0.05)]";

  return (
    <div className={classNames?.wrapper}>
      {label && (
        <Label
          id={props.id}
          className={cn("mb-[6px] block font-medium text-[#344054] text-sm", classNames?.label)}
        >
          {label}
        </Label>
      )}
      <textarea
        rows={rows}
        {...props}
        className={cn(baseStyles, statusStyles, classNames?.textarea)}
      />
      {typeof limit !== "undefined" ? (
        <div className={cn("mt-[6px] text-sm", isError ? "text-error-base" : "text-tertiary")}>
          {(props.value as string)?.length || 0}/{limit}
        </div>
      ) : null}
    </div>
  );
};
