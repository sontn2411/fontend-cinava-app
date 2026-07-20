"use client";

import { useSettingContext } from "@/providers";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { getDefaultYear } from "@/lib/utils/getDefaultYear";

interface FilterMovieSubProps {
    sub: string;
    mainSlug: string;
}

export const FilterMovieSub = ({ sub, mainSlug }: FilterMovieSubProps) => {
    const { setting } = useSettingContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentYear = searchParams.get("year") || String(getDefaultYear());

    const isCategory = mainSlug === "the-loai";
    const isCountry = mainSlug === "quoc-gia";

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
            {/* Thể loại: active nếu đang ở the-loai, navigate bằng path */}
            <CustomSelect
                label="Thể loại"
                options={categoryOptions}
                value={isCategory ? sub : (searchParams.get("category") || "")}
                onChange={(value) => {
                    if (isCategory) {
                        const qs = searchParams.toString();
                        router.push(value ? `/danh-sach/the-loai/${value}${qs ? `?${qs}` : ""}` : `/danh-sach/the-loai/${sub}`);
                    } else {
                        updateParam("category", value);
                    }
                }}
            />

            {/* Quốc gia: active nếu đang ở quoc-gia, navigate bằng path */}
            <CustomSelect
                label="Quốc gia"
                options={countryOptions}
                value={isCountry ? sub : (searchParams.get("country") || "")}
                onChange={(value) => {
                    if (isCountry) {
                        const qs = searchParams.toString();
                        router.push(value ? `/danh-sach/quoc-gia/${value}${qs ? `?${qs}` : ""}` : `/danh-sach/quoc-gia/${sub}`);
                    } else {
                        updateParam("country", value);
                    }
                }}
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