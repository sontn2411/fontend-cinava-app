import Image from "next/image";

interface MoviePosterProps {
  posterUrl: string;
  name: string;
  quality?: string;
}

export function MoviePoster({ posterUrl, name, quality }: MoviePosterProps) {
  return (
    <div className="shrink-0 w-[180px] sm:w-[220px] self-center sm:self-start">
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        <Image
          src={posterUrl}
          alt={name}
          fill
          priority
          className="object-cover"
          sizes="220px"
        />
        {/* {quality && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-primary text-white rounded">
            {quality}
          </span>
        )} */}
      </div>
    </div>
  );
}
