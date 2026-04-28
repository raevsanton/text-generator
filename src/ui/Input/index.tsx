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

export const Input = ({ label, classNames, ...props }: InputProps) => {
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
      <input
        {...props}
        required={props.required}
        className={cn(
          "block w-full rounded-lg border border-border-dark bg-white px-3 py-2 text-primary shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-hidden transition-all placeholder:text-secondary focus:border-[#73E2A3] focus:shadow-[0px_0px_0px_4px_#D3F8DF,0px_1px_2px_0px_rgba(16,24,40,0.05)]",
          classNames?.input,
        )}
      />
    </div>
  );
};
