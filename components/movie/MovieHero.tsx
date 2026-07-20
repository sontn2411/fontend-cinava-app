import type { MovieDetail } from "@/types/api.types";
import Link from "next/link";
import { MoviePoster } from "./MoviePoster";
import { MovieRatings } from "./MovieRatings";
import { MovieMetaPills } from "./MovieMetaPills";
import { MovieActions } from "./MovieActions";

interface MovieHeroProps {
  movie: MovieDetail;
}

export function MovieHero({ movie }: MovieHeroProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
      <MoviePoster
        posterUrl={movie.poster_url}
        name={movie.name}
        quality={movie.quality}
      />

      {/* Info */}
      <div className="flex-1 min-w-0 self-center sm:self-end" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))' }}>
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.category.map((cat, index) => {
            const colors = [
              "bg-violet-500/25 text-violet-300 hover:bg-violet-500/35",
              "bg-sky-500/25 text-sky-300 hover:bg-sky-500/35",
              "bg-emerald-500/25 text-emerald-300 hover:bg-emerald-500/35",
              "bg-amber-500/25 text-amber-300 hover:bg-amber-500/35",
              "bg-rose-500/25 text-rose-300 hover:bg-rose-500/35",
              "bg-teal-500/25 text-teal-300 hover:bg-teal-500/35",
            ];
            return (
              <Link
                key={cat.id}
                href={`/danh-sach/phim-le?category=${cat.slug}`}
                className={`px-3.5 py-1.5 text-[13px] font-semibold rounded-full transition-colors ${colors[index % colors.length]}`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight" style={{ textWrap: 'balance' }}>
          {movie.name}
        </h1>

        {/* Origin info */}
        <p className="mt-2 text-sm text-zinc-400">
          {movie.origin_name}
          {movie.year && <> &bull; {movie.year}</>}
          {movie.country?.[0] && <> &bull; {movie.country[0].name}</>}
        </p>

        <MovieRatings imdb={movie.imdb} tmdb={movie.tmdb} />
        <MovieMetaPills
          time={movie.time}
          quality={movie.quality}
          lang={movie.lang}
          episodeCurrent={movie.episode_current}
        />
        <MovieActions trailerUrl={movie.trailer_url} />
      </div>
    </div>
  );
}
