import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} - ${APP_DESCRIPTION}`,
  description: APP_DESCRIPTION,
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex h-[60vh] min-h-[400px] items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent">
            {APP_NAME}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{APP_DESCRIPTION}</p>
        </div>
      </section>

      {/* Content Sections - sẽ thêm MovieCarousel khi có API */}
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12">
        <section>
          <h2 className="text-lg font-semibold text-white">Thịnh hành</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Kết nối API để hiển thị phim thịnh hành
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Phim mới cập nhật</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Kết nối API để hiển thị phim mới
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Phim bộ đang chiếu</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Kết nối API để hiển thị phim bộ
          </p>
        </section>
      </div>
    </div>
  );
}
