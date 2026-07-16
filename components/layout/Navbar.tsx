"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { NavMenu } from "./NavMenu";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed left-0 top-0 z-50 w-full bg-gradient-to-b from-black/95 via-black/60 to-transparent pt-2 transition-all duration-1000 ease-in-out pointer-events-none ${isScrolled ? 'pb-32' : 'pb-4'}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 pointer-events-auto">
        <Link href={ROUTES.HOME} className="text-xl font-bold text-white">
          {APP_NAME}
        </Link>

        <NavMenu />

        <div className="flex items-center gap-4">
          <form action={ROUTES.SEARCH} className="relative flex items-center">
            <input
              type="text"
              name="q"
              placeholder="Tìm kiếm phim, diễn viên..."
              className="h-10 w-40 rounded-full bg-white/10 border border-white/10 pl-5 pr-12 text-[15px] text-white placeholder:text-zinc-400 transition-all hover:bg-white/15 focus:bg-white/20 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 md:w-72"
            />
            <button
              type="submit"
              className="absolute right-4 text-zinc-400 transition-colors hover:text-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

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
        <NavMenu isMobile onItemClick={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  );
}
