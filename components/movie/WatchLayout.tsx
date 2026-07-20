"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface WatchLayoutProps {
  videoSection: ReactNode;
  sidebarContent: ReactNode;
}

/**
 * Đo chiều cao thực của video section bằng ResizeObserver
 * → sidebar luôn khớp đúng chiều cao video, không cần CSS calc
 */
export function WatchLayout({ videoSection, sidebarContent }: WatchLayoutProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [videoHeight, setVideoHeight] = useState<number>(0);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height ?? 0;
      if (h > 0) setVideoHeight(h);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="xl:flex">
      {/* Left: video — natural aspect-video height */}
      <div
        ref={videoRef}
        className="flex-1 min-w-0 xl:max-w-[calc(100%-360px)] bg-black"
      >
        {videoSection}
      </div>

      {/* Right: sidebar — height locked to video height via ResizeObserver */}
      <aside
        className="hidden xl:flex flex-col w-[360px] shrink-0 border-l border-white/5 bg-[#0A0C12] overflow-hidden"
        style={videoHeight > 0 ? { height: videoHeight } : undefined}
      >
        <div className="h-full overflow-y-auto pt-14 pb-4 scrollbar-thin">
          {sidebarContent}
        </div>
      </aside>
    </div>
  );
}
