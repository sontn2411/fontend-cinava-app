export default function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <div className="aspect-video w-full rounded-lg bg-zinc-900" />
      <div className="mt-6">
        <h1 className="text-xl font-semibold text-white">
          Video Player Placeholder
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Kết nối API để load video và thông tin tập phim
        </p>
      </div>
    </div>
  );
}
