import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { nav, site, fullAddress } from "@/lib/site";
import { treatments } from "@/lib/treatments";
import { FacebookIcon, InstagramIcon, LogoMark, YoutubeIcon } from "./art";

export default function Footer() {
  const socials = [
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  ].filter((s) => s.href);

  return (
    <footer className="relative mt-24 overflow-hidden bg-navy-900 text-brand-100">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="container-x relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <LogoMark className="h-14 w-14" />
            <span className="text-2xl font-extrabold leading-tight text-white">
              {site.shortName}
              <span className="block text-xl font-semibold">Dental Clinic</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-100/80">
            Gentle, modern dental care in the heart of Ooty. {site.tagline}
          </p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href!} target="_blank" rel="noopener" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Treatments</h3>
          <ul className="space-y-2.5 text-sm">
            {treatments.map((t) => (
              <li key={t.slug}>
                <Link href={`/treatments/${t.slug}`} className="transition hover:text-white">{t.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href={`tel:${site.phoneE164}`} className="flex gap-3 hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.maps.link} target="_blank" rel="noopener" className="flex gap-3 hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {fullAddress}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              {site.hours ? (
                <span>{site.hours.map((h) => <span key={h.days} className="block">{h.days}: {h.time}</span>)}</span>
              ) : (
                <span>Please call to confirm clinic timings</span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-100/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Information on this website is general and not a substitute for a dental consultation.</p>
        </div>
      </div>
    </footer>
  );
}
