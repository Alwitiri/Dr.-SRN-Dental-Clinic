import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, CtaBanner } from "@/components/sections";
import { Reveal, SectionHeading } from "@/components/ui";
import { TreatmentIcon } from "@/components/art";
import BeforeAfter from "@/components/BeforeAfter";
import ToothExplorer from "@/components/ToothExplorer";
import { treatments } from "@/lib/treatments";

export const metadata: Metadata = {
  title: "Dental Treatments in Ooty",
  description: "Root canal treatment, teeth cleaning, fillings, extractions, crowns & bridges, braces and cosmetic dentistry at Dr. SRN Dental Clinic, Ooty.",
  alternates: { canonical: "/treatments" },
};

export default function Treatments() {
  return (
    <>
      <PageHero eyebrow="Treatments" title={<>Dental treatments for <span className="text-gradient">the whole family</span></>} subtitle="From routine check-ups to smile makeovers – clear information so you know what to expect." />

      <section className="container-x mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {treatments.map((t, i) => (
          <Reveal key={t.slug} delay={(i % 3) * 0.07}>
            <Link href={`/treatments/${t.slug}`} className="card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
              <span className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-b from-brand-50 to-white ring-1 ring-brand-100 transition group-hover:scale-105">
                <TreatmentIcon kind={t.icon} className="h-14 w-14" />
              </span>
              <h2 className="mt-5 text-xl font-bold text-navy-900">{t.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.summary.split(". ")[0]}.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-all group-hover:gap-3">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="mt-24 bg-gradient-to-b from-ivory via-mist to-ivory py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Interactive" title="Not sure what you need?" subtitle="Explore common problems – then let the dentist confirm with an examination." />
          <div className="mt-12"><ToothExplorer /></div>
        </div>
      </section>

      <section className="container-x mt-16 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Smile transformations</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">See the difference care can make</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Drag the slider to compare. Cleaning, whitening and cosmetic treatments can make a visible difference – the right option depends on your teeth, so every plan starts with a consultation.
          </p>
          <Link href="/treatments/cosmetic-dentistry" className="btn btn-primary mt-6">Cosmetic dentistry <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <Reveal delay={0.1}><BeforeAfter /></Reveal>
      </section>

      <CtaBanner />
    </>
  );
}
