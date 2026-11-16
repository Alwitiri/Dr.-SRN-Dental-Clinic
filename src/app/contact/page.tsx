import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero, ContactStrip, MapCard } from "@/components/sections";
import { Reveal } from "@/components/ui";
import { site, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description: `Contact Dr. SRN Dental Clinic, Ooty. Call ${site.phoneDisplay}, WhatsApp us, or visit ${fullAddress}.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>We&apos;re here to <span className="text-gradient">help</span></>} subtitle="Call, WhatsApp or visit us – near Sait Memorial Hospital, Davisdale, Ooty." />
      <section className="container-x mt-14 space-y-6">
        <ContactStrip />
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Reveal><MapCard tall /></Reveal>
          <Reveal delay={0.1} className="space-y-5">
            <div className="card p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-navy-900"><Clock className="h-5 w-5 text-brand-600" /> Opening hours</h2>
              {site.hours ? (
                <dl className="mt-4 space-y-2 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 border-b border-navy-900/5 pb-2">
                      <dt className="font-semibold text-navy-900">{h.days}</dt>
                      <dd className="text-muted">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-3 text-sm text-muted">Timings may vary. Please call <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-700">{site.phoneDisplay}</a> or WhatsApp us before visiting.</p>
              )}
            </div>
            <div className="card p-6">
              <h2 className="text-lg font-bold text-navy-900">Address</h2>
              <address className="mt-3 not-italic leading-relaxed text-muted">
                {site.name}<br />
                {site.address.line1}<br />
                {site.address.line2}<br />
                {site.address.city} – {site.address.postalCode}, {site.address.region}
              </address>
            </div>
            <Link href="/appointments" className="btn btn-primary w-full">Book Appointment <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
