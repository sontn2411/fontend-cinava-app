"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSetting } from "@/hooks/useSetting";
import type { AppSetting } from "@/types/setting.types";

interface SettingContextValue {
  setting: AppSetting | undefined;
  isLoading: boolean;
  isError: boolean;
}

const SettingContext = createContext<SettingContextValue>({
  setting: undefined,
  isLoading: true,
  isError: false,
});

/**
 * Provides app settings globally.
 * Wrap this inside QueryProvider so React Query is available.
 * Fetches once on mount; all children access via useSettingContext().
 */
export function SettingProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useSetting();

  // Không block loading ở đây nữa, để AppInitializer lo việc hiển thị loading tổng hợp


  return (
    <SettingContext value={{ setting: data, isLoading, isError }}>
      {children}
    </SettingContext>
  );
}

export function useSettingContext() {
  const ctx = useContext(SettingContext);
  if (ctx === undefined) {
    throw new Error("useSettingContext must be used within SettingProvider");
  }
  return ctx;
}
