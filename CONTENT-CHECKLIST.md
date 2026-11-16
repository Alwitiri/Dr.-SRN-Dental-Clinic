# Before launch – collect from the clinic

The site is complete and works today, but these details can't be confirmed online. Fill them in using the file named in each row; empty fields are hidden automatically.

| # | Item | Where it goes | Status |
|---|---|---|---|
| 1 | Doctor's full name & qualifications (e.g. BDS, MDS) | `src/lib/site.ts` → `doctor` | ☐ |
| 2 | Doctor's photograph | `public/images/doctor.jpg` → `doctor.photo` | ☐ |
| 3 | Confirm treatments offered | `src/lib/treatments.ts` → `offered` | ☐ |
| 4 | Opening hours (incl. Sunday / lunch break) | `src/lib/site.ts` → `hours` | ☐ |
| 5 | Real clinic photos: entrance, reception, treatment room, equipment, sterilisation, team | `public/images/clinic/` → `src/lib/gallery.ts` | ☐ |
| 6 | Logo files & brand colours (if they have them) | `src/components/art.tsx`, `src/app/globals.css` | ☐ |
| 7 | Confirm WhatsApp number = 97510 02021 | `src/lib/site.ts` | ☐ |
| 8 | Prices (only if the clinic wants them published) | treatment pages | ☐ |
| 9 | Google Business Profile "Write a review" link, and confirm the 5.0 rating | `site.maps.reviewLink`, `site.googleRating` | ☐ |
| 10 | 3–6 genuine Google reviews to feature (with permission) | `src/lib/testimonials.ts` | ☐ |
| 11 | Consented before/after photos (optional) | `<BeforeAfter before="…" after="…" />` | ☐ |
| 12 | Exact entrance and floor directions | `src/lib/site.ts` → `address` | ☐ |
| 13 | Domain name | `NEXT_PUBLIC_SITE_URL` | ☐ |
