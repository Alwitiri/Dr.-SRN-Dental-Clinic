/**
 * Single source of truth for clinic details.
 *
 * Anything set to `null` is information the clinic has not confirmed yet.
 * The website hides those parts automatically, so nothing is invented.
 * Fill them in once the clinic provides the details (see CONTENT-CHECKLIST.md).
 */

export const site = {
  name: "Dr. SRN Dental Clinic",
  shortName: "Dr. SRN",
  tagline: "Healthy Smile. Happy You.",
  description:
    "Dr. SRN Dental Clinic in Davisdale, Ooty – gentle, modern dental care near Sait Memorial Hospital. Book your dental appointment online or on WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  phoneDisplay: "097510 02021",
  phoneE164: "+919751002021",
  whatsappNumber: "919751002021", // digits only, with country code
  email: null as string | null,

  address: {
    line1: "Ground Floor, Blue Mountain Restaurant Building",
    line2: "Near Sait Memorial Hospital, Davisdale",
    city: "Ooty",
    region: "Tamil Nadu",
    postalCode: "643001",
    country: "IN",
  },

  /** e.g. [{ days: "Mon – Sat", time: "9:30 AM – 1:30 PM, 4:30 PM – 8:00 PM" }] */
  hours: null as { days: string; time: string }[] | null,

  /** Google rating as shown on the business listing – verify before launch. */
  googleRating: "5.0" as string | null,

  maps: {
    query: "Dr. SRN Dental Clinic, Davisdale, Ooty 643001",
    get link() {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.query)}`;
    },
    get embed() {
      return `https://maps.google.com/maps?q=${encodeURIComponent(this.query)}&z=16&output=embed`;
    },
    /** Replace with the clinic's "Write a review" link from Google Business Profile. */
    reviewLink: null as string | null,
  },

  doctor: {
    name: "Dr. SRN",
    qualifications: null as string | null, // e.g. "BDS, MDS (Endodontics)"
    experience: null as string | null, // e.g. "12+ years of clinical experience"
    bio: null as string | null,
    photo: null as string | null, // e.g. "/images/doctor.jpg"
  },

  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
  },
};

export const fullAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city} – ${site.address.postalCode}`;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage =
  "Hello Dr. SRN Dental Clinic, I would like to book a dental appointment.";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/treatments", label: "Treatments", hasMenu: true },
  { href: "/clinic", label: "Our Clinic" },
  { href: "/reviews", label: "Reviews" },
  { href: "/appointments", label: "Appointments" },
  { href: "/contact", label: "Contact" },
];
