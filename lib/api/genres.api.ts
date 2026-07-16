import { apiClient } from "./client";
import type { Genre } from "@/types/genre.types";

export async function getGenres(): Promise<Genre[]> {
  const { data } = await apiClient.get("/genres");
  return data;
}

export async function getGenreBySlug(slug: string): Promise<Genre> {
  const { data } = await apiClient.get(`/genres/${slug}`);
  return data;
}
