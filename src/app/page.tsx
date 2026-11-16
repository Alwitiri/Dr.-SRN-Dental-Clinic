import Link from "next/link";
import { ArrowRight, CircleCheck, Gem, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import Hero from "@/components/Hero";
import { Reveal, SectionHeading } from "@/components/ui";
import { ContactStrip, CtaBanner, GalleryTile, MapCard, TreatmentGrid } from "@/components/sections";
import ToothExplorer from "@/components/ToothExplorer";
import Reviews from "@/components/Reviews";
import AppointmentForm from "@/components/AppointmentForm";
import { ToothMascot } from "@/components/art";
import { gallery } from "@/lib/gallery";

const why = [
  { Icon: HeartHandshake, t: "Expert & Gentle Care", d: "Calm, unhurried treatment with clear explanations." },
  { Icon: Gem, t: "Modern Technology", d: "Up-to-date equipment for comfortable, precise care." },
  { Icon: Users, t: "Personalised Treatment", d: "Plans built around your needs, goals and budget." },
  { Icon: ShieldCheck, t: "Hygienic & Safe Clinic", d: "Strict sterilisation and infection-control routines." },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Treatments */}
      <section className="container-x -mt-6 relative">
        <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="hidden w-40 sm:block" />
          <SectionHeading title="Our Treatments" subtitle="Comprehensive dental care for all ages" />
          <Link href="/treatments" className="btn btn-primary !py-2.5 text-sm sm:w-40">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <TreatmentGrid />
      </section>

      {/* About + Why */}
      <section className="container-x mt-24 grid gap-6 lg:grid-cols-[1fr_1.1fr_0.95fr] lg:items-stretch">
        <Reveal className="relative min-h-[300px] overflow-hidden rounded-3xl shadow-card">
          <div className="absolute inset-0"><GalleryTile item={gallery[2]} className="h-full !rounded-3xl" /></div>
          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-navy-900 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-brand-600" /> State-of-the-art dental care
          </span>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-center py-2">
          <p className="eyebrow">About the clinic</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            About <span className="text-gradient">Dr. SRN</span> Dental Clinic
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            We are committed to delivering dental care with compassion, skill and modern technology. Our goal is simple – to keep your smile healthy, comfortable and beautiful for life.
          </p>
          <ul className="mt-5 space-y-2.5">
            {["Experienced, caring dental team", "Modern equipment", "Friendly, relaxed environment"].map((x) => (
              <li key={x} className="flex items-center gap-2.5 font-medium text-navy-900"><CircleCheck className="h-5 w-5 text-brand-500" /> {x}</li>
            ))}
          </ul>
          <Link href="/about" className="btn btn-primary mt-7 self-start">Know More <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <Reveal delay={0.2} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-white p-7 ring-1 ring-brand-100">
          <h3 className="text-2xl font-extrabold text-navy-900">Why Choose Us?</h3>
          <ul className="mt-6 space-y-5">
            {why.map(({ Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm"><Icon className="h-5 w-5" /></span>
                <span>
                  <span className="block font-bold text-navy-900">{t}</span>
                  <span className="text-sm text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Interactive explorer */}
      <section className="mt-24 bg-gradient-to-b from-ivory via-mist to-ivory py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Know your teeth" title="Explore a Tooth" subtitle="Tap the hotspots to learn about common dental problems and how they're treated." />
          <div className="mt-12"><ToothExplorer /></div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-x mt-20">
        <SectionHeading title="What Our Patients Say" subtitle="Real smiles. Real stories." />
        <div className="mt-10"><Reviews /></div>
      </section>

      {/* Booking + gallery */}
      <section className="container-x mt-24 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 to-navy-800 p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="relative flex items-start gap-4">
              <ToothMascot stethoscope className="hidden w-28 shrink-0 sm:block" />
              <div>
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Book Your Appointment</h2>
                <p className="mt-1 text-brand-100">Take the first step towards a healthier smile!</p>
              </div>
            </div>
            <div className="relative mt-6"><AppointmentForm compact dark /></div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">Our Clinic Gallery</h2>
              <p className="mt-1 text-muted">A glimpse of our clinic</p>
            </div>
            <Link href="/clinic" className="flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2 transition-all">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <GalleryTile item={gallery[1]} className="col-span-2 aspect-[16/8]" />
            <GalleryTile item={gallery[2]} className="aspect-square" />
            <GalleryTile item={gallery[4]} className="aspect-square" />
          </div>
        </Reveal>
      </section>

      {/* Location */}
      <section className="container-x mt-24">
        <SectionHeading title="Find Us in Ooty" subtitle="Ground floor, Blue Mountain Restaurant Building – near Sait Memorial Hospital" />
        <div className="mt-10 space-y-5">
          <ContactStrip />
          <Reveal><MapCard /></Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
