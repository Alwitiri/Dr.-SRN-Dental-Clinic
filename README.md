# Dr. SRN Dental Clinic – Website

A fast, mobile-first website for Dr. SRN Dental Clinic, Davisdale, Ooty.
It's built with Next.js 15 (App Router), Tailwind CSS v4 and Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, treatments, about, why choose us, interactive tooth explorer, reviews, booking, gallery, map |
| `/about` | Doctor profile, clinic philosophy, interior |
| `/treatments` | All treatments, interactive explorer, before/after slider |
| `/treatments/[slug]` | One SEO page per treatment (8), with FAQ + MedicalProcedure schema and a booking form |
| `/clinic` | Gallery, facilities, directions |
| `/reviews` | Google rating, review links, genuine testimonials |
| `/appointments` | Full booking form (name, phone, treatment, date, time, note) |
| `/contact` | Phone, WhatsApp, map, hours, address |

The site also includes a floating WhatsApp button and a rule-based clinic assistant (chatbot) on every page. The assistant answers questions about timings, location, treatments, booking and costs. It sends clinical questions and pain to the clinic. It does not give medical advice.

## Where to edit content

Content isn't hard-coded in the pages. It all lives in `src/lib/`:

- **`site.ts`**: phone, WhatsApp, address, **opening hours**, doctor name, qualifications, bio and photo, Google rating, review link, social links. Any field left as `null` is hidden on the site, so no details get invented.
- **`treatments.ts`**: treatment text. Set `offered: false` to remove a treatment from the whole site.
- **`gallery.ts`**: clinic photos. Put the files in `public/images/clinic/` and set `src`.
- **`testimonials.ts`**: **genuine** reviews only, with permission.

## Appointment booking flow

1. The patient fills in the form.
2. WhatsApp opens with a pre-filled message to `+91 97510 02021`.
3. The clinic replies to confirm. The site always says the booking is a *request* until the clinic confirms it.
4. Optional: to also store requests in a database, run `supabase/schema.sql` in Supabase. Then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Requests are saved to `appointment_requests`, with a status of pending, confirmed, rescheduled, cancelled or completed.

## SEO built in

- Per-page titles and descriptions targeting "dentist in Ooty", "dental clinic in Ooty" and treatment keywords
- `Dentist` + `LocalBusiness` JSON-LD sitewide; `MedicalProcedure`, `FAQPage` and `BreadcrumbList` on treatment pages
- `/sitemap.xml`, `/robots.txt`, canonical URLs, a generated Open Graph image and a favicon

## Deploy (Vercel)

1. Push this folder to GitHub and import it in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the live domain. Optionally set the Supabase variables.
3. After launch, add the site to Google Search Console and submit `/sitemap.xml`. Link the website from the Google Business Profile.

See **CONTENT-CHECKLIST.md** for what to collect from the clinic before going live.
