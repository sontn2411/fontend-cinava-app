import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-lg text-zinc-400">
        Không tìm thấy trang bạn yêu cầu
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
