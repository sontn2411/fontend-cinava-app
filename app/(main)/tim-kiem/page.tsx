import type { Metadata } from "next";
import { movieService } from "@/lib/api/movie.api";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import ListMovie from "@/components/shred/listMovie";
import { Pagination } from "@/components/ui/Pagination";
// import FilterMovie from "@/components/shred/filterMovile";
import { getDefaultYear } from "@/lib/utils/getDefaultYear";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const query = await searchParams;
  const q = query.q ? String(query.q) : "";

  return {
    title: q ? `Tìm kiếm: ${q} | ${APP_NAME}` : `Tìm kiếm | ${APP_NAME}`,
    description: APP_DESCRIPTION,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const q = query.q ? String(query.q) : "";

  const apiParams = {
    page: query.page ? Number(query.page) : 1,
    year: query.year ? String(query.year) : String(getDefaultYear()),
    ...(query.category && { category: String(query.category) }),
    ...(query.country && { country: String(query.country) }),
  };

  let data = null;
  if (q) {
    try {
      data = await movieService.search(q, apiParams);
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <div className="min-h-screen pt-28 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white">
        {q ? (
          <>
            Kết quả tìm kiếm cho: <span className="text-primary">&quot;{q}&quot;</span>
          </>
        ) : (
          "Tìm kiếm phim"
        )}
      </h1>

      {data?.items && data.items.length > 0 && (
        <p className="mt-2 text-sm text-zinc-400">
          Tìm thấy {data?.params?.pagination?.totalItems || data.items.length} kết quả
        </p>
      )}

      {/* <FilterMovie hideMovieType /> */}

      {q && data?.items ? (
        <>
          <ListMovie items={data.items} />
          <Pagination
            currentPage={data?.params?.pagination?.currentPage || apiParams.page}
            totalItems={data?.params?.pagination?.totalItems || 0}
            totalItemsPerPage={data?.params?.pagination?.totalItemsPerPage || 24}
          />
        </>
      ) : q ? (
        <div className="mt-16 text-center">
          <p className="text-lg text-zinc-400">Không tìm thấy kết quả cho &quot;{q}&quot;</p>
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-lg text-zinc-400">Nhập từ khóa để tìm kiếm phim</p>
        </div>
      )}
    </div>
  );
}
