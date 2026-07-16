import type { Metadata } from "next";
import { Suspense } from "react";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import BannerHero from "@/components/home/bannerHero";
import { homeService } from "@/lib/api/home.api";
import type { ItemFlim, SectionItemFlim } from "@/types/api.types";
import { SectionFlim } from "@/components/home/sectionFlim";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await homeService.getData();
    const seo = data?.seoOnPage;

    if (seo) {
      return {
        title: seo.titleHead ? `${seo.titleHead} | ${APP_NAME}` : APP_NAME,
        description: seo.descriptionHead || APP_DESCRIPTION,
        openGraph: seo.og_image ? { images: [seo.og_image] } : undefined,
      };
    }
  } catch (error) {
    console.error("Failed to fetch SEO data:", error);
  }

  return {
    title: `${APP_NAME} - ${APP_DESCRIPTION}`,
    description: APP_DESCRIPTION,
  };
}

export default async function HomePage() {
  let items: ItemFlim[] = [];
  let listMovie: SectionItemFlim[] = [];
  try {
    const [data, dataListMovie] = await Promise.all([
      homeService.getUpdate(),
      homeService.getListMovie(),
    ]);
    items = data?.items || [];
    listMovie = dataListMovie || [];
  } catch (err) {
    console.error('[HomePage] homeService.getData() FAILED:', err);
  }

  return (
    <div className="min-h-screen w-full space-y-16">
      <Suspense fallback={<div style={{ height: '500px' }} className="w-full bg-background-secondary animate-pulse" />}>
        <BannerHero items={items} />
      </Suspense>

      {listMovie.map(item => (
        <SectionFlim key={item.id} {...item} />
      ))}
    </div>
  );
}
