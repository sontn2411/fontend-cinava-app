import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({ value, max = 10, size = "sm", className }: RatingProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium",
        size === "sm" ? "text-xs" : "text-sm",
        className,
      )}
    >
      <Star
        className={cn(
          "fill-yellow-500 text-yellow-500",
          size === "sm" ? "h-3 w-3" : "h-4 w-4",
        )}
      />
      <span className="text-white">
        {value.toFixed(1)}
      </span>
      <span className="text-zinc-500">/ {max}</span>
    </span>
  );
}
