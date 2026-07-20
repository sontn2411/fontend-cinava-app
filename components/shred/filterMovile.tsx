"use client";

import { useSettingContext } from "@/providers";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { getDefaultYear } from "@/lib/utils/getDefaultYear";

interface FilterMovieProps {
    hideMovieType?: boolean;
}

const FilterMovie = ({ hideMovieType = false }: FilterMovieProps) => {
    const { setting } = useSettingContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const segments = pathname.split("/").filter(Boolean);
    const currentSlug = segments[segments.length - 1] || "";
    const currentCategory = searchParams.get("category") || "";
    const currentCountry = searchParams.get("country") || "";
    const currentYear = searchParams.get("year") || String(getDefaultYear());

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname);
    };

    const categoryOptions = [
        { key: "", value: "Tất cả" },
        ...(setting?.categories?.children?.map((c) => ({ key: c.key, value: c.value })) || []),
    ];

    const countryOptions = [
        { key: "", value: "Tất cả" },
        ...(setting?.nationals?.children?.map((c) => ({ key: c.key, value: c.value })) || []),
    ];

    const yearOptions = [
        { key: "", value: "Tất cả" },
        ...(setting?.years?.map((y) => ({ key: String(y), value: String(y) })) || []),
    ];

    return (
        <div className="mt-6 flex flex-wrap items-center gap-3">
            {!hideMovieType && (
                <CustomSelect
                    label="Loại phim"
                    options={setting?.slug_list_flim || []}
                    value={currentSlug}
                    onChange={(key) => router.push(`/danh-sach/${key}`)}
                />
            )}
            <CustomSelect
                label="Thể loại"
                options={categoryOptions}
                value={currentCategory}
                onChange={(value) => updateParam("category", value)}
            />
            <CustomSelect
                label="Quốc gia"
                options={countryOptions}
                value={currentCountry}
                onChange={(value) => updateParam("country", value)}
            />
            <CustomSelect
                label="Năm"
                options={yearOptions}
                value={currentYear}
                onChange={(value) => updateParam("year", value)}
            />
        </div>
    );
};

export default FilterMovie;