"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Episode } from "@/types/movie.types";

interface EpisodeListProps {
  episodes: Episode[];
  currentEpisodeId?: string;
  movieSlug: string;
  className?: string;
}

export function EpisodeList({
  episodes,
  currentEpisodeId,
  movieSlug,
  className,
}: EpisodeListProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h3 className="mb-3 text-sm font-semibold text-white">Danh sách tập</h3>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {episodes.map((ep) => {
          const isActive = ep.id === currentEpisodeId;
          return (
            <Link
              key={ep.id}
              href={`/watch/${ep.id}`}
              className={cn(
                "flex items-center justify-center rounded-md border px-3 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white",
              )}
            >
              {ep.number}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
