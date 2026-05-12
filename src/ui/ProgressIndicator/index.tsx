import checkIcon from "@/assets/images/check-icon.svg";
import { cn } from "@/utils/cn";

interface IProgressIndicatorProps {
  current: number;
  max: number;
  variant: "dots" | "tiles";
  className?: string;
}

export const ProgressIndicator = ({
  current,
  max,
  variant,
  className,
}: IProgressIndicatorProps) => {
  const isGoalReached = current >= max;

  if (isGoalReached && variant === "dots") {
    return <img src={checkIcon} alt="goal reached" className={className} />;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(max)].map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: indices are stable here
          key={i}
          className={cn(
            "h-2 bg-primary transition-opacity",
            variant === "dots" ? "w-2 rounded-full" : "w-8 rounded-sm",
            i >= current && "opacity-25",
          )}
        />
      ))}
    </div>
  );
};
