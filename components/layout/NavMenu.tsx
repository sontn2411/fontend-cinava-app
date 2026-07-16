"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useSettingContext } from "@/providers";
import { cn } from "@/lib/utils";

interface NavMenuProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export function NavMenu({ isMobile, onItemClick }: NavMenuProps) {
  const { setting } = useSettingContext();
  const menus = setting?.menus;
  const pathname = usePathname();

  if (isMobile) {
    return (
      <ul className="border-t border-border bg-background-card px-4 py-4 md:hidden">
        {menus?.map((menu) => {
          const href = menu.slug;
          const isActive = pathname === href || (menu.key !== "home" && pathname.startsWith(href));

          return (
            <li key={menu.key}>
              <Link
                href={href}
                className={cn(
                  "block py-2 text-[15px] transition-colors",
                  isActive ? "font-medium text-primary" : "text-zinc-400 hover:text-white"
                )}
                onClick={onItemClick}
              >
                {menu.value}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="hidden items-center gap-8 md:flex">
      {menus?.map((menu) => {
        const href = menu.slug;
        const isActive = pathname === href || (menu.key !== "home" && pathname.startsWith(href));
        const hasChildren = menu.children && menu.children.length > 0;

        return (
          <li key={menu.key} className="group relative">
            <Link
              href={href}
              className={cn(
                "relative flex items-center gap-1.5 py-2 text-[15px] transition-colors font-medium",
                isActive ? " text-white" : "text-zinc-400 hover:text-white"
              )}
            >
              {menu.value}
              {hasChildren && <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />}
              
              {/* Active Indicator Underline */}
              {isActive && (
                <motion.span
                  layoutId="desktop-active-indicator"
                  className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>

            {hasChildren && (
              <div className="absolute left-1/2 top-full w-[500px] -translate-x-1/2 pt-2 invisible opacity-0 translate-y-2 scale-95 transition-all duration-[250ms] ease-out group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
                <div className="rounded-modal  bg-background-card p-4 shadow-default">
                  <ul className="grid max-h-[60vh] grid-cols-3 gap-2 overflow-y-auto scrollbar-hide">
                    {menu.children!.map((child) => (
                      <li key={child.key}>
                        <Link
                          href={child.slug}
                          className="block rounded-[14px] px-4 py-2 text-[15px] text-zinc-400 transition-colors hover:bg-background-hover hover:text-white"
                        >
                          {child.value}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
