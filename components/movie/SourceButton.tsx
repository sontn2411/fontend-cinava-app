"use client";

import { useState } from "react";
import type { Episode } from "@/types/api.types";
import { Link2, Copy, Check, X, ChevronDown } from "lucide-react";

interface SourceButtonProps {
  episodes: Episode[];
}

export function SourceButton({ episodes }: SourceButtonProps) {
  const [open, setOpen] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [expandedServer, setExpandedServer] = useState<string>(
    episodes[0]?.server_name ?? ""
  );

  async function handleCopy(link: string, key: string) {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const el = document.createElement("textarea");
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiedSlug(key);
    setTimeout(() => setCopiedSlug(null), 2000);
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
      >
        <Link2 className="w-3.5 h-3.5" />
        Nguồn
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <div
            className="relative w-full max-w-2xl bg-[#161B24] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — fixed */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0">
              <div>
                <h2 className="text-base font-semibold text-white">Danh sách nguồn phát</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {episodes.reduce((acc, s) => acc + s.server_data.length, 0)} tập ·{" "}
                  {episodes.length} server
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-6 py-4 space-y-3 scrollbar-thin">
              {episodes.map((server) => (
                <div key={server.server_name} className="border border-white/8 rounded-xl overflow-hidden">
                  {/* Server header */}
                  <button
                    onClick={() =>
                      setExpandedServer((prev) =>
                        prev === server.server_name ? "" : server.server_name
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/8 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{server.server_name}</span>
                      {server.is_ai && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-violet-500/30 text-violet-300 rounded">AI</span>
                      )}
                      <span className="text-xs text-zinc-500">{server.server_data.length} tập</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
                        expandedServer === server.server_name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Episode list */}
                  {expandedServer === server.server_name && (
                    <div className="divide-y divide-white/5">
                      {server.server_data.map((ep) => {
                        const key = `${server.server_name}__${ep.slug}`;
                        return (
                          <div
                            key={ep.slug}
                            className="flex items-center gap-3 px-4 py-2.5"
                          >
                            <span className="w-16 shrink-0 text-xs font-medium text-zinc-400 truncate">
                              {ep.name}
                            </span>
                            <p className="flex-1 min-w-0 text-[11px] text-zinc-500 font-mono truncate">
                              {ep.link_m3u8 || "—"}
                            </p>
                            {ep.link_m3u8 && (
                              <button
                                onClick={() => handleCopy(ep.link_m3u8, key)}
                                className={`shrink-0 flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer ${
                                  copiedSlug === key
                                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                                    : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                                }`}
                              >
                                {copiedSlug === key ? (
                                  <><Check className="w-3 h-3" /> Copied</>
                                ) : (
                                  <><Copy className="w-3 h-3" /> Copy</>
                                )}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
