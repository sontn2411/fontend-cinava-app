"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { cn } from "@/lib/utils";
import type { Movie } from "@/types/movie.types";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  className?: string;
}

export function MovieCarousel({ title, movies, className }: MovieCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="rounded-full border border-white/10 p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="rounded-full border border-white/10 p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4"
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            className="w-36 shrink-0 sm:w-44"
          />
        ))}
      </div>
    </section>
  );
}
