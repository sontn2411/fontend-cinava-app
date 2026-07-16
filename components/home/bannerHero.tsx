"use client";

import { ItemFlim } from "@/types/api.types";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface BannerHeroProps {
    items: ItemFlim[];
}

const BannerHero = ({ items }: BannerHeroProps) => {
    const slides = items?.slice(0, 10) ?? [];
    const [activeIndex, setActiveIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: true })
    ]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setActiveIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setActiveIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    if (!slides.length) return null;

    return (
        <div className="relative w-full mt-2 md:mt-4 rounded-xl md:rounded-2xl overflow-hidden h-[350px] sm:h-[400px] md:h-[500px]">
            {/* Absolute overlay for crisp border */}
            <div className="absolute inset-0 border border-white/10 rounded-xl md:rounded-2xl pointer-events-none z-30" />
            {/* Embla Viewport */}
            <div className="overflow-hidden h-full" ref={emblaRef}>
                {/* Embla Container */}
                <div className="flex h-full">
                    {slides.map((item, i) => (
                        <div
                            key={item._id}
                            className="relative flex-[0_0_100%] min-w-0 overflow-hidden h-[350px] sm:h-[400px] md:h-[500px]"
                        >
                            <Image
                                src={item.thumb_url || item.poster_url}
                                alt={item.name}
                                fill
                                priority={i === 0}
                                className="object-cover "
                                sizes="(max-width: 1280px) 100vw, 1280px"
                            />
                            
                            {/* Linear Gradient bao phủ cả 2 bên (Tối trái, sáng giữa, tối phải) */}
                            <div 
                                className="absolute inset-0 hidden md:block"
                                style={{
                                    background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.8) 100%)'
                                }}
                            />
                            {/* Mobile Gradient: Tối đều từ dưới lên hoặc từ trái sang nhiều hơn */}
                            <div 
                                className="absolute inset-0 block md:hidden"
                                style={{
                                    background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 100%)'
                                }}
                            />

                            {/* Nội dung bên trái */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 w-full max-w-[85%] md:max-w-2xl px-4 sm:px-6 md:px-8 flex flex-col items-start">
                                {/* Badge */}
                                <span className="px-2 py-1 md:px-3 md:py-1 bg-primary/20 text-primary text-[10px] md:text-xs font-semibold rounded mb-2 md:mb-4">
                                    Mới cập nhật
                                </span>
                                
                                {/* Title */}
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg uppercase tracking-wide line-clamp-2 leading-snug md:leading-normal pt-1">
                                    {item.name}
                                </h1>
                                
                                {/* Subtitle */}
                                <p className="mt-1 md:mt-2 text-sm md:text-base font-bold text-zinc-300 drop-shadow-md line-clamp-1">
                                    {item.origin_name}
                                </p>

                    
                                {/* Buttons */}
                                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 md:mt-8">
                                    <button className="flex items-center gap-1.5 md:gap-2 rounded-lg bg-primary px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-semibold text-white transition hover:bg-primary-hover shadow-lg shadow-primary/20 hover:scale-105">
                                        <Play fill="currentColor" className="w-4 h-4 md:w-5 md:h-5" />
                                        Xem ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bảng điều khiển bên phải (Ẩn trên mobile vì vuốt cảm ứng là đủ) */}
            <div className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6">
                {/* Phân trang */}
                <div className="flex flex-col items-center text-sm font-bold gap-1">
                    <span className="text-white">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                    <div className="w-5 h-[2px] bg-white/20 rounded-full" />
                    <span className="text-zinc-500">{slides.length.toString().padStart(2, '0')}</span>
                </div>

                {/* Nút Previous */}
                <button
                    onClick={scrollPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Nút Next */}
                <button
                    onClick={scrollNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-primary-hover shadow-lg shadow-primary/30 hover:scale-110"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default BannerHero;
