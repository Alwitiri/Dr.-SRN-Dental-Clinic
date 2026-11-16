"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, CheckCircle2, Clock, Phone, Send, Stethoscope, User } from "lucide-react";
import { treatments } from "@/lib/treatments";
import { whatsappLink } from "@/lib/site";

const slots = ["Morning", "Afternoon", "Evening"];

type Props = { compact?: boolean; dark?: boolean; defaultTreatment?: string };

export default function AppointmentForm({ compact = false, dark = false, defaultTreatment = "" }: Props) {
  const [data, setData] = useState({ name: "", phone: "", treatment: defaultTreatment, date: "", time: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [waUrl, setWaUrl] = useState("");

  const today = useMemo(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }, []);

  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (data.name.trim().length < 2) e.name = "Please enter your name";
    const digits = data.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) e.phone = "Please enter a valid phone number";
    if (!compact && !data.date) e.date = "Please choose a preferred date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    const dateLabel = data.date ? new Date(data.date + "T00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "Flexible";
    const text = [
      "Hello Dr. SRN Dental Clinic, I'd like to request an appointment.",
      "",
      `Name: ${data.name.trim()}`,
      `Phone: ${data.phone.trim()}`,
      `Treatment: ${data.treatment || "General consultation"}`,
      `Preferred date: ${dateLabel}`,
      `Preferred time: ${data.time || "Any time"}`,
      ...(data.message.trim() ? [`Note: ${data.message.trim()}`] : []),
    ].join("\n");
    const url = whatsappLink(text);
    setWaUrl(url);

    // Best-effort save to the clinic's database (if configured). Never blocks the WhatsApp flow.
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {}

    window.open(url, "_blank", "noopener");
    setStatus("done");
  };

  const label = dark ? "text-brand-100" : "text-navy-900";
  const err = (k: string) => errors[k] && <p className={`mt-1 text-xs font-medium ${dark ? "text-[#ffb4c0]" : "text-red-600"}`}>{errors[k]}</p>;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-2xl p-6 text-center ${dark ? "bg-white/10 text-white" : "bg-brand-50"}`}>
            <CheckCircle2 className="mx-auto h-12 w-12 text-teal-400" />
            <h3 className={`mt-3 text-xl font-bold ${dark ? "text-white" : "text-navy-900"}`}>Request ready to send</h3>
            <p className={`mx-auto mt-2 max-w-sm text-sm ${dark ? "text-brand-100" : "text-muted"}`}>
              Please press <strong>Send</strong> in WhatsApp. Your appointment is confirmed only after the clinic replies with an available slot.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={waUrl} target="_blank" rel="noopener" className="btn btn-accent">Open WhatsApp again</a>
              <button onClick={() => { setStatus("idle"); setData((d) => ({ ...d, message: "" })); }} className={`btn ${dark ? "border border-white/20 text-white" : "btn-ghost"}`}>New request</button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-3 sm:grid-cols-2">
            <input type="text" name="website" value={data.website} onChange={set("website")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div>
              <label htmlFor="ap-name" className={`sr-only ${label}`}>Your name</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input id="ap-name" className="field" placeholder="Your Name" autoComplete="name" value={data.name} onChange={set("name")} aria-invalid={!!errors.name} />
              </div>
              {err("name")}
            </div>
            <div>
              <label htmlFor="ap-phone" className="sr-only">Phone number</label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input id="ap-phone" className="field" type="tel" inputMode="tel" placeholder="Phone Number" autoComplete="tel" value={data.phone} onChange={set("phone")} aria-invalid={!!errors.phone} />
              </div>
              {err("phone")}
            </div>
            <div>
              <label htmlFor="ap-treatment" className="sr-only">Treatment</label>
              <div className="relative">
                <Stethoscope className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <select id="ap-treatment" className="field appearance-none" value={data.treatment} onChange={set("treatment")}>
                  <option value="">Select Treatment</option>
                  <option value="General consultation">General consultation</option>
                  {treatments.map((t) => <option key={t.slug} value={t.name}>{t.name}</option>)}
                  <option value="Not sure – need advice">Not sure – need advice</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="ap-date" className="sr-only">Preferred date</label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input id="ap-date" className="field" type="date" min={today} value={data.date} onChange={set("date")} aria-invalid={!!errors.date} />
              </div>
              {err("date")}
            </div>
            {!compact && (
              <>
                <fieldset className="sm:col-span-2">
                  <legend className={`mb-2 flex items-center gap-2 text-sm font-semibold ${label}`}><Clock className="h-4 w-4" /> Preferred time</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((s) => (
                      <label key={s} className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition ${data.time === s ? "border-brand-500 bg-brand-500 text-white" : dark ? "border-white/20 text-white hover:border-brand-400" : "border-navy-900/12 bg-white text-navy-900 hover:border-brand-400"}`}>
                        <input type="radio" name="time" value={s} checked={data.time === s} onChange={set("time")} className="sr-only" />
                        {s}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="sm:col-span-2">
                  <label htmlFor="ap-msg" className="sr-only">Message</label>
                  <textarea id="ap-msg" rows={3} className="field !pl-4" placeholder="Anything we should know? (optional)" value={data.message} onChange={set("message")} maxLength={500} />
                </div>
              </>
            )}
            <button type="submit" disabled={status === "sending"} className="btn btn-accent sm:col-span-2 disabled:opacity-60">
              <Send className="h-4 w-4" /> {status === "sending" ? "Preparing…" : "Send Request via WhatsApp"}
            </button>
            <p className={`text-xs sm:col-span-2 ${dark ? "text-brand-100/80" : "text-muted"}`}>
              This is a request, not a confirmed booking. The clinic will confirm your appointment.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
