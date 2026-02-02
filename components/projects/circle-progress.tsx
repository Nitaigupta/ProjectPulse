import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";

type VariantType = "default" | "success" | "warning" | "inProgress";
type DisplayMode = "percentage" | "count";

interface CircleProps {
  title: string;
  value: number;
  subTitle: string;
  variant: VariantType;
  mode?: DisplayMode; // optional, defaults to percentage
}

const variantStyles: Record<VariantType, string> = {
  default: "text-blue-500",
  success: "text-green-600",
  warning: "text-red-600",
  inProgress: "text-yellow-600",
};

export const CircleProgress = ({
  title,
  value,
  subTitle,
  variant,
  mode = "percentage",
}: CircleProps) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </h3>

      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Circular progress */}
        <Progress
          value={mode === "percentage" ? value : 100}
          className={cn(
            "absolute h-24 w-24 -rotate-90 rounded-full",
            variantStyles[variant]
          )}
        />

        {/* Center value */}
        <span
          className={cn(
            "absolute text-xl font-semibold",
            variantStyles[variant]
          )}
        >
          {mode === "count"
            ? value
            : `${Math.round(value || 0)}%`}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground text-center">
        {subTitle}
      </p>
    </div>
  );
};
