"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { nav, site, whatsappLink, defaultWhatsappMessage, fullAddress } from "@/lib/site";
import { treatments } from "@/lib/treatments";
import { LogoMark, TreatmentIcon, WhatsAppIcon } from "./art";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} – home`}>
      <LogoMark className="h-11 w-11 shrink-0" />
      <span className="whitespace-nowrap leading-none">
        <span className={`block text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-navy-900"}`}>
          {site.shortName}
        </span>
        <span className={`block text-[0.95rem] font-semibold ${light ? "text-brand-100" : "text-navy-800"}`}>
          Dental Clinic
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy-900 text-[0.8rem] text-brand-100">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <a href={site.maps.link} target="_blank" rel="noopener" className="hidden items-center gap-1.5 truncate hover:text-white md:flex">
            <MapPin className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{fullAddress}</span>
          </a>
          <span className="md:hidden">Davisdale, Ooty</span>
          <div className="flex shrink-0 items-center gap-4">
            <a href={`tel:${site.phoneE164}`} className="flex items-center gap-1.5 whitespace-nowrap font-semibold text-white hover:text-brand-400">
              <Phone className="h-3.5 w-3.5" /> {site.phoneDisplay}
            </a>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener"
              className="hidden items-center gap-1.5 whitespace-nowrap font-semibold text-white hover:text-[#5be38a] sm:flex"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25d366]" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled ? "border-navy-900/5 bg-white/85 shadow-[0_8px_30px_-12px_rgb(10_37_82/0.18)] backdrop-blur-xl" : "border-transparent bg-white"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo />
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            {nav.map((item) =>
              item.hasMenu ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                      isActive(item.href) ? "bg-brand-500 text-white" : "text-navy-900 hover:text-brand-600"
                    }`}
                  >
                    {item.label} <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="card grid grid-cols-2 gap-1 p-3">
                      {treatments.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/treatments/${t.slug}`}
                          className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-brand-50"
                        >
                          <TreatmentIcon kind={t.icon} className="h-9 w-9 shrink-0" />
                          <span>
                            <span className="block text-sm font-semibold text-navy-900">{t.name}</span>
                            <span className="block text-xs text-muted">{t.short}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                    isActive(item.href) ? "bg-brand-500 text-white" : "text-navy-900 hover:text-brand-600"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/appointments" className="btn btn-primary hidden !py-2.5 sm:inline-flex">
              <CalendarDays className="h-4 w-4" /> Book Appointment
            </Link>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-navy-900/10 text-navy-900 xl:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              aria-label="Mobile menu"
            >
              <div className="mb-6 flex items-center justify-between">
                <Logo />
                <button className="grid h-10 w-10 place-items-center rounded-full bg-mist" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-xl px-4 py-3 text-base font-semibold ${
                      isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-navy-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-3 pt-8">
                <Link href="/appointments" className="btn btn-primary w-full">
                  <CalendarDays className="h-4 w-4" /> Book Appointment
                </Link>
                <a href={`tel:${site.phoneE164}`} className="btn btn-ghost w-full">
                  <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
