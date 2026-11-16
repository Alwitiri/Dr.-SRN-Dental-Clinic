import { NextResponse } from "next/server";

/**
 * Receives appointment requests from the booking form.
 * If SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set, the request is stored in the
 * `appointment_requests` table (see supabase/schema.sql) so the clinic can review it.
 * Otherwise the site works WhatsApp-only and this endpoint simply validates the payload.
 */

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot – bots fill hidden fields.
  if (clean(body.website, 100)) return NextResponse.json({ ok: true, stored: false });

  const record = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 20),
    treatment: clean(body.treatment, 80) || null,
    preferred_date: /^\d{4}-\d{2}-\d{2}$/.test(clean(body.date, 10)) ? clean(body.date, 10) : null,
    preferred_time: clean(body.time, 20) || null,
    message: clean(body.message, 500) || null,
  };

  const digits = record.phone.replace(/\D/g, "");
  if (record.name.length < 2 || digits.length < 10 || digits.length > 13) {
    return NextResponse.json({ ok: false, error: "Name and a valid phone number are required" }, { status: 422 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: true, stored: false });

  try {
    const res = await fetch(`${url}/rest/v1/appointment_requests`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    console.error("appointment insert failed", e);
    return NextResponse.json({ ok: true, stored: false });
  }
}
