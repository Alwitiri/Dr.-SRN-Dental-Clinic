"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Before/after comparison slider. Pass real `before`/`after` image URLs once the clinic
 * has genuine, consented patient photographs. Without them it shows a labelled illustration.
 */
export default function BeforeAfter({ before, after, alt = "Treatment result" }: { before?: string; after?: string; alt?: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const Teeth = ({ stained }: { stained: boolean }) => (
    <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="240" fill={stained ? "#f3e6e0" : "#eaf5fc"} />
      <path d="M30 90c60 110 280 110 340 0-30 140-310 140-340 0Z" fill="#c9465f" />
      <path d="M30 90c40-30 300-30 340 0-20 30-320 30-340 0Z" fill="#c9465f" />
      {[60, 105, 150, 200, 250, 295, 340].map((x, i) => {
        const w = i === 3 ? 48 : i === 2 || i === 4 ? 44 : 40;
        return (
          <rect
            key={x}
            x={x - w / 2}
            y={92}
            width={w}
            height={i === 0 || i === 6 ? 34 : 46}
            rx="12"
            fill={stained ? (i % 2 ? "#e8cf98" : "#dfc283") : "#ffffff"}
            stroke={stained ? "#c7a868" : "#cfe3f6"}
            strokeWidth="2"
            transform={stained && i === 2 ? `rotate(-6 ${x} 110)` : undefined}
          />
        );
      })}
      {[80, 125, 170, 230, 275, 320].map((x, i) => (
        <rect key={x} x={x - 18} y={142} width="36" height="30" rx="10" fill={stained ? "#e3c88e" : "#fbfdff"} stroke={stained ? "#c7a868" : "#cfe3f6"} strokeWidth="2" opacity={i === 0 || i === 5 ? 0.85 : 1} />
      ))}
    </svg>
  );

  return (
    <figure>
      <div
        ref={ref}
        className="relative aspect-[5/3] w-full touch-none select-none overflow-hidden rounded-2xl shadow-card"
        onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        <div className="absolute inset-0">
          {after ? <img src={after} alt={`${alt} – after`} className="h-full w-full object-cover" /> : <Teeth stained={false} />}
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {before ? <img src={before} alt={`${alt} – before`} className="h-full w-full object-cover" /> : <Teeth stained />}
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-bold text-white">Before</span>
        <span className="absolute right-3 top-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">After</span>
        <div className="absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lift">
            <ChevronLeft className="h-4 w-4" /><ChevronRight className="h-4 w-4" />
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Drag to compare before and after"
        />
      </div>
      {!before && (
        <figcaption className="mt-2 text-center text-xs text-muted">
          Illustration. Genuine patient photographs will be shown here only with the patient&apos;s consent.
        </figcaption>
      )}
    </figure>
  );
}
