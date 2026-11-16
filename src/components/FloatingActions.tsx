"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Send, X } from "lucide-react";
import { site, whatsappLink, defaultWhatsappMessage, fullAddress } from "@/lib/site";
import { treatments } from "@/lib/treatments";
import { WhatsAppIcon } from "./art";

type Msg = { from: "bot" | "user"; text: string; link?: { href: string; label: string } };

const quick = ["Clinic timings", "Where are you?", "Book appointment", "Treatments", "I have tooth pain"];

function answer(raw: string): Msg {
  const q = raw.toLowerCase();
  const has = (...w: string[]) => w.some((x) => q.includes(x));

  if (has("pain", "swell", "bleed", "hurt", "ache", "emergency", "broken", "fever", "medicine", "infection")) {
    return {
      from: "bot",
      text: `I'm sorry you're uncomfortable. I can't give medical advice, but our dentist can help. Please call ${site.phoneDisplay} so the clinic can see you as soon as possible. If you have severe swelling, difficulty breathing or swallowing, go to the nearest hospital emergency department.`,
      link: { href: `tel:${site.phoneE164}`, label: "Call the clinic" },
    };
  }
  if (has("time", "timing", "hour", "open", "close", "sunday", "today")) {
    return site.hours
      ? { from: "bot", text: `Our clinic timings: ${site.hours.map((h) => `${h.days} ${h.time}`).join("; ")}.` }
      : {
          from: "bot",
          text: `Please call ${site.phoneDisplay} or message us on WhatsApp to confirm today's timings.`,
          link: { href: whatsappLink("Hello, what are the clinic timings today?"), label: "Ask on WhatsApp" },
        };
  }
  if (has("where", "location", "address", "map", "direction", "reach")) {
    return { from: "bot", text: `We're at ${fullAddress}.`, link: { href: site.maps.link, label: "Open in Google Maps" } };
  }
  if (has("book", "appoint", "slot", "visit", "consult")) {
    return {
      from: "bot",
      text: "You can request an appointment online – the clinic will confirm your slot on WhatsApp or by phone.",
      link: { href: "/appointments", label: "Request appointment" },
    };
  }
  if (has("price", "cost", "fee", "charge", "rate", "how much")) {
    return {
      from: "bot",
      text: "Treatment costs depend on your examination and the plan the dentist recommends. Please call or WhatsApp the clinic for an estimate.",
      link: { href: whatsappLink("Hello, I'd like to know the approximate cost of a treatment."), label: "Ask on WhatsApp" },
    };
  }
  if (has("phone", "call", "number", "contact", "whatsapp")) {
    return { from: "bot", text: `Call us on ${site.phoneDisplay} or message us on WhatsApp.`, link: { href: `tel:${site.phoneE164}`, label: "Call now" } };
  }
  const t = treatments.find((t) => {
    const n = t.name.toLowerCase();
    return q.includes(n) || n.split(/[\s&]+/).some((w) => w.length > 4 && q.includes(w.replace(/s$/, "")));
  }) || (has("rct") ? treatments.find((t) => t.slug === "root-canal-treatment") : undefined)
     || (has("clean", "scaling") ? treatments.find((t) => t.slug === "teeth-cleaning") : undefined)
     || (has("whiten", "smile") ? treatments.find((t) => t.slug === "cosmetic-dentistry") : undefined);
  if (t) {
    return { from: "bot", text: `${t.name}: ${t.short} ${t.summary.split(". ")[0]}.`, link: { href: `/treatments/${t.slug}`, label: `Read about ${t.name}` } };
  }
  if (has("treatment", "service", "offer", "do you")) {
    return { from: "bot", text: `We offer ${treatments.map((t) => t.name).join(", ")}.`, link: { href: "/treatments", label: "View all treatments" } };
  }
  if (has("hi", "hello", "hey", "vanakkam", "namaste")) {
    return { from: "bot", text: "Hello! 😊 How can I help you today?" };
  }
  return {
    from: "bot",
    text: "I'm a simple assistant and may not know that. For anything about your teeth or treatment, the dentist is the best person to ask – message the clinic on WhatsApp.",
    link: { href: whatsappLink(defaultWhatsappMessage), label: "Chat on WhatsApp" },
  };
}

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Hi! I'm the ${site.shortName} clinic assistant. I can help with timings, location, treatments and booking.` },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, answer(t)]), 450);
  };

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="card flex h-[min(520px,calc(100dvh-140px))] w-[min(360px,calc(100vw-40px))] flex-col overflow-hidden !rounded-2xl"
            role="dialog"
            aria-label="Clinic assistant"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-navy-900 to-navy-700 px-4 py-3 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><Bot className="h-5 w-5" /></span>
              <div className="flex-1">
                <p className="text-sm font-bold">Clinic Assistant</p>
                <p className="text-xs text-brand-100">Timings · Location · Booking</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-mist/60 p-4" aria-live="polite">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : ""}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "rounded-br-sm bg-brand-500 text-white" : "rounded-bl-sm bg-white text-ink shadow-sm"}`}>
                    {m.text}
                    {m.link && (
                      m.link.href.startsWith("/") ? (
                        <Link href={m.link.href} onClick={() => setOpen(false)} className="mt-2 block font-semibold text-brand-700 underline underline-offset-2">{m.link.label} →</Link>
                      ) : (
                        <a href={m.link.href} target="_blank" rel="noopener" className="mt-2 block font-semibold text-brand-700 underline underline-offset-2">{m.link.label} →</a>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto border-t border-navy-900/5 bg-white px-3 pt-3 [scrollbar-width:none]">
              {quick.map((q) => (
                <button key={q} onClick={() => send(q)} className="shrink-0 rounded-full border border-brand-400/40 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50">
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 bg-white p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                aria-label="Your question"
                className="flex-1 rounded-full border border-navy-900/10 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
              <button type="submit" aria-label="Send" className="grid h-10 w-10 place-items-center rounded-full bg-navy-900 text-white">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="grid h-13 w-13 place-items-center rounded-full bg-white text-navy-900 shadow-lift ring-1 ring-navy-900/5 transition hover:scale-105"
        aria-label={open ? "Close clinic assistant" : "Open clinic assistant"}
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-6 w-6" />}
      </button>
      <a
        href={whatsappLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noopener"
        aria-label="Chat with the clinic on WhatsApp"
        className="relative grid h-15 w-15 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.7)] transition hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-25" />
        <WhatsAppIcon className="relative h-8 w-8" />
      </a>
    </div>
  );
}
