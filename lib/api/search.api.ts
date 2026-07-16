import { apiClient } from "./client";
import type { Movie, PaginatedResponse } from "@/types/movie.types";

export async function searchMovies(
  query: string,
  params?: Record<string, string | number>,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await apiClient.get("/search", {
    params: { q: query, ...params },
  });
  return data;
}
