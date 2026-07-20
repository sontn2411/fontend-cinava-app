"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { movieService } from "@/lib/api/movie.api";
import { ROUTES } from "@/lib/constants";
import type { ItemFlim } from "@/types/api.types";

export function SearchBox() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isDismissed, setIsDismissed] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounce query
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query.trim()), 400);
        return () => clearTimeout(timer);
    }, [query]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsDismissed(true);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: ["search", debouncedQuery],
        queryFn: () => movieService.search(debouncedQuery, { limit: 10 }),
        enabled: debouncedQuery.length >= 2,
        staleTime: 30 * 1000,
    });

    const results: ItemFlim[] = data?.items || [];
    const showDropdown = !isDismissed && debouncedQuery.length >= 2;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsDismissed(true);
            router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleClear = () => {
        setQuery("");
        setDebouncedQuery("");
        setIsDismissed(true);
    };

    return (
        <div ref={ref} className="relative">
            <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIsDismissed(false); }}
                    onFocus={() => results.length > 0 && setIsDismissed(false)}
                    placeholder="Tìm kiếm phim, diễn viên..."
                    className="h-10 w-40 rounded-full bg-white/10 border border-white/10 pl-5 pr-12 text-[15px] text-white placeholder:text-zinc-400 transition-all hover:bg-white/15 focus:bg-white/20 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 md:w-72"
                />
                <div className="absolute right-4 flex items-center gap-1">
                    {isLoading && <Loader2 className="h-4 w-4 text-zinc-400 animate-spin" />}
                    {query && !isLoading && (
                        <button type="button" onClick={handleClear} className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    {!query && (
                        <button type="submit" className="text-zinc-400 transition-colors hover:text-white cursor-pointer">
                            <Search className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </form>

            {/* Search Results Dropdown */}
            {showDropdown && results.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-[360px] rounded-xl bg-zinc-900 border border-white/10 shadow-2xl shadow-black/50 z-50 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col">
                    {/* Scrollable results */}
                    <div className="max-h-[400px] overflow-y-auto py-2">
                        {results.map((item) => (
                            <Link
                                key={item._id}
                                href={`/xem-phim/${item.slug}`}
                                onClick={() => setIsDismissed(true)}
                                className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/5 group"
                            >
                                <div className="relative w-10 h-14 rounded-md overflow-hidden bg-white/10 shrink-0">
                                    <Image
                                        src={item.poster_url}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        sizes="40px"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">
                                        {item.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        {item.year && (
                                            <span className="text-xs text-zinc-500">{item.year}</span>
                                        )}
                                        {item.quality && (
                                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-white/10 text-zinc-400 rounded uppercase">
                                                {item.quality}
                                            </span>
                                        )}
                                        {item.lang && (
                                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-primary/20 text-primary rounded uppercase">
                                                {item.lang}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Sticky footer - only show when there might be more results */}
                    {results.length >= 10 && (
                        <div className="border-t border-white/10 shrink-0">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDismissed(true);
                                    router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(query.trim())}`);
                                }}
                                className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm text-primary font-medium hover:bg-white/5 transition-colors cursor-pointer rounded-b-xl"
                            >
                                <Search className="w-4 h-4" />
                                Xem thêm kết quả
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* No results */}
            {showDropdown && query.trim().length >= 2 && results.length === 0 && !isLoading && (
                <div className="absolute top-full right-0 mt-2 w-[360px] rounded-xl bg-zinc-900 border border-white/10 shadow-2xl shadow-black/50 py-8 z-50 text-center">
                    <p className="text-sm text-zinc-400">Không tìm thấy kết quả cho &quot;{query}&quot;</p>
                </div>
            )}
        </div>
    );
}
