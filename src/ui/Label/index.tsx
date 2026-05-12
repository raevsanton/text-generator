import { cn } from "@/utils/cn";

interface LabelProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export const Label = ({ id, children, className }: LabelProps) => {
  return (
    <label htmlFor={id} className={cn("mb-2 block font-bold text-gray-700 text-sm", className)}>
      {children}
    </label>
  );
};
