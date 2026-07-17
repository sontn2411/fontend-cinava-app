"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ROUTES } from "@/lib/constants";
import { NavMenu } from "./NavMenu";
import { SearchBox } from "./SearchBox";
import logoCinava from "@/assets/images/logo-cinava.png";

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
    <header className={`fixed left-0 top-0 z-50 w-full bg-gradient-to-b from-black/95 via-black/60 to-transparent pt-2 transition-all duration-1000 ease-in-out pointer-events-none ${isScrolled ? 'pb-20' : 'pb-4'}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 pointer-events-auto">
        <Link href={ROUTES.HOME} className="shrink-0">
          <Image src={logoCinava} alt="Cinava" className="h-8 md:h-10 w-auto" priority />
        </Link>

        <NavMenu />

        <div className="flex items-center gap-4">
          <SearchBox />

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
