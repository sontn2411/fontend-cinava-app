import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      className={cn(
        "block animate-pulse rounded-md bg-zinc-800",
        className,
      )}
    />
  );
}
