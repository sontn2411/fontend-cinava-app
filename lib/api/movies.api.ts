import { apiClient } from "./client";
import type {
  Movie,
  MovieDetail,
  Episode,
  PaginatedResponse,
} from "@/types/movie.types";

export async function getMovies(
  params?: Record<string, string | number>,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await apiClient.get("/movies", { params });
  return data;
}

export async function getMovieBySlug(slug: string): Promise<MovieDetail> {
  const { data } = await apiClient.get(`/movies/${slug}`);
  return data;
}

export async function getMovieEpisodes(movieId: string): Promise<Episode[]> {
  const { data } = await apiClient.get(`/movies/${movieId}/episodes`);
  return data;
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const { data } = await apiClient.get("/movies/trending");
  return data;
}

export async function getFeaturedMovies(): Promise<Movie[]> {
  const { data } = await apiClient.get("/movies/featured");
  return data;
}

export async function getLatestMovies(): Promise<Movie[]> {
  const { data } = await apiClient.get("/movies/latest");
  return data;
}
