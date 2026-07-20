import { ItemFlim } from "@/types/api.types";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

interface ItemSectionFlimProps {
    item: ItemFlim;
}

export const ItemSectionFlim = ({ item }: ItemSectionFlimProps) => {

    return (
        <Link 
            href={`/xem-phim/${item.slug}`} 
            className="relative flex-[0_0_140px] sm:flex-[0_0_160px] md:flex-[0_0_200px] lg:flex-[0_0_240px] flex flex-col group cursor-pointer"
        >
            {/* Image Container (Aspect ratio 4:5) */}
            <div className="relative w-full aspect-[4/6] rounded-xl overflow-hidden bg-background-card">
                <Image
                    src={item.poster_url}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
                />
                
                {/* Overlay gradient (global hover) */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Badges */}
                {item.episode_current && <div className="absolute top-2 left-2 flex gap-1 z-10">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-blue-600 to-primary text-white rounded shadow-md uppercase tracking-wider">
                        {item.episode_current}
                    </span>
                </div>}
                
              {item.time &&   <div className="absolute top-2 right-2 flex items-center justify-center min-w-[24px] z-10">
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-black/60 backdrop-blur-md text-white rounded">
                        {item.time}
                    </span>
                </div>}

                {/* Play Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,92,255,0.6)] scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play fill="currentColor" size={20} className="ml-1" />
                    </div>
                </div>

                {/* Bottom Gradient Overlay & Text Info */}
                <div className="absolute inset-x-0 bottom-0 pt-16 pb-3 px-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end pointer-events-none z-10">
                    <h3 className="text-xs md:text-sm font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
                        {item.name}
                    </h3>
                    <div className="flex items-center flex-wrap gap-1.5 mt-1.5">
                       
                        {item.lang && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-primary/80 text-white rounded uppercase backdrop-blur-sm shadow-sm border border-primary/20">
                                {item.lang}
                            </span>
                        )}
                         {item.quality && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-white/20 text-white rounded uppercase backdrop-blur-sm shadow-sm border border-white/10">
                                {item.quality}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};
