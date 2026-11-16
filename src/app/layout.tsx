import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { JsonLd } from "@/components/sections";
import { site } from "@/lib/site";
import { treatments } from "@/lib/treatments";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dr. SRN Dental Clinic | Dentist in Davisdale, Ooty",
    template: "%s | Dr. SRN Dental Clinic, Ooty",
  },
  description: site.description,
  keywords: ["dental clinic in Ooty", "dentist in Ooty", "Dr SRN Dental Clinic", "dental treatment in Ooty", "dental appointment in Ooty", "Davisdale dentist"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: "Dr. SRN Dental Clinic | Dentist in Ooty",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = { themeColor: "#0a2552", width: "device-width", initialScale: 1, viewportFit: "cover" };

const schema = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness"],
  "@id": `${site.url}/#clinic`,
  name: site.name,
  url: site.url,
  telephone: site.phoneE164,
  image: `${site.url}/opengraph-image`,
  description: site.description,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  hasMap: site.maps.link,
  areaServed: ["Ooty", "Udhagamandalam", "The Nilgiris"],
  availableService: treatments.map((t) => ({ "@type": "MedicalProcedure", name: t.name, url: `${site.url}/treatments/${t.slug}` })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${caveat.variable}`}>
      <body className="min-h-dvh font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <JsonLd data={schema} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
