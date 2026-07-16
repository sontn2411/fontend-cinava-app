import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  playbackRate: number;
  currentEpisodeId: string | null;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  toggleFullscreen: () => void;
  setPlaybackRate: (rate: number) => void;
  setCurrentEpisode: (id: string) => void;
  reset: () => void;
}

const initialState = {
  isPlaying: false,
  isMuted: false,
  volume: 1,
  currentTime: 0,
  duration: 0,
  isFullscreen: false,
  playbackRate: 1,
  currentEpisodeId: null,
};

export const usePlayerStore = create<PlayerState>((set) => ({
  ...initialState,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  toggleFullscreen: () => set((s) => ({ isFullscreen: !s.isFullscreen })),
  setPlaybackRate: (playbackRate) => set({ playbackRate }),
  setCurrentEpisode: (id) => set({ currentEpisodeId: id }),
  reset: () => set(initialState),
}));
