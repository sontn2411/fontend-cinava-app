import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';

import animeImg from '@/assets/images/anime.png';
import haiHuocImg from '@/assets/images/hai-huoc.png';
import longTiengImg from '@/assets/images/long-tieng.png';
import thuyetMinhImg from '@/assets/images/thuyet-minh.png';

interface QuickAccessItem {
    id: number;
    name: string;
    desc: string;
    slug: string;
    image: StaticImageData;
    shadow: string;
}

const data: QuickAccessItem[] = [
    {
        id: 1,
        name: 'Thuyết minh',
        desc: 'Phim âm thanh chuẩn',
        slug: '',
        image: thuyetMinhImg,
        shadow: 'hover:shadow-blue-500/15',
    },
    {
        id: 2,
        name: 'Lồng tiếng',
        desc: 'Nhiều người xem nhất',
        slug: '',
        image: longTiengImg,
        shadow: 'hover:shadow-emerald-500/15',
    },
    {
        id: 3,
        name: 'Anime',
        desc: 'Đỉnh cao hoạt hình',
        slug: '',
        image: animeImg,
        shadow: 'hover:shadow-purple-500/15',
    },
    {
        id: 5,
        name: 'Hài hước',
        desc: 'Cười thả ga',
        slug: '',
        image: haiHuocImg,
        shadow: 'hover:shadow-rose-500/15',
    },
];

const QuickAccess = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {data.map((item) => (
                    <Link
                        key={item.id}
                        href={`/${item.slug}`}
                        className={`group relative flex items-center gap-3 md:gap-4 rounded-xl md:rounded-2xl bg-white/10 p-3 md:p-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.shadow}`}
                    >
                        {/* Image */}
                        <div className="relative shrink-0 w-11 h-11 md:w-14 md:h-14">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain drop-shadow-lg"
                                sizes="56px"
                            />
                        </div>

                        {/* Text */}
                        <div className="relative flex flex-col overflow-hidden">
                            <span className="text-sm md:text-base font-bold text-zinc-200 group-hover:text-white transition-colors duration-300 truncate">
                                {item.name}
                            </span>
                            <span className="text-[10px] md:text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 truncate mt-0.5">
                                {item.desc}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuickAccess;