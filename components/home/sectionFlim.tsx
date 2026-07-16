"use client";

import { ItemFlim } from "@/types/api.types";
import { useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ItemSectionFlim } from "./itemSectionFlim";

interface SectionFlimProps {
    id: number;
    name: string;
    items: ItemFlim[];
    slug?: string;
}

export const SectionFlim = ({ name, items, slug }: SectionFlimProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (!items || items.length === 0) return null;

    return (
        <section className="w-full px-4 md:px-0 mt-6 md:mt-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center gap-3">
                    {/* Vertical line indicator */}
                    <div className="w-1.5 h-6 md:h-7 bg-primary rounded-full shadow-[0_0_10px_rgba(124,92,255,0.5)]"></div>
                    
                    <Link href={slug || "#"} className="group flex items-center gap-2">
                        <h2 className="text-base md:text-xl lg:text-2xl font-bold text-white tracking-wide group-hover:text-primary transition-colors">
                            {name}
                        </h2>
                        {slug && (
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        )}
                    </Link>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={scrollPrev}
                        className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/20 transition text-white border border-white/10"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button 
                        onClick={scrollNext}
                        className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/20 transition text-white border border-white/10"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Carousel Viewport */}
            <div className="overflow-hidden -mx-4 px-4 md:-mx-8 md:px-8" ref={emblaRef}>
                <div className="flex gap-4 md:gap-5">
                    {items.map((item) => (
                        <ItemSectionFlim key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};