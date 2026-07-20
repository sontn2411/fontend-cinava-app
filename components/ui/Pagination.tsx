"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    totalItemsPerPage: number;
    pageRanges?: number;
}

export function Pagination({ currentPage, totalItems, totalItemsPerPage, pageRanges = 5 }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(totalItems / (totalItemsPerPage || 1));

    if (totalPages <= 1) return null;

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page <= 1) {
            params.delete("page");
        } else {
            params.set("page", String(page));
        }
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname);
    };

    const getPageNumbers = (): (number | "...")[] => {
        const pages: (number | "...")[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 3) pages.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("...");

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-zinc-400 transition-all hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                        <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-zinc-500">
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => goToPage(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                                page === currentPage
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "bg-white/10 text-zinc-400 hover:bg-white/15 hover:text-white"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-zinc-400 transition-all hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {totalItems !== undefined && (
                <p className="text-xs text-zinc-500">
                    Trang {currentPage} / {totalPages} · {totalItems} kết quả
                </p>
            )}
        </div>
    );
}
