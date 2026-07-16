import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Image from "next/image";
import bgImage from "@/assets/images/background.png";
import { QueryProvider } from "@/providers/QueryProvider";
import { SettingProvider } from "@/providers/SettingProvider";
import { AppInitializer } from "@/providers/AppInitializer";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cinava - Xem phim trực tuyến",
    template: "%s | Cinava",
  },
  description: "Xem phim trực tuyến chất lượng cao, cập nhật nhanh nhất",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white">
        {/* Global Background */}
        <div className="fixed inset-0 -z-50 h-full w-full">
          <Image
            src={bgImage}
            alt="Cinematic Background"
            fill
            priority
            quality={90}
            placeholder="blur"
            className="object-cover"
          />
   
          <div className="absolute inset-0 bg-background/50" />
        </div>

        <QueryProvider>
          <SettingProvider>
            <AppInitializer>{children}</AppInitializer>
          </SettingProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
