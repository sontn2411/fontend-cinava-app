"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hlsRef = useRef<import("hls.js").default | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isTouchDevice] = useState(
    () => typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
  const [centerFlash, setCenterFlash] = useState<"play" | "pause" | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadSource = useCallback((source: string) => {
    const video = videoRef.current;
    if (!video || !source) return;

    setError(null);
    setIsLoading(true);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    hlsRef.current?.destroy();
    hlsRef.current = null;

    const isHLS = source.includes(".m3u8");

    if (isHLS) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = source;
      } else {
        import("hls.js").then(({ default: Hls }) => {
          if (!Hls.isSupported()) {
            setError("Trinh duyet khong ho tro HLS.");
            setIsLoading(false);
            return;
          }
          const hls = new Hls({ enableWorker: true });
          hlsRef.current = hls;
          hls.loadSource(source);
          hls.attachMedia(video);
          hls.on(Hls.Events.ERROR, (_, data) => {
            if (data.fatal) {
              setError("Khong the tai video.");
              setIsLoading(false);
            }
          });
        });
      }
    } else {
      video.src = source;
    }
  }, []);

  useEffect(() => {
    loadSource(src);
    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [src, loadSource]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    const onDurationChange = () => setDuration(video.duration);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onError = () => { setError("Khong the phat video."); setIsLoading(false); };
    const onVolumeChange = () => { setVolume(video.volume); setIsMuted(video.muted); };
    const onRateChange = () => setPlaybackRate(video.playbackRate);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.addEventListener("volumechange", onVolumeChange);
    video.addEventListener("ratechange", onRateChange);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
      video.removeEventListener("volumechange", onVolumeChange);
      video.removeEventListener("ratechange", onRateChange);
    };
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      // flash play icon
      if (flashTimer.current) clearTimeout(flashTimer.current);
      setCenterFlash("play");
      flashTimer.current = setTimeout(() => setCenterFlash(null), 600);
    } else {
      video.pause();
      // flash pause icon
      if (flashTimer.current) clearTimeout(flashTimer.current);
      setCenterFlash("pause");
      flashTimer.current = setTimeout(() => setCenterFlash(null), 600);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video || !containerRef.current?.contains(document.activeElement)) return;
      if (e.key === " " || e.key === "k") { e.preventDefault(); togglePlay(); }
      if (e.key === "ArrowRight") { e.preventDefault(); video.currentTime = Math.min(video.currentTime + 10, duration); }
      if (e.key === "ArrowLeft") { e.preventDefault(); video.currentTime = Math.max(video.currentTime - 10, 0); }
      if (e.key === "ArrowUp") { e.preventDefault(); video.volume = Math.min(video.volume + 0.1, 1); }
      if (e.key === "ArrowDown") { e.preventDefault(); video.volume = Math.max(video.volume - 0.1, 0); }
      if (e.key === "m" || e.key === "M") { video.muted = !video.muted; }
      if (e.key === "f" || e.key === "F") { toggleFullscreen(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [duration, togglePlay, toggleFullscreen]);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const video = videoRef.current;
    if (!bar || !video || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
    video.currentTime = ratio * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const v = parseFloat(e.target.value);
    video.volume = v;
    video.muted = v === 0;
  };

  const handleSpeedChange = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setShowSpeedMenu(false);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative w-full aspect-video bg-black group outline-none select-none"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={() => { togglePlay(); setShowSpeedMenu(false); }}
    >
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full"
        playsInline
        preload="auto"
      />

      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-primary animate-spin" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center px-6">
            <p className="text-3xl mb-3">⚠️</p>
            <p className="text-sm text-zinc-400 mb-4">{error}</p>
            <button
              onClick={(e) => { e.stopPropagation(); loadSource(src); }}
              className="flex items-center gap-2 mx-auto px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Thu lai
            </button>
          </div>
        </div>
      )}

      {/* Center play/pause flash */}
      {centerFlash && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            key={centerFlash}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-black/50 animate-ping-once"
            style={{
              animation: "centerFlash 0.6s ease-out forwards",
            }}
          >
            {centerFlash === "play" ? (
              <Play className="w-9 h-9 text-white fill-white" />
            ) : (
              <Pause className="w-9 h-9 text-white fill-white" />
            )}
          </div>
        </div>
      )}

      <div
        className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        <div className="relative px-4 pb-3 pt-6" onClick={(e) => e.stopPropagation()}>
          <div
            ref={progressRef}
            className="relative h-1 rounded-full bg-white/20 cursor-pointer mb-3 group/bar hover:h-1.5 transition-all"
            style={{ touchAction: "none" }}
            onClick={handleSeek}
          >
            <div className="absolute -inset-y-3 inset-x-0" />
            <div className="absolute h-full rounded-full bg-white/30" style={{ width: `${bufferedPct}%` }} />
            <div className="absolute h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              className="text-white hover:text-primary transition-colors cursor-pointer"
              onClick={togglePlay}
              title={isPlaying ? "Dung (Space)" : "Phat (Space)"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
            </button>

            <button
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
              onClick={() => { if (videoRef.current) videoRef.current.currentTime -= 10; }}
              title="Tua lui 10 giay"
              aria-label="Tua lui 10 giay"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 3a9 9 0 1 0 7.43 3.93L18 8.8A7 7 0 1 1 12.5 5V3z" />
                <path d="M12.5 3 9 6.5l3.5 3.5V3z" />
                <text x="8.5" y="15.5" fontSize="5.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">10</text>
              </svg>
            </button>

            <button
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
              onClick={() => { if (videoRef.current) videoRef.current.currentTime += 10; }}
              title="Tua toi 10 giay"
              aria-label="Tua toi 10 giay"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 3a9 9 0 1 1-7.43 3.93L6 8.8A7 7 0 1 0 11.5 5V3z" />
                <path d="M11.5 3 15 6.5 11.5 10V3z" />
                <text x="15.5" y="15.5" fontSize="5.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">10</text>
              </svg>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                className="text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
                onClick={toggleMute}
                title={isMuted ? "Bat am (M)" : "Tat am (M)"}
                aria-label={isMuted ? "Bat am thanh" : "Tat am thanh"}
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 19L19 20.27 20.27 19 5.27 4 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.5 12A4.5 4.5 0 0016 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min={0} max={1} step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={`h-1 cursor-pointer transition-all duration-200 ${isTouchDevice ? "w-16" : "w-0 group-hover:w-20"}`}
                style={{ accentColor: "var(--color-primary)" }}
                aria-label="Am luong"
              />
            </div>

            <span className="text-xs text-white/70 tabular-nums ml-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex-1" />

            <div className="relative">
              <button
                className="text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer w-9 text-center"
                onClick={(e) => { e.stopPropagation(); setShowSpeedMenu((v) => !v); }}
                title="Toc do phat"
                aria-label="Toc do phat"
              >
                {playbackRate === 1 ? "1x" : `${playbackRate}x`}
              </button>
              {showSpeedMenu && (
                <div
                  className="absolute bottom-8 right-0 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-10 min-w-[80px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedChange(s)}
                      className={`block w-full px-4 py-2 text-xs text-left transition-colors cursor-pointer ${
                        s === playbackRate
                          ? "bg-primary text-white"
                          : "text-zinc-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {s === 1 ? "1x (Mac dinh)" : `${s}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Thoat toan man hinh (F)" : "Toan man hinh (F)"}
              aria-label={isFullscreen ? "Thoat toan man hinh" : "Toan man hinh"}
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
