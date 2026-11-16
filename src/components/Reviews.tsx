import { ExternalLink, MessageCircle, Quote, Star } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";
import { Reveal } from "./ui";

function Stars({ n = 5, className = "h-4 w-4" }: { n?: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} ${i < n ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
      ))}
    </span>
  );
}

export default function Reviews() {
  const reviewHref = site.maps.reviewLink || site.maps.link;
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
      <Reveal>
        <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 p-7 text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-400/30 blur-2xl" />
          <p className="text-sm font-semibold text-brand-100">Rated on Google</p>
          {site.googleRating ? (
            <div className="mt-2 flex items-end gap-3">
              <span className="text-6xl font-extrabold leading-none">{site.googleRating}</span>
              <Stars className="mb-2 h-5 w-5" />
            </div>
          ) : (
            <p className="mt-2 text-2xl font-bold">See what patients say</p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-brand-100">
            We value honest feedback. Read genuine reviews from our patients on Google, or share your own experience.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <a href={site.maps.link} target="_blank" rel="noopener" className="btn bg-white text-navy-900 hover:bg-brand-50">
              Read reviews on Google <ExternalLink className="h-4 w-4" />
            </a>
            <a href={reviewHref} target="_blank" rel="noopener" className="btn border border-white/25 text-white hover:bg-white/10">
              <Star className="h-4 w-4" /> Write a review
            </a>
          </div>
        </div>
      </Reveal>

      {testimonials.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.slice(0, 4).map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.08}>
              <figure className="card relative h-full p-6">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-brand-100" />
                <Stars n={t.rating} />
                <blockquote className="mt-3 leading-relaxed text-ink">&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-bold text-navy-900">
                  – {t.name} <span className="font-normal text-muted">· {t.source}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { t: "Gentle & caring", d: "We take time to explain every step so you feel comfortable in the chair." },
            { t: "Clear advice", d: "Honest treatment options without pressure – you decide what's right for you." },
            { t: "Clean & hygienic", d: "Sterilised instruments and a tidy clinic, every single visit." },
            { t: "Easy to reach", d: "Near Sait Memorial Hospital, Davisdale – call or WhatsApp anytime." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="card h-full p-6">
                <Quote className="h-7 w-7 text-brand-400" />
                <h3 className="mt-3 text-lg font-bold text-navy-900">{c.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.d}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="sm:col-span-2">
            <a href={whatsappLink("Hello Dr. SRN Dental Clinic, I'd like to share feedback about my visit:")} target="_blank" rel="noopener" className="card flex items-center justify-between gap-4 p-5 transition hover:shadow-lift">
              <span className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-brand-600" />
                <span className="font-semibold text-navy-900">Visited us recently? Send us your feedback</span>
              </span>
              <ExternalLink className="h-4 w-4 text-muted" />
            </a>
          </Reveal>
        </div>
      )}
    </div>
  );
}
