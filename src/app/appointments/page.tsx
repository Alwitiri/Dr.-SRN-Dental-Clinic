import type { Metadata } from "next";
import { CalendarCheck, ClipboardCheck, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections";
import { Reveal } from "@/components/ui";
import AppointmentForm from "@/components/AppointmentForm";
import { ToothMascot } from "@/components/art";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Dental Appointment in Ooty",
  description: "Request an appointment at Dr. SRN Dental Clinic, Ooty. Choose your treatment, date and time – the clinic confirms on WhatsApp.",
  alternates: { canonical: "/appointments" },
};

const steps = [
  { Icon: ClipboardCheck, t: "Fill in the form", d: "Your name, phone, treatment and preferred date & time." },
  { Icon: MessageCircle, t: "Send on WhatsApp", d: "Your request opens in WhatsApp, ready to send to the clinic." },
  { Icon: CalendarCheck, t: "Clinic confirms", d: "We reply with an available slot. Your booking is confirmed then." },
];

export default function Appointments() {
  return (
    <>
      <PageHero eyebrow="Appointments" title={<>Book your <span className="text-gradient">appointment</span></>} subtitle="Takes less than a minute. Your appointment is confirmed once the clinic replies." />

      <section className="container-x mt-14 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        <Reveal>
          <div className="card p-6 sm:p-9">
            <h2 className="text-2xl font-extrabold text-navy-900">Appointment request</h2>
            <p className="mb-6 mt-1 text-muted">All fields except the message are needed so we can reach you.</p>
            <AppointmentForm />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 p-7 text-white">
            <ToothMascot className="absolute -bottom-6 -right-4 w-32 opacity-90" />
            <h2 className="text-xl font-bold">How it works</h2>
            <ol className="relative mt-5 space-y-5 pr-16">
              {steps.map(({ Icon, t, d }, i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15"><Icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block font-bold">{i + 1}. {t}</span>
                    <span className="text-sm text-brand-100">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <a href={`tel:${site.phoneE164}`} className="card flex items-center gap-4 p-5 transition hover:shadow-lift">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><Phone className="h-5 w-5" /></span>
            <span>
              <span className="block text-sm text-muted">Toothache or urgent problem? Call directly</span>
              <span className="text-lg font-bold text-navy-900">{site.phoneDisplay}</span>
            </span>
          </a>
        </Reveal>
      </section>
    </>
  );
}
