import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, HeartHandshake, MessageCircle, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { PageHero, GalleryGrid, CtaBanner } from "@/components/sections";
import { Reveal, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us – Dentist in Ooty",
  description: "Meet Dr. SRN and learn about our gentle, patient-first approach to dental care at our clinic in Davisdale, Ooty.",
  alternates: { canonical: "/about" },
};

const values = [
  { Icon: HeartHandshake, t: "Gentle first", d: "Comfort matters. We work calmly, check in often and never rush you." },
  { Icon: MessageCircle, t: "Honest explanations", d: "You'll understand your options – and why – before any treatment starts." },
  { Icon: ShieldCheck, t: "Uncompromising hygiene", d: "Sterilised instruments and strict infection control for every patient." },
  { Icon: Sparkles, t: "Prevention focused", d: "Keeping natural teeth healthy is always our first goal." },
];

export default function About() {
  const d = site.doctor;
  return (
    <>
      <PageHero eyebrow="About Us" title={<>Caring for Ooty&apos;s smiles, <span className="text-gradient">one patient at a time</span></>} subtitle="A modern, welcoming dental clinic in Davisdale – built around patient comfort and trust." />

      <section className="container-x mt-16 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-100 via-white to-mist shadow-lift">
            {d.photo ? (
              <Image src={d.photo} alt={`${d.name}, dentist at ${site.name}`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" priority />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="mx-auto grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-navy-900 to-brand-600 text-5xl font-extrabold text-white shadow-lift">SRN</div>
                  <Stethoscope className="mx-auto mt-6 h-10 w-10 text-brand-500" strokeWidth={1.5} />
                </div>
              </div>
            )}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
              <p className="text-lg font-extrabold text-navy-900">{d.name}</p>
              <p className="text-sm text-muted">{d.qualifications || "Dentist"}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Meet your dentist</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{d.name}</h2>
          {d.qualifications && <p className="mt-2 flex items-center gap-2 font-semibold text-brand-700"><Award className="h-5 w-5" /> {d.qualifications}</p>}
          {d.experience && <p className="mt-1 text-muted">{d.experience}</p>}
          <div className="prose-clinic mt-5 space-y-4">
            {d.bio ? (
              <p>{d.bio}</p>
            ) : (
              <>
                <p>
                  At {site.name}, every visit begins with listening. We want you to feel relaxed, informed and in control of your dental care – whether you are here for a routine check-up or a more involved treatment.
                </p>
                <p>
                  Our clinic is on the ground floor of the Blue Mountain Restaurant Building near Sait Memorial Hospital, making it easy to reach for families across Ooty.
                </p>
              </>
            )}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/appointments" className="btn btn-primary">Book a consultation <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/treatments" className="btn btn-ghost">Our treatments</Link>
          </div>
        </Reveal>
      </section>

      <section className="container-x mt-24">
        <SectionHeading eyebrow="Our philosophy" title="How we care for you" subtitle="The principles behind every appointment." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.07}>
              <div className="card h-full p-6 transition hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 text-white"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-lg font-bold text-navy-900">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x mt-24">
        <SectionHeading title="Inside our clinic" subtitle="Clean, bright and designed for your comfort." />
        <div className="mt-10"><GalleryGrid limit={3} /></div>
      </section>

      <CtaBanner />
    </>
  );
}
