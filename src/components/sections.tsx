import Link from "next/link";
import Image from "next/image";
import { Armchair, ArrowRight, Building2, Clock, DoorOpen, MapPin, Microscope, Phone, ShieldCheck, Users } from "lucide-react";
import { gallery, type GalleryItem } from "@/lib/gallery";
import { site, fullAddress, whatsappLink, defaultWhatsappMessage } from "@/lib/site";
import { treatments } from "@/lib/treatments";
import { ClinicIllustration, TreatmentIcon, WhatsAppIcon } from "./art";
import { Reveal } from "./ui";

export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow: string; title: React.ReactNode; subtitle?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-ivory">
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-brand-100 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="container-x relative py-16 sm:py-20">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
            <Link href="/" className="hover:text-brand-600">Home</Link> <span className="mx-1.5">/</span> <span className="text-navy-900">{eyebrow}</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function TreatmentGrid({ limit }: { limit?: number }) {
  const list = limit ? treatments.slice(0, limit) : treatments;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
      {list.map((t, i) => (
        <Reveal key={t.slug} delay={i * 0.05}>
          <Link
            href={`/treatments/${t.slug}`}
            className="card group flex h-full flex-col items-center gap-3 px-3 py-6 text-center transition duration-300 hover:-translate-y-1.5 hover:border-brand-400/40 hover:shadow-lift"
          >
            <span className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-b from-brand-50 to-white transition group-hover:scale-110">
              <TreatmentIcon kind={t.icon} className="h-14 w-14" />
            </span>
            <span className="text-sm font-bold leading-snug text-navy-900">{t.name}</span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

const galleryIcons = { door: DoorOpen, reception: Building2, chair: Armchair, equipment: Microscope, team: Users, sterile: ShieldCheck };

export function GalleryTile({ item, className = "" }: { item: GalleryItem; className?: string }) {
  const Icon = galleryIcons[item.icon];
  return (
    <figure className={`group relative overflow-hidden rounded-2xl shadow-card ${className}`}>
      {item.src ? (
        <Image src={item.src} alt={`${item.title} – ${site.name}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
      ) : item.icon === "chair" ? (
        <ClinicIllustration className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-white to-mist">
          <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#149bd9_1px,transparent_1px)] [background-size:18px_18px]" />
          <Icon className="absolute left-1/2 top-[42%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-brand-500/70 transition duration-500 group-hover:scale-110" strokeWidth={1.4} />
        </div>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-4 pt-10 text-white">
        <p className="font-bold">{item.title}</p>
        <p className="text-xs text-brand-100">{item.caption}</p>
      </figcaption>
    </figure>
  );
}

export function GalleryGrid({ limit }: { limit?: number }) {
  const list = limit ? gallery.slice(0, limit) : gallery;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((g, i) => (
        <Reveal key={g.title} delay={i * 0.06}>
          <GalleryTile item={g} className="aspect-[4/3]" />
        </Reveal>
      ))}
    </div>
  );
}

export function MapCard({ tall = false }: { tall?: boolean }) {
  return (
    <div className="card overflow-hidden">
      <iframe
        title={`Map showing ${site.name}`}
        src={site.maps.embed}
        className={`w-full border-0 ${tall ? "h-[420px]" : "h-72"}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex gap-2 text-sm text-muted"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {fullAddress}</p>
        <a href={site.maps.link} target="_blank" rel="noopener" className="btn btn-ghost !py-2 text-sm">
          Get Directions <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export function ContactStrip() {
  const items = [
    { Icon: Phone, label: "Call us", value: site.phoneDisplay, href: `tel:${site.phoneE164}` },
    { Icon: WhatsAppIcon, label: "WhatsApp", value: "Chat with the clinic", href: whatsappLink(defaultWhatsappMessage) },
    { Icon: MapPin, label: "Visit us", value: "Davisdale, Ooty – 643001", href: site.maps.link },
    { Icon: Clock, label: "Timings", value: site.hours ? site.hours[0].time : "Call to confirm", href: `tel:${site.phoneE164}` },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ Icon, label, value, href }) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lift">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon className="h-5 w-5" /></span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
            <span className="block font-bold text-navy-900">{value}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function CtaBanner() {
  return (
    <section className="container-x mt-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 px-6 py-12 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-teal-400/25 blur-3xl" />
          <h2 className="relative text-3xl font-extrabold sm:text-4xl">Ready for a healthier smile?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-brand-100">Request an appointment in under a minute. The clinic will confirm your slot on WhatsApp or by phone.</p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/appointments" className="btn bg-white text-navy-900 hover:bg-brand-50">Book Appointment <ArrowRight className="h-4 w-4" /></Link>
            <a href={`tel:${site.phoneE164}`} className="btn border border-white/25 text-white hover:bg-white/10"><Phone className="h-4 w-4" /> {site.phoneDisplay}</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
