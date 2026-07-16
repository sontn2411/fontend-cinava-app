"use client";

import { Search, X } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Tìm kiếm phim...",
  value: controlledValue,
  onChange,
  onSubmit,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue ?? internalValue;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.(value);
  }

  function handleClear() {
    setInternalValue("");
    onChange?.("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "group relative flex items-center rounded-full border border-white/10 bg-zinc-900 transition-colors focus-within:border-white/30",
        className,
      )}
    >
      <Search className="ml-4 h-4 w-4 shrink-0 text-zinc-500" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="mr-3 text-zinc-500 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
