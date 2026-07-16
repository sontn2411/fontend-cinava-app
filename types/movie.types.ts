export interface Movie {
  id: string;
  title: string;
  slug: string;
  originalTitle?: string;
  posterUrl: string;
  backdropUrl?: string;
  overview: string;
  releaseYear: number;
  duration?: number;
  rating?: number;
  quality?: string;
  language?: string;
  country?: string;
  type: "movie" | "tv-series";
  status: "ongoing" | "completed" | "upcoming";
  genres: { id: string; name: string; slug: string }[];
  episodeCount?: number;
  latestEpisode?: number;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MovieDetail extends Movie {
  trailerUrl?: string;
  director?: string;
  cast?: CastMember[];
  episodes?: Episode[];
  related?: Movie[];
}

export interface CastMember {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
}

export interface Episode {
  id: string;
  movieId: string;
  number: number;
  title?: string;
  slug: string;
  duration?: number;
  videoUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}
