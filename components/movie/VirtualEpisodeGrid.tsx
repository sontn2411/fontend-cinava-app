"use client";

import { useRef, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { EpisodeServerData } from "@/types/api.types";

interface VirtualEpisodeGridProps {
  episodes: EpisodeServerData[];
  activeSlug?: string;
  onSelect: (ep: EpisodeServerData) => void;
  /** chiều cao cố định của scroll container */
  maxHeight?: number;
  /** số cột — tự động detect nếu không truyền */
  cols?: number;
}

// Số cột mặc định: tùy theo screen (estimate cố định, đơn giản hơn ResizeObserver)
const DEFAULT_COLS = 6;
const ROW_HEIGHT = 44; // button height (32px) + gap (8px) + padding

export function VirtualEpisodeGrid({
  episodes,
  activeSlug,
  onSelect,
  maxHeight = 288,
  cols = DEFAULT_COLS,
}: VirtualEpisodeGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Chia episodes thành các hàng
  const rows = useMemo(() => {
    const result: EpisodeServerData[][] = [];
    for (let i = 0; i < episodes.length; i += cols) {
      result.push(episodes.slice(i, i + cols));
    }
    return result;
  }, [episodes, cols]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 4,
  });

  const virtualRows = virtualizer.getVirtualItems();

  return (
    <div
      ref={scrollRef}
      style={{ height: maxHeight, overflowY: "auto" }}
      className="scrollbar-thin"
    >
      {/* Toàn bộ chiều cao ảo */}
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: virtualRow.start,
                left: 0,
                right: 0,
                height: virtualRow.size,
              }}
              className="flex gap-1.5 items-center"
            >
              {row.map((ep, idx) => (
                <button
                  key={ep.slug + idx}
                  onClick={() => onSelect(ep)}
                  className={`flex-1 min-w-0 py-2 text-sm font-medium rounded-lg border transition-all cursor-pointer truncate ${
                    activeSlug === ep.slug
                      ? "bg-primary border-primary text-white shadow shadow-primary/30"
                      : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {ep.name}
                </button>
              ))}
              {/* Fill empty slots in last row */}
              {row.length < cols &&
                Array.from({ length: cols - row.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="flex-1 min-w-0" />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
