export const APP_NAME = "Cinava";
export const APP_DESCRIPTION = "Xem phim trực tuyến chất lượng cao";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const ROUTES = {
  HOME: "/",
  MOVIES: "/movies",
  TV_SERIES: "/tv-series",
  GENRES: "/genres",
  SEARCH: "/search",
  WATCHLIST: "/watchlist",
  WATCH: "/watch",
} as const;

export const QUERY_KEYS = {
  MOVIES: "movies",
  MOVIE_DETAIL: "movie-detail",
  MOVIE_EPISODES: "movie-episodes",
  TRENDING: "trending",
  FEATURED: "featured",
  LATEST: "latest",
  GENRES: "genres",
  SEARCH: "search",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 24,
  MAX_PAGE_SIZE: 48,
} as const;
