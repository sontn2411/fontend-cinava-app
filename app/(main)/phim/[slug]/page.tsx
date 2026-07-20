import type { Metadata } from "next";
import Image from "next/image";
import { movieService } from "@/lib/api/movie.api";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { cache } from "react";
import type { MovieDetail, MovieImage } from "@/types/api.types";
import { MovieHero } from "@/components/movie/MovieHero";

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
    const seo = data?.seoOnPage;

    if (seo) {
      return {
        title: seo.titleHead ? `${seo.titleHead} | ${APP_NAME}` : APP_NAME,
        description: seo.descriptionHead || APP_DESCRIPTION,
        openGraph: seo.og_image ? { images: [seo.og_image] } : undefined,
      };
    }
  } catch (error) {
    console.error("Failed to fetch movie detail:", error);
  }

  return {
    title: `Xem phim | ${APP_NAME}`,
    description: APP_DESCRIPTION,
  };
}

export default async function MovieDetailPage({
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
  console.log('===========', movie)
  // Get the highest resolution backdrop image
  const backdropImage = movie.images
    ?.filter((img: MovieImage) => img.type === "backdrop")
    .sort((a: MovieImage, b: MovieImage) => b.width - a.width)[0]?.url || movie.thumb_url;

  return (
    <div className="min-h-[200vh] mt-10">
      {/* Background */}
      <div className="absolute inset-x-0 top-0 h-screen overflow-hidden -z-10 "  style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}>
        <Image
          src={backdropImage}
          alt={movie.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-end pb-44 px-4 max-w-7xl mx-auto">
        <MovieHero movie={movie} />
      </div>

    </div>
  );
}
