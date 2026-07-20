"use client";

import { useRef, useEffect, useState } from "react";

interface SynopsisExpandProps {
  html: string;
}

export function SynopsisExpand({ html }: SynopsisExpandProps) {
  const clampedRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const clamped = clampedRef.current;
    const measured = measureRef.current;
    if (!clamped || !measured) return;

    // So sánh chiều cao thực (không bị clamp) với chiều cao hiển thị (bị clamp)
    const realHeight = measured.scrollHeight;
    const clampedHeight = clamped.clientHeight;
    setIsOverflow(realHeight > clampedHeight + 1);
  }, [html]);

  return (
    <div className="relative">
      {/* Div ẩn để đo chiều cao thực không bị clamp */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="text-white/80 invisible absolute top-0 left-0 right-0 pointer-events-none [&_p]:m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Div hiển thị thực */}
      <div
        ref={clampedRef}
        className="text-white/80 [&_p]:m-0"
        style={
          expanded
            ? {}
            : {
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {isOverflow && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 text-sm text-primary hover:text-primary-hover transition-colors cursor-pointer"
        >
          {expanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}
    </div>
  );
}


