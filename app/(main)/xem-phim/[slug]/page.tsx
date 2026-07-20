import type { Metadata } from "next";
import { movieService } from "@/lib/api/movie.api";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { cache } from "react";
import type { MovieDetail } from "@/types/api.types";
import { EpisodeList } from "@/components/movie/EpisodeList";
import { SourceButton } from "@/components/movie/SourceButton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const fetchDetail = cache((slug: string) => {
  return movieService.getDetailFilm(slug);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await fetchDetail(slug);
    const movie = data?.item as MovieDetail;
    if (movie) {
      return {
        title: `Xem phim ${movie.name} | ${APP_NAME}`,
        description: movie.content?.replace(/<[^>]+>/g, "").slice(0, 160) || APP_DESCRIPTION,
      };
    }
  } catch {
    // silently fail
  }
  return { title: `Xem phim | ${APP_NAME}`, description: APP_DESCRIPTION };
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let data = null;
  try {
    data = await fetchDetail(slug);
  } catch (error) {
    console.error("Failed to fetch movie detail:", error);
  }


  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🎬</p>
          <p className="text-lg font-semibold text-white mb-1">Không tìm thấy phim</p>
          <p className="text-sm text-zinc-500 mb-6">Bộ phim này có thể đã bị xóa hoặc chưa được thêm.</p>
          <Link href="/" className="text-sm text-primary hover:underline">← Quay về trang chủ</Link>
        </div>
      </div>
    );
  }

  const movie = data.item as MovieDetail;

  const metaTags = [
    movie.quality,
    movie.lang,
    movie.time,
    movie.year ? `${movie.year}` : null,
    movie.episode_current,
  ].filter(Boolean);
  return (
    <div className="min-h-screen text-white mt-10">
      {/* Top bar breadcrumb */}
      <div className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center px-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <Link
          href={`/xem-phim/${movie.slug}`}
          className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors pointer-events-auto"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="truncate max-w-[200px] sm:max-w-xs">{movie.name}</span>
        </Link>
      </div>

      {/* Video player — full width */}
      <div className="w-full">
        <EpisodeList
          episodes={movie.episodes}
          poster={movie.poster_url}
          movieName={movie.name}
        />
      </div>

      {/* Metadata + source button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <MovieMeta movie={movie} metaTags={metaTags} />
          </div>
          <div className="shrink-0 pt-1">
            <SourceButton episodes={movie.episodes} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieMeta({
  movie,
  metaTags,
}: {
  movie: MovieDetail;
  metaTags: (string | null | undefined)[];
}) {
  return (
    <div className="max-w-3xl">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-1" style={{ textWrap: "balance" }}>
        {movie.name}
      </h1>
      <p className="text-sm text-zinc-500 mb-3">{movie.origin_name}</p>

      {/* Meta pills */}
      {metaTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {metaTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-medium text-zinc-400 bg-white/5 border border-white/8 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Categories */}
      {movie.category && movie.category.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {movie.category.map((cat) => (
            <Link
              key={cat.id}
              href={`/danh-sach/the-loai/${cat.slug}`}
              className="px-2.5 py-0.5 text-[11px] font-medium text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Cast & Director */}
      {(movie.director?.filter((d): d is string => Boolean(d)).length > 0 || movie.actor?.filter((a): a is string => Boolean(a)).length > 0) && (
        <div className="space-y-1.5 text-sm">
          {movie.director?.filter((d): d is string => Boolean(d)).length > 0 && (
            <p>
              <span className="text-zinc-500">Đạo diễn: </span>
              <span className="text-zinc-300">{movie.director.filter((d): d is string => Boolean(d)).join(", ")}</span>
            </p>
          )}
          {movie.actor?.filter((a): a is string => Boolean(a)).length > 0 && (
            <p>
              <span className="text-zinc-500">Diễn viên: </span>
              <span className="text-zinc-300">{movie.actor.filter((a): a is string => Boolean(a)).slice(0, 6).join(", ")}</span>
              {movie.actor.filter((a): a is string => Boolean(a)).length > 6 && (
                <span className="text-zinc-600"> +{movie.actor.filter((a): a is string => Boolean(a)).length - 6} khác</span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
