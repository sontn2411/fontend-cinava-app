"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Episode, EpisodeServerData } from "@/types/api.types";
import { VideoPlayer } from "./VideoPlayer";
import { VirtualEpisodeGrid } from "./VirtualEpisodeGrid";
import { Play, ArrowUpDown } from "lucide-react";

interface EpisodeListProps {
  episodes: Episode[];
  poster?: string;
  movieName?: string;
  /** "inline" = full UI (video + server tabs + episode grid), "sidebar" = only server tabs + episode grid */
  layout?: "inline" | "sidebar";
}

const REVERSE_THRESHOLD = 40;

export function EpisodeList({ episodes, poster, movieName, layout = "inline" }: EpisodeListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive server_data length for initial state BEFORE early return
  const firstServerDataLength = episodes?.[0]?.server_data?.length ?? 0;
  const [isReversed, setIsReversed] = useState(() => firstServerDataLength > REVERSE_THRESHOLD);

  if (!episodes || episodes.length === 0) {
    return <p className="text-zinc-500 text-sm py-4">Không có danh sách tập phim.</p>;
  }

  const serverParam = searchParams.get("server") ?? episodes[0]?.server_name ?? "";
  const epParam = searchParams.get("ep") ?? "";

  const activeServerIndex = episodes.findIndex((e) => e.server_name === serverParam);
  const currentServerIndex = activeServerIndex >= 0 ? activeServerIndex : 0;
  const currentServer = episodes[currentServerIndex];

  const activeEpisode: EpisodeServerData | undefined =
    currentServer.server_data.find((e) => e.slug === epParam);

  const shouldShowReverseBtn = currentServer.server_data.length > REVERSE_THRESHOLD;
  const displayedEpisodes = isReversed
    ? [...currentServer.server_data].reverse()
    : currentServer.server_data;

  function selectServer(serverName: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("server", serverName);
    params.delete("ep");
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function selectEpisode(ep: EpisodeServerData) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("ep", ep.slug);
    params.set("server", currentServer.server_name);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  // Shared server tabs JSX
  const serverTabs = episodes.length > 1 && (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {episodes.map((ep) => (
        <button
          key={ep.server_name}
          onClick={() => selectServer(ep.server_name)}
          className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors cursor-pointer ${
            currentServer.server_name === ep.server_name
              ? "bg-primary border-primary text-white"
              : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          {ep.server_name}
          {ep.is_ai && (
            <span className="ml-1 px-1 py-0 text-[9px] bg-violet-500/30 text-violet-300 rounded">AI</span>
          )}
        </button>
      ))}
    </div>
  );

  // Shared episode grid — dùng VirtualEpisodeGrid để tránh lag với 1000+ tập
  function episodeGrid(compact: boolean) {
    return (
      <div>
        {shouldShowReverseBtn && (
          <button
            onClick={() => setIsReversed((v) => !v)}
            className="flex items-center gap-1.5 mb-3 px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowUpDown className="w-3 h-3" />
            {isReversed ? "Cũ nhất trước" : "Mới nhất trước"}
          </button>
        )}
        <VirtualEpisodeGrid
          episodes={displayedEpisodes}
          activeSlug={activeEpisode?.slug}
          onSelect={selectEpisode}
          cols={compact ? 8 : 6}
          maxHeight={288}
        />
      </div>
    );
  }

  // ── Sidebar layout: server tabs + episode grid only ──
  if (layout === "sidebar") {
    return (
      <div>
        {serverTabs}
        {episodeGrid(true)}
      </div>
    );
  }

  // ── Inline layout: full UI (video + server tabs + grid) ──
  return (
    <div>
      {/* Video Player */}
      {activeEpisode ? (
        <div className="w-full">
          <VideoPlayer src={activeEpisode.link_m3u8} poster={poster} />
          {/* Episode bar under player */}
          <div className="px-4 py-2.5 bg-[#0A0C12] border-b border-white/5 flex items-center gap-3 min-h-[40px]">
            <span className="text-sm font-semibold text-white">{activeEpisode.name}</span>
            {movieName && (
              <>
                <span className="text-zinc-700">·</span>
                <span className="text-xs text-zinc-500 truncate">{movieName}</span>
              </>
            )}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-zinc-600">{currentServer.server_name}</span>
              {currentServer.is_ai && (
                <span className="px-1.5 py-0.5 text-[10px] bg-violet-500/20 text-violet-400 border border-violet-500/20 rounded">AI</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-video bg-[#080A10] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <Play className="w-7 h-7 text-zinc-600 fill-zinc-600 translate-x-0.5" />
            </div>
            <p className="text-sm text-zinc-500">Chọn tập phim để bắt đầu xem</p>
          </div>
        </div>
      )}

      {/* Server tabs + episode grid — below video, virtual scroll for performance */}
      <div className="px-4 pt-5 pb-4">
        {serverTabs}
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Danh sách tập</h3>
        {episodeGrid(false)}
      </div>
    </div>
  );
}
