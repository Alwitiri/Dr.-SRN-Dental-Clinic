import Link from "next/link";
import { ToothMascot } from "@/components/art";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-24 text-center">
      <ToothMascot className="w-40" />
      <h1 className="mt-6 text-4xl font-extrabold text-navy-900">Page not found</h1>
      <p className="mt-3 text-muted">This page seems to have gone missing – like a lost tooth!</p>
      <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
    </section>
  );
}
