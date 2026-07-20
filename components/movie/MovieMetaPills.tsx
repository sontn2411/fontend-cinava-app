interface MovieMetaPillsProps {
  time?: string;
  quality?: string;
  lang?: string;
  episodeCurrent?: string;
}

export function MovieMetaPills({ time, quality, lang, episodeCurrent }: MovieMetaPillsProps) {
  const pills = [
    { icon: "🕐", value: time },
    { icon: "📺", value: quality },
    { icon: "🌐", value: lang },
    { icon: "🎬", value: episodeCurrent },
  ].filter((p) => p.value);

  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {pills.map((pill) => (
        <span
          key={pill.icon}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-300 border border-white/10 rounded-full"
        >
          {pill.icon} {pill.value}
        </span>
      ))}
    </div>
  );
}
