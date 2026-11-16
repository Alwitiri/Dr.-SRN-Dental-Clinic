import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, CircleCheck, ClipboardList, HeartPulse, Phone } from "lucide-react";
import { PageHero, JsonLd } from "@/components/sections";
import { Reveal } from "@/components/ui";
import { TreatmentIcon, WhatsAppIcon } from "@/components/art";
import AppointmentForm from "@/components/AppointmentForm";
import BeforeAfter from "@/components/BeforeAfter";
import { getTreatment, treatments } from "@/lib/treatments";
import { site, whatsappLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTreatment((await params).slug);
  if (!t) return {};
  return {
    title: `${t.name} in Ooty`,
    description: `${t.name} at Dr. SRN Dental Clinic, Davisdale, Ooty. ${t.short} Learn what to expect and book an appointment.`,
    alternates: { canonical: `/treatments/${t.slug}` },
  };
}

export default async function TreatmentPage({ params }: Props) {
  const t = getTreatment((await params).slug);
  if (!t) notFound();
  const others = treatments.filter((x) => x.slug !== t.slug).slice(0, 4);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalProcedure",
        name: t.name,
        description: t.summary,
        url: `${site.url}/treatments/${t.slug}`,
        provider: { "@id": `${site.url}/#clinic` },
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Treatments", item: `${site.url}/treatments` },
          { "@type": "ListItem", position: 3, name: t.name, item: `${site.url}/treatments/${t.slug}` },
        ],
      },
    ],
  };

  const blocks = [
    { Icon: HeartPulse, title: "When you might need it", items: t.whenNeeded },
    { Icon: ClipboardList, title: "What to expect", items: t.whatToExpect },
    { Icon: CircleCheck, title: "Aftercare tips", items: t.aftercare },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero eyebrow={t.name} title={<>{t.name} <span className="text-gradient">in Ooty</span></>} subtitle={t.short}>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#book" className="btn btn-primary"><CalendarDays className="h-4 w-4" /> Request appointment</a>
          <a href={whatsappLink(`Hello, I'd like to know more about ${t.name}.`)} target="_blank" rel="noopener" className="btn btn-ghost">
            <WhatsAppIcon className="h-4 w-4 text-[#25d366]" /> Ask on WhatsApp
          </a>
        </div>
      </PageHero>

      <div className="container-x mt-14 grid gap-10 lg:grid-cols-[1fr_380px]">
        <article>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <span className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-b from-brand-50 to-white ring-1 ring-brand-100">
              <TreatmentIcon kind={t.icon} className="h-16 w-16" />
            </span>
            <p className="text-lg leading-relaxed text-ink">{t.summary}</p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blocks.map(({ Icon, title, items }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="card h-full p-6">
                  <Icon className="h-7 w-7 text-brand-600" />
                  <h2 className="mt-3 text-lg font-bold text-navy-900">{title}</h2>
                  <ul className="mt-3 space-y-2.5">
                    {items.map((x) => (
                      <li key={x} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {t.slug === "cosmetic-dentistry" && (
            <Reveal className="mt-12"><BeforeAfter /></Reveal>
          )}

          <section className="mt-14">
            <h2 className="text-2xl font-extrabold text-navy-900">Frequently asked questions</h2>
            <div className="mt-5 space-y-3">
              {t.faqs.map((f) => (
                <details key={f.q} className="card group p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-navy-900">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 rounded-2xl bg-brand-50 p-4 text-sm text-muted">
              This page is general information and not a diagnosis. The dentist will recommend treatment only after examining you.
            </p>
          </section>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div id="book" className="card scroll-mt-28 p-6">
            <h2 className="text-xl font-bold text-navy-900">Request an appointment</h2>
            <p className="mb-5 mt-1 text-sm text-muted">We&apos;ll confirm your slot on WhatsApp.</p>
            <AppointmentForm compact defaultTreatment={t.name} />
          </div>
          <a href={`tel:${site.phoneE164}`} className="card flex items-center gap-4 p-5 transition hover:shadow-lift">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-white"><Phone className="h-5 w-5" /></span>
            <span><span className="block text-xs text-muted">Prefer to talk?</span><span className="font-bold text-navy-900">{site.phoneDisplay}</span></span>
          </a>
        </aside>
      </div>

      <section className="container-x mt-20">
        <h2 className="text-2xl font-extrabold text-navy-900">Other treatments</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <Link key={o.slug} href={`/treatments/${o.slug}`} className="card group flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lift">
              <TreatmentIcon kind={o.icon} className="h-12 w-12 shrink-0" />
              <span className="flex-1 font-semibold text-navy-900">{o.name}</span>
              <ArrowRight className="h-4 w-4 text-brand-600 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
