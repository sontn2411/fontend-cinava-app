import type { Metadata } from "next";
import Image from "next/image";
import bgDefault from "@/assets/images/bg-danh-sach.png";
import type { StaticImageData } from "next/image";
import type { ParamsType } from "@/types/api.types";

const backgroundMap: Record<string, StaticImageData> = {
  // 'phim-le': bgPhimLe,
};
import { movieService } from "@/lib/api/movie.api";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import FilterMovie from "@/components/shred/filterMovile";
import { getDefaultYear } from "@/lib/utils/getDefaultYear";
import ListMovie from "@/components/shred/listMovie";
import { Pagination } from "@/components/ui/Pagination";
import { FilterMovieSub } from "@/components/shred/filterMovieSub";
import { cache } from "react";

const fetchData = cache((mainSlug: string, subSlug?: string, params?: ParamsType) => {
  if (subSlug) {
    if (mainSlug === 'the-loai') return movieService.getListByCategory(subSlug, params);
    if (mainSlug === 'quoc-gia') return movieService.getListByNational(subSlug, params);
  }
  return movieService.getList(mainSlug, params);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mainSlug = slug[0];
  const subSlug = slug.length > 1 ? slug[1] : undefined;

  const slugToTitle = (s: string) => {
    const text = s.replace(/-/g, " ");
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const title = subSlug
    ? `${slugToTitle(subSlug)} - ${slugToTitle(mainSlug)}`
    : `${slugToTitle(mainSlug)}`;

  return {
    title: `${title} `,
    description: APP_DESCRIPTION,
  };
}

export default async function DanhSachPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  const mainSlug = slug[0];

  const apiParams: ParamsType = {
    page: query.page ? Number(query.page) : 1,
    year: query.year ? String(query.year) : String(getDefaultYear()),
    ...(query.category && { category: String(query.category) }),
    ...(query.country && { country: String(query.country) }),
    ...(query.sort_lang && { sort_lang: String(query.sort_lang) }),
  };
  const subSlug = slug.length > 1 ? slug[1] : undefined;
  const data = await fetchData(mainSlug, subSlug, apiParams);
  const bgImage = backgroundMap[mainSlug] || bgDefault;

//  console.log('====ssss======', data)
  return (
    <div className="relative mx-auto min-h-screen">
      {/* Background hero */}
      <div className="absolute inset-x-0 top-0  h-[240px] sm:h-[540px] overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}>
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative pt-32 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white">
          {data?.titlePage || mainSlug.replace(/-/g, " ")}
        </h1>
        {data?.seoOnPage?.descriptionHead && (
          <p className="mt-3 text-sm md:text-base text-zinc-400 max-w-2xl line-clamp-2">
            {data.seoOnPage.descriptionHead}
          </p>
        )}
     


        {!slug[1] ? <FilterMovie /> : <FilterMovieSub sub={slug[1]} mainSlug={mainSlug} />}

        <ListMovie items={data?.items || []} />

        <Pagination
          currentPage={data?.params?.pagination?.currentPage || 1}
          totalPages={data?.params?.pagination?.totalPages || 1}
          totalItems={data?.params?.pagination?.totalItems}
        />
      </div>
    </div>
  );
}
