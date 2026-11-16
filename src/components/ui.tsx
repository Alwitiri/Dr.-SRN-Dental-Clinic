"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: string;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <div className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}>
        {center && <span className="hidden h-px w-14 bg-gradient-to-r from-transparent to-brand-400 sm:block" />}
        <h2 className="text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{title}</h2>
        {center && <span className="hidden h-px w-14 bg-gradient-to-l from-transparent to-brand-400 sm:block" />}
      </div>
      {subtitle && <p className="mt-3 text-base text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
