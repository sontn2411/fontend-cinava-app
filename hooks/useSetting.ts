import { useQuery } from "@tanstack/react-query";
import { fetchSetting } from "@/lib/api/setting.api";
import { QUERY_KEYS } from "@/lib/constants";
import type { AppSetting } from "@/types/setting.types";

/**
 * Fetch app settings — called once on mount, cached for the entire session.
 * staleTime: Infinity ensures it never refetches unless manually invalidated.
 */
export function useSetting() {
  return useQuery<AppSetting>({
    queryKey: [QUERY_KEYS.SETTING],
    queryFn: fetchSetting,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
