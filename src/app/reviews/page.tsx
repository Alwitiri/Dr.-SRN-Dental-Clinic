import type { Metadata } from "next";
import { PageHero, CtaBanner } from "@/components/sections";
import Reviews from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description: "Read genuine Google reviews of Dr. SRN Dental Clinic, Ooty, and share your own experience.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Reviews" title={<>Real smiles. <span className="text-gradient">Real stories.</span></>} subtitle="Your feedback helps us improve and helps other families in Ooty find the right dental care." />
      <section className="container-x mt-14">
        <Reviews />
      </section>
      <CtaBanner />
    </>
  );
}
