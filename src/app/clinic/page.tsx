import type { Metadata } from "next";
import { Armchair, Microscope, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero, GalleryGrid, MapCard, CtaBanner } from "@/components/sections";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Clinic – Photos & Facilities",
  description: "Take a look inside Dr. SRN Dental Clinic in Davisdale, Ooty – reception, treatment room, equipment and sterilisation.",
  alternates: { canonical: "/clinic" },
};

const facilities = [
  { Icon: Armchair, t: "Comfortable treatment room", d: "A relaxing dental chair and calm surroundings." },
  { Icon: Microscope, t: "Modern equipment", d: "Up-to-date instruments for accurate, efficient care." },
  { Icon: ShieldCheck, t: "Sterilisation protocol", d: "Instruments are cleaned and sterilised for every patient." },
  { Icon: Sparkles, t: "Clean, bright spaces", d: "A tidy, welcoming clinic from reception to chair." },
];

export default function Clinic() {
  return (
    <>
      <PageHero eyebrow="Our Clinic" title={<>A clinic designed for <span className="text-gradient">your comfort</span></>} subtitle="Clean, modern and easy to reach – on the ground floor near Sait Memorial Hospital, Davisdale." />

      <section className="container-x mt-14">
        <GalleryGrid />
      </section>

      <section className="container-x mt-24">
        <SectionHeading title="Facilities" subtitle="Everything you need for a comfortable visit." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.07}>
              <div className="card h-full p-6">
                <Icon className="h-8 w-8 text-brand-600" strokeWidth={1.6} />
                <h3 className="mt-4 font-bold text-navy-900">{t}</h3>
                <p className="mt-1.5 text-sm text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x mt-24">
        <SectionHeading title="How to reach us" />
        <Reveal className="mt-10"><MapCard tall /></Reveal>
      </section>

      <CtaBanner />
    </>
  );
}
