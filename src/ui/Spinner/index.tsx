import { cn } from "@/utils/cn";
import "./index.css";

interface ISpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: ISpinnerProps) => (
  <div className={cn("size-5", className, "spinner")} />
);
