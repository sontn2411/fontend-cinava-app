import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import { Rating } from "@/components/ui/Rating";
import { truncate } from "@/lib/utils";
import type { Movie } from "@/types/movie.types";

interface MovieHeroProps {
  movie: Movie;
}

export function MovieHero({ movie }: MovieHeroProps) {
  const href =
    movie.type === "tv-series"
      ? `/tv-series/${movie.slug}`
      : `/movies/${movie.slug}`;

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      {movie.backdropUrl && (
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-2xl text-3xl font-bold text-white md:text-5xl">
            {movie.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
            <span>{movie.releaseYear}</span>
            {movie.rating && <Rating value={movie.rating} size="md" />}
            {movie.genres.slice(0, 3).map((g) => (
              <span
                key={g.id}
                className="rounded-full border border-white/20 px-2 py-0.5 text-xs"
              >
                {g.name}
              </span>
            ))}
          </div>

          {movie.overview && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
              {truncate(movie.overview, 200)}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              <Play className="h-4 w-4" />
              Xem ngay
            </Link>
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <Info className="h-4 w-4" />
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
