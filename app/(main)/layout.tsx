"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFullWidth = pathname.startsWith("/danh-sach");

  return (
    <>
      <Navbar />
      <main className={`flex-1 w-full ${isFullWidth ? "" : "max-w-7xl mx-auto mt-16"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
