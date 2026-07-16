import { cn } from "@/lib/utils";

interface GlobalLoadingProps {
  fullScreen?: boolean;
  className?: string;
}

export function GlobalLoading({ fullScreen = true, className }: GlobalLoadingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-black",
        fullScreen ? "min-h-screen" : "h-full w-full py-12",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-indigo-500" />
        <span className="text-sm font-medium text-zinc-400 animate-pulse">
          Đang tải dữ liệu...
        </span>
      </div>
    </div>
  );
}
