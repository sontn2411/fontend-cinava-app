import type { PhimTmdb, PhimImdb } from "@/types/api.types";

interface MovieRatingsProps {
  imdb?: PhimImdb;
  tmdb?: PhimTmdb;
}

export function MovieRatings({ imdb, tmdb }: MovieRatingsProps) {
  if (!imdb?.vote_average && !tmdb?.vote_average) return null;

  return (
    <div className="flex items-center gap-4 mt-4">
      {imdb && imdb.vote_average > 0 && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10">
          <span className="text-xs font-bold text-yellow-400">IMDb</span>
          <span className="text-sm font-bold text-white">{imdb.vote_average}</span>
          <span className="text-xs text-zinc-500">({imdb.vote_count.toLocaleString()})</span>
        </div>
      )}
      {tmdb && tmdb.vote_average > 0 && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10">
          <span className="text-xs font-bold text-sky-400">TMDB</span>
          <span className="text-sm font-bold text-white">{tmdb.vote_average}</span>
          <span className="text-xs text-zinc-500">({tmdb.vote_count.toLocaleString()})</span>
        </div>
      )}
    </div>
  );
}
