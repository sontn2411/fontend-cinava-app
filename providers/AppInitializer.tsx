"use client";

import type { ReactNode } from "react";
import { useSettingContext } from "./SettingProvider";
import { GlobalLoading } from "@/components/ui/GlobalLoading";

/**
 * AppInitializer is responsible for checking all global required data
 * (like settings, auth, config) before rendering the main application.
 * This aggregates all loading states into a single place.
 */
export function AppInitializer({ children }: { children: ReactNode }) {
  const { isLoading: isSettingLoading } = useSettingContext();
  
  // Sau này có thể thêm các hooks khác:
  // const { isLoading: isAuthLoading } = useAuthContext();
  // const { isLoading: isProfileLoading } = useProfile();

  const isAppLoading = isSettingLoading; // || isAuthLoading || isProfileLoading;

  if (isAppLoading) {
    return <GlobalLoading fullScreen />;
  }

  return <>{children}</>;
}
