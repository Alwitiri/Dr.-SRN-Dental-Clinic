"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

type Spot = {
  id: string;
  x: number;
  y: number;
  title: string;
  part: string;
  text: string;
  signs: string;
  treatment: { slug: string; name: string };
};

const spots: Spot[] = [
  {
    id: "enamel",
    x: 92,
    y: 70,
    part: "Enamel",
    title: "Cavities (tooth decay)",
    text: "Bacteria in plaque produce acids that soften enamel and create holes. Caught early, a small filling is usually enough.",
    signs: "Dark spots, sensitivity to sweets, food getting stuck.",
    treatment: { slug: "dental-fillings", name: "Dental Fillings" },
  },
  {
    id: "pulp",
    x: 150,
    y: 150,
    part: "Pulp",
    title: "Infected pulp",
    text: "When decay reaches the nerve inside the tooth, it can become inflamed or infected and cause severe pain.",
    signs: "Throbbing pain, lingering hot/cold sensitivity, swelling.",
    treatment: { slug: "root-canal-treatment", name: "Root Canal Treatment" },
  },
  {
    id: "gums",
    x: 214,
    y: 196,
    part: "Gums",
    title: "Gum disease",
    text: "Plaque and tartar along the gum line irritate the gums. Without cleaning, it can progress and loosen teeth.",
    signs: "Bleeding while brushing, red or puffy gums, bad breath.",
    treatment: { slug: "teeth-cleaning", name: "Teeth Cleaning" },
  },
  {
    id: "crown",
    x: 214,
    y: 70,
    part: "Crown",
    title: "Cracked or weak tooth",
    text: "Large fillings, grinding or injury can weaken a tooth. A crown covers and protects what remains.",
    signs: "Pain on biting, a visible crack, a broken cusp.",
    treatment: { slug: "crowns-and-bridges", name: "Crowns & Bridges" },
  },
  {
    id: "stain",
    x: 150,
    y: 46,
    part: "Surface",
    title: "Stains & discolouration",
    text: "Tea, coffee, tobacco and age can dull the colour of teeth. Cleaning and cosmetic options can brighten your smile.",
    signs: "Yellow or brown surface stains, uneven colour.",
    treatment: { slug: "cosmetic-dentistry", name: "Cosmetic Dentistry" },
  },
];

export default function ToothExplorer() {
  const [active, setActive] = useState<Spot>(spots[0]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 15 });

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] [&>*]:min-w-0">
      <div
        className="relative mx-auto w-full max-w-[460px] [perspective:1000px]"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => { mx.set(0); my.set(0); }}
      >
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-brand-100 to-white blur-2xl" />
        <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative [transform-style:preserve-3d]">
          <svg viewBox="0 0 300 330" className="w-full drop-shadow-[0_30px_40px_rgb(10_37_82/0.18)]" role="img" aria-label="Interactive tooth cross-section">
            <defs>
              <linearGradient id="te-enamel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#d5e6f6" />
              </linearGradient>
              <linearGradient id="te-dentin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff4dd" />
                <stop offset="1" stopColor="#f5dfb5" />
              </linearGradient>
              <linearGradient id="te-pulp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff8aa0" />
                <stop offset="1" stopColor="#e2456a" />
              </linearGradient>
            </defs>
            <clipPath id="te-clip"><rect width="300" height="330" rx="36" /></clipPath>
            <g clipPath="url(#te-clip)">
            <rect width="300" height="330" fill="#f3f8fd" />
            {/* tooth */}
            <path
              d="M95 20c-36 0-60 26-60 66 0 34 18 50 26 84 9 42 12 120 40 120 22 0 22-50 30-78 4-14 10-22 19-22s15 8 19 22c8 28 8 78 30 78 28 0 31-78 40-120 8-34 26-50 26-84 0-40-24-66-60-66-22 0-34 12-55 12S117 20 95 20Z"
              fill="url(#te-enamel)"
              stroke="#b9d3ec"
              strokeWidth="2"
            />
            <path
              d="M100 44c-24 0-42 18-42 46 0 26 14 40 20 66 8 36 10 104 26 104 12 0 12-40 18-62 4-16 14-26 28-26s24 10 28 26c6 22 6 62 18 62 16 0 18-68 26-104 6-26 20-40 20-66 0-28-18-46-42-46-16 0-28 10-50 10S116 44 100 44Z"
              fill="url(#te-dentin)"
            />
            <path d="M122 92c0-18 12-26 28-26s28 8 28 26c0 20-6 30-8 52-2 30-4 90-12 90-6 0-6-50-8-66-2 16-2 66-8 66-8 0-10-60-12-90-2-22-8-32-8-52Z" fill="url(#te-pulp)" opacity=".9" />
            {/* gums & bone over the roots */}
            <path d="M0 176c30-10 52-8 62 2 10 10 18 16 30 16 4 0 8-2 10-6h96c2 4 6 6 10 6 12 0 20-6 30-16 10-10 32-12 62-2v154H0Z" fill="#f49aae" opacity=".72" />
            <path d="M0 236c40-10 70-6 96 6h108c26-12 56-16 96-6v94H0Z" fill="#efd9c6" opacity=".7" />
            </g>
            {/* subtle cavity & stain marks */}
            <circle cx="92" cy="70" r="7" fill="#7c5a3a" opacity=".55" />
            <path d="M140 38c8 4 18 4 26 0" stroke="#d9b56b" strokeWidth="5" strokeLinecap="round" opacity=".6" />
            <path d="M206 60l10 18-6 8" stroke="#8aa5c4" strokeWidth="2" fill="none" />
            {spots.map((s) => (
              <g key={s.id} onClick={() => setActive(s)} className="cursor-pointer" role="button" tabIndex={0} aria-label={s.title}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(s)}>
                <circle cx={s.x} cy={s.y} r="16" fill="#149bd9" opacity={active.id === s.id ? 0.25 : 0}>
                  <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={s.x} cy={s.y} r="10" fill={active.id === s.id ? "#0a2552" : "#149bd9"} stroke="#fff" strokeWidth="3" />
                <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">+</text>
              </g>
            ))}
          </svg>
        </motion.div>
        <p className="mt-2 text-center text-xs text-muted">Tap a <span className="font-semibold text-brand-600">+</span> to explore · Illustration only</p>
      </div>

      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          {spots.map((s) => (
            <button key={s.id} onClick={() => setActive(s)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${active.id === s.id ? "bg-navy-900 text-white" : "bg-white text-navy-900 ring-1 ring-navy-900/10 hover:ring-brand-400"}`}>
              {s.part}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }} className="card p-6 sm:p-7">
            <p className="eyebrow">{active.part}</p>
            <h3 className="mt-2 text-xl font-bold text-navy-900 sm:text-2xl">{active.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{active.text}</p>
            <div className="mt-4 rounded-xl bg-brand-50 p-4 text-sm">
              <span className="font-semibold text-navy-900">Common signs: </span>
              <span className="text-muted">{active.signs}</span>
            </div>
            <Link href={`/treatments/${active.treatment.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-700 hover:gap-3 transition-all">
              Learn about {active.treatment.name} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
