import Image from "next/image";
import type { MovieDetail } from "@/types/api.types";

interface MovieHeroProps {
  movie: MovieDetail;
}

export function MovieHero({ movie }: MovieHeroProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
      {/* Poster */}
      <div className="shrink-0 w-[180px] sm:w-[220px] self-center sm:self-start">
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
          <Image
            src={movie.poster_url}
            alt={movie.name}
            fill
            priority
            className="object-cover"
            sizes="220px"
          />
          {movie.quality && (
            <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-primary text-white rounded">
              {movie.quality}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.category.map((cat) => (
            <span
              key={cat.id}
              className="px-3 py-1 text-xs font-medium border border-white/20 rounded-full text-zinc-300 hover:bg-white/10 transition-colors"
            >
              {cat.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          {movie.name}
        </h1>

        {/* Origin info */}
        <p className="mt-2 text-sm text-zinc-400">
          {movie.origin_name}
          {movie.year && <> &bull; {movie.year}</>}
          {movie.country?.[0] && <> &bull; {movie.country[0].name}</>}
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-4 mt-4">
          {movie.imdb?.vote_average > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10">
              <span className="text-xs font-bold text-yellow-400">IMDb</span>
              <span className="text-sm font-bold text-white">{movie.imdb.vote_average}</span>
              <span className="text-xs text-zinc-500">({movie.imdb.vote_count.toLocaleString()})</span>
            </div>
          )}
          {movie.tmdb?.vote_average > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10">
              <span className="text-xs font-bold text-sky-400">TMDB</span>
              <span className="text-sm font-bold text-white">{movie.tmdb.vote_average}</span>
              <span className="text-xs text-zinc-500">({movie.tmdb.vote_count.toLocaleString()})</span>
            </div>
          )}
        </div>

        {/* Meta pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {movie.time && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-300 border border-white/10 rounded-full">
              🕐 {movie.time}
            </span>
          )}
          {movie.quality && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-300 border border-white/10 rounded-full">
              📺 {movie.quality}
            </span>
          )}
          {movie.lang && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-300 border border-white/10 rounded-full">
              🌐 {movie.lang}
            </span>
          )}
          {movie.episode_current && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-300 border border-white/10 rounded-full">
              🎬 {movie.episode_current}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors cursor-pointer">
            <span>▶</span> Xem phim
          </button>
          {movie.trailer_url && (
            <a
              href={movie.trailer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <span>▷</span> Trailer
            </a>
          )}
          <button className="flex items-center gap-2 px-5 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
            + Yêu thích
          </button>
        </div>
      </div>
    </div>
  );
}
