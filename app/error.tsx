"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white">Có lỗi xảy ra</h1>
      <p className="mt-4 text-zinc-400">
        Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Thử lại
      </button>
    </div>
  );
}
