import { apiClient } from "./client";
import type { AppSetting } from "@/types/setting.types";
import type { ApiResponse } from "@/types/api.types";

export async function fetchSetting(): Promise<AppSetting> {
  const { data } = await apiClient.get<ApiResponse<AppSetting>>("/api/setting");
  return data.data;
}