"use client";

import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * Video player wrapper component.
 * TODO: Integrate a proper player library (video.js, plyr, or react-player)
 */
export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-lg bg-black", className)}>
      <video
        src={src}
        poster={poster}
        controls
        className="h-full w-full"
        playsInline
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
