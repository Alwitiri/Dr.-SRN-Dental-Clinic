"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, HeartHandshake, MapPin, ShieldCheck, Smile, Sparkles, Star } from "lucide-react";
import { site } from "@/lib/site";
import { ToothMascot } from "./art";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease } });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-mist to-brand-100/70">
      {/* decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-gradient-to-br from-brand-400/25 to-teal-400/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-ivory to-transparent" />
        <svg className="absolute bottom-0 left-0 w-full text-ivory" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 50c240 30 480 30 720 0s480-30 720 0v30H0Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container-x relative grid items-center gap-10 pb-24 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-16">
        <div>
          <motion.p {...fade(0)} className="eyebrow !text-navy-800">Healthy smile. Happy you.</motion.p>
          <motion.h1 {...fade(0.08)} className="mt-4 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-navy-900 sm:text-6xl lg:text-[4.2rem]">
            Your Smile Deserves the <span className="text-gradient">Best Care.</span>
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Expert dental care in the heart of Ooty, with a gentle touch and modern technology – just near Sait Memorial Hospital, Davisdale.
          </motion.p>
          <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/appointments" className="btn btn-primary !px-6 !py-3.5">
              <CalendarDays className="h-4 w-4" /> Book Appointment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/clinic" className="btn btn-ghost !px-6 !py-3.5">
              <MapPin className="h-4 w-4 text-brand-600" /> See Our Clinic
            </Link>
          </motion.div>
          <motion.ul {...fade(0.32)} className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-navy-900">
            <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-brand-600" /> Trusted Care</li>
            <li className="flex items-center gap-2"><Smile className="h-5 w-5 text-brand-600" /> Modern Facilities</li>
            <li className="flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-brand-600" /> Patient First</li>
          </motion.ul>
        </div>

        {/* Visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="relative mx-auto aspect-square w-full max-w-[540px]"
        >
          <div className="absolute inset-[6%] rounded-full bg-gradient-to-br from-white to-brand-100 shadow-[inset_0_-20px_60px_rgb(20_155_217/0.18),0_40px_80px_-30px_rgb(10_37_82/0.35)]" />
          <div className="absolute inset-[16%] rounded-full border-2 border-dashed border-brand-400/30 motion-safe:animate-[spin_60s_linear_infinite]" />
          <ToothMascot className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-[48%] motion-safe:animate-float" />
          <Sparkles className="absolute left-[18%] top-[16%] h-8 w-8 text-amber-400 motion-safe:animate-pulse" />
          <Sparkles className="absolute right-[14%] top-[40%] h-5 w-5 text-brand-400 motion-safe:animate-pulse" />

          <p className="absolute right-[2%] top-[6%] rotate-[-10deg] font-script text-4xl font-bold text-navy-800 sm:text-5xl">
            Smile <span className="block pl-6">Confidently</span>
          </p>

          {site.googleRating && (
            <div className="card absolute bottom-[12%] left-0 flex items-center gap-3 !rounded-2xl px-4 py-3 motion-safe:animate-float-slow sm:left-[-2%]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-50"><Star className="h-5 w-5 fill-amber-400 text-amber-400" /></span>
              <span>
                <span className="block text-lg font-extrabold leading-none text-navy-900">{site.googleRating}</span>
                <span className="text-xs text-muted">Google rating</span>
              </span>
            </div>
          )}
          <div className="card absolute bottom-[4%] right-[2%] flex items-center gap-3 !rounded-2xl px-4 py-3 motion-safe:animate-float">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50"><HeartHandshake className="h-5 w-5 text-brand-600" /></span>
            <span>
              <span className="block text-sm font-bold text-navy-900">Gentle care</span>
              <span className="text-xs text-muted">for all ages</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
