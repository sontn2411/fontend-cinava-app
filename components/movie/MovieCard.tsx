import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Rating } from "@/components/ui/Rating";
import type { Movie } from "@/types/movie.types";

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const href =
    movie.type === "tv-series"
      ? `/tv-series/${movie.slug}`
      : `/movies/${movie.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg transition-transform hover:scale-[1.02]",
        className,
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-zinc-900">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/50">
          <Play className="h-10 w-10 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {movie.quality && (
          <span className="absolute left-2 top-2 rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {movie.quality}
          </span>
        )}

        {movie.type === "tv-series" && movie.latestEpisode && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-zinc-300">
            Tập {movie.latestEpisode}
          </span>
        )}
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="line-clamp-1 text-sm font-medium text-white">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>{movie.releaseYear}</span>
          {movie.rating && <Rating value={movie.rating} />}
        </div>
      </div>
    </Link>
  );
}
