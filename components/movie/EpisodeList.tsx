"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Episode, EpisodeServerData } from "@/types/api.types";

interface EpisodeListProps {
  episodes: Episode[];
  poster?: string;
}

export function EpisodeList({ episodes, poster }: EpisodeListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!episodes || episodes.length === 0) {
    return <p className="text-zinc-500 text-sm">Không có danh sách tập phim.</p>;
  }

  // Read state from URL params
  const serverParam = searchParams.get("server") ?? episodes[0]?.server_name ?? "";
  const epParam = searchParams.get("ep") ?? "";

  const activeServerIndex = episodes.findIndex((e) => e.server_name === serverParam);
  const currentServerIndex = activeServerIndex >= 0 ? activeServerIndex : 0;
  const currentServer = episodes[currentServerIndex];

  const activeEpisode: EpisodeServerData | undefined =
    currentServer.server_data.find((e) => e.slug === epParam);

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
  console.log('===',activeEpisode )
  return (
    <div>
      {/* Video Player */}
      {activeEpisode ? (
        <div className="mb-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={activeEpisode.link_embed}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen; picture-in-picture"
              referrerPolicy="origin"
            />
          </div>
          <div className="px-4 py-3 bg-zinc-900/80 border-t border-white/5 flex items-center gap-3">
            <span className="text-sm font-semibold text-white">{activeEpisode.name}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-500">{currentServer.server_name}</span>
            {currentServer.is_ai && (
              <span className="px-1.5 py-0.5 text-[10px] bg-violet-500/30 text-violet-300 rounded">AI</span>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-xl overflow-hidden border border-white/10 bg-zinc-950 aspect-video flex items-center justify-center">
          <div className="text-center text-zinc-600">
            <div className="text-5xl mb-3">▶</div>
            <p className="text-sm">Chọn tập phim để xem</p>
          </div>
        </div>
      )}

      {/* Server tabs */}
      {episodes.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {episodes.map((ep) => (
            <button
              key={ep.server_name}
              onClick={() => selectServer(ep.server_name)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors cursor-pointer ${
                currentServer.server_name === ep.server_name
                  ? "bg-primary border-primary text-white"
                  : "bg-white/5 border-white/15 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {ep.server_name}
              {ep.is_ai && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-violet-500/30 text-violet-300 rounded">AI</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Episode grid */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          {episodes.length === 1 ? currentServer.server_name : `Server: ${currentServer.server_name}`}
        </h2>
        <div className="flex flex-wrap gap-2">
          {currentServer.server_data.map((ep) => (
            <button
              key={ep.slug}
              onClick={() => selectEpisode(ep)}
              className={`min-w-[52px] px-3 py-2 text-sm font-medium rounded-lg border transition-all cursor-pointer ${
                activeEpisode?.slug === ep.slug
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {ep.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
