"use client";

import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface CustomSelectProps {
    label: string;
    options: { key: string; value: string }[];
    value: string;
    onChange: (key: string) => void;
}

export function CustomSelect({ label, options, value, onChange }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find((o) => o.key === value);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-2 min-w-[150px] rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium transition-all hover:bg-white/15 cursor-pointer ${
                    isOpen ? "ring-1 ring-white/20 bg-white/15" : ""
                } ${selected ? "text-white" : "text-zinc-400"}`}
            >
                <span className="truncate max-w-[140px]">
                    {value && selected ? selected.value : label}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 z-50 min-w-[200px] max-h-60 overflow-y-auto rounded-xl bg-zinc-900 border border-white/10 shadow-2xl shadow-black/50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map((option) => {
                        const isActive = option.key === value;
                        return (
                            <button
                                key={option.key}
                                type="button"
                                onClick={() => {
                                    onChange(option.key);
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                                    isActive
                                        ? "text-white bg-white/10 font-semibold"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <span>{option.value}</span>
                                {isActive && <Check className="w-4 h-4 text-primary shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
