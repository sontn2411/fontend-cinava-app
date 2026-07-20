import type { Metadata } from "next";
import { movieService } from "@/lib/api/movie.api";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { cache } from "react";
import type { MovieDetail } from "@/types/api.types";
import { EpisodeList } from "@/components/movie/EpisodeList";

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
        <p className="text-lg text-zinc-400">Không tìm thấy phim</p>
      </div>
    );
  }

  const movie = data.item as MovieDetail;

  console.log('=======', movie)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Movie info + video player + episodes */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10">
        <h1 className="text-2xl font-bold text-white mb-1">{movie.name}</h1>
        <p className="text-sm text-zinc-400 mb-6">
          {movie.origin_name}
          {movie.year && <> &bull; {movie.year}</>}
          {movie.episode_current && <> &bull; {movie.episode_current}</>}
        </p>

        <EpisodeList episodes={movie.episodes} poster={movie.poster_url} />
      </div>
    </div>
  );
}
