interface MovieActionsProps {
  trailerUrl?: string;
}

export function MovieActions({ trailerUrl }: MovieActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors cursor-pointer">
        <span>▶</span> Xem phim
      </button>
      {trailerUrl && (
        <a
          href={trailerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
        >
          <span>▷</span> Trailer
        </a>
      )}
      {/* <button className="flex items-center gap-2 px-5 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
        + Yêu thích
      </button> */}
    </div>
  );
}
