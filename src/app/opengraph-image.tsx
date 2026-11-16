import { ImageResponse } from "next/og";

export const alt = "Dr. SRN Dental Clinic, Ooty";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0a2552 0%,#1a438f 60%,#149bd9 100%)", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 30, letterSpacing: 6, color: "#dff1fb", textTransform: "uppercase" }}>Davisdale · Ooty</div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 20 }}>Dr. SRN Dental Clinic</div>
        <div style={{ fontSize: 44, marginTop: 16, color: "#dff1fb" }}>Your smile deserves the best care.</div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 32, background: "white", color: "#0a2552", padding: "14px 30px", borderRadius: 999, alignSelf: "flex-start", fontWeight: 700 }}>Book: 097510 02021</div>
      </div>
    ),
    size,
  );
}
