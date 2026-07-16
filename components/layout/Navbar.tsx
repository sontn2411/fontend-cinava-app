"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { APP_NAME, ROUTES } from "@/lib/constants";

const NAV_LINKS = [
  { href: ROUTES.HOME, label: "Trang chủ" },
  { href: ROUTES.MOVIES, label: "Phim lẻ" },
  { href: ROUTES.TV_SERIES, label: "Phim bộ" },
  { href: ROUTES.GENRES, label: "Thể loại" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href={ROUTES.HOME} className="text-xl font-bold text-white">
          {APP_NAME}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href={ROUTES.SEARCH}
            className="text-zinc-400 transition-colors hover:text-white"
          >
            <Search className="h-5 w-5" />
          </Link>

          <button
            type="button"
            className="text-zinc-400 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <ul className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 text-sm text-zinc-400 transition-colors hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
