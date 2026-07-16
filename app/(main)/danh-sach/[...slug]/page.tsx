import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách phim | Cinava",
};

export default async function DanhSachPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  
  // slug[0] sẽ là phim-le, phim-bo, the-loai, quoc-gia, v.v.
  const mainSlug = slug[0];
  
  // slug[1] sẽ là hanh-dong, viet-nam (nếu có sub-slug)
  const subSlug = slug.length > 1 ? slug[1] : undefined;

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pt-32 pb-12">
      <h1 className="text-3xl font-bold text-white capitalize">
        {mainSlug.replace(/-/g, " ")} {subSlug && `/ ${subSlug.replace(/-/g, " ")}`}
      </h1>
      
      <div className="mt-12 text-zinc-400">
        <div className="rounded-card border border-border bg-background-card p-8 text-center">
          <p className="text-lg">Đang xây dựng giao diện hiển thị phim...</p>
          <p className="mt-4 text-sm font-mono text-primary">
            Route đang bắt: /danh-sach/{slug.join("/")}
          </p>
        </div>
      </div>
    </div>
  );
}
