"use client";

import { useId } from "react";
import type { TreatmentIconKind } from "@/lib/treatments";

export const TOOTH_PATH =
  "M20 6C12 6 6 11 6 20c0 8 4 12 6 20 2 10 3 20 9 20 5 0 5-10 7-16 1-4 2-6 4-6s3 2 4 6c2 6 2 16 7 16 6 0 7-10 9-20 2-8 6-12 6-20 0-9-6-14-14-14-5 0-8 3-12 3S25 6 20 6Z";

export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  const g = `lm${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3db5ea" />
          <stop offset="1" stopColor="#0a2552" />
        </linearGradient>
      </defs>
      <path d={TOOTH_PATH} fill="none" stroke={`url(#${g})`} strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M22 16c-4 0-7 3-7 7" fill="none" stroke="#3db5ea" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M32 22v14" stroke={`url(#${g})`} strokeWidth="3" strokeLinecap="round" opacity=".35" />
    </svg>
  );
}

/** Friendly tooth mascot, winking with a thumbs-up. */
export function ToothMascot({ className = "", stethoscope = false }: { className?: string; stethoscope?: boolean }) {
  const u = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 220 230" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`tm-body${u}`} cx="35%" cy="25%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".65" stopColor="#f1f7fd" />
          <stop offset="1" stopColor="#c9def3" />
        </radialGradient>
        <linearGradient id={`tm-shine${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`tm-shadow${u}`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0a2552" floodOpacity=".18" />
        </filter>
      </defs>
      <ellipse cx="110" cy="218" rx="56" ry="8" fill="#0a2552" opacity=".08" />
      <g filter={`url(#tm-shadow${u})`}>
        {/* left arm */}
        <path d="M42 112c-14 4-22 14-20 26" fill="none" stroke="#dbe9f7" strokeWidth="13" strokeLinecap="round" />
        {/* right arm with thumbs-up */}
        <path d="M176 116c14-2 20-12 20-24" fill="none" stroke="#dbe9f7" strokeWidth="13" strokeLinecap="round" />
        <rect x="186" y="62" width="20" height="26" rx="9" fill={`url(#tm-body${u})`} />
        <rect x="191" y="50" width="9" height="20" rx="4.5" fill={`url(#tm-body${u})`} />
        <circle cx="22" cy="140" r="11" fill={`url(#tm-body${u})`} />
        {/* body */}
        <path
          d="M70 22c-26 0-44 18-44 46 0 26 13 38 19 64 6 32 9 78 30 78 17 0 16-32 23-52 3-10 6-16 12-16s9 6 12 16c7 20 6 52 23 52 21 0 24-46 30-78 6-26 19-38 19-64 0-28-18-46-44-46-16 0-26 9-40 9S86 22 70 22Z"
          fill={`url(#tm-body${u})`}
          stroke="#c4daf0"
          strokeWidth="2"
        />
        <path d="M58 40c-12 4-18 14-18 28" fill="none" stroke={`url(#tm-shine${u})`} strokeWidth="10" strokeLinecap="round" />
      </g>
      {/* face */}
      <ellipse cx="86" cy="92" rx="11" ry="13" fill="#0d1b33" />
      <circle cx="90" cy="87" r="4" fill="#fff" />
      <path d="M126 92c6-6 14-6 20 0" fill="none" stroke="#0d1b33" strokeWidth="5" strokeLinecap="round" />
      <path d="M128 100c5-3 11-3 16 0" fill="none" stroke="#0d1b33" strokeWidth="4" strokeLinecap="round" opacity=".0" />
      <ellipse cx="72" cy="114" rx="9" ry="5" fill="#ff9fb2" opacity=".45" />
      <ellipse cx="152" cy="114" rx="9" ry="5" fill="#ff9fb2" opacity=".45" />
      <path d="M92 114c8 20 32 20 40 0Z" fill="#0d1b33" />
      <path d="M100 124c6 5 18 5 24 0-4-4-20-4-24 0Z" fill="#ff6b81" />
      {stethoscope && (
        <g fill="none" stroke="#1a438f" strokeWidth="5" strokeLinecap="round">
          <path d="M60 140c0 34 20 50 50 50s50-16 50-50" />
          <circle cx="110" cy="196" r="9" fill="#3db5ea" stroke="#1a438f" />
        </g>
      )}
    </svg>
  );
}

export function TreatmentIcon({ kind, className = "h-16 w-16" }: { kind: TreatmentIconKind; className?: string }) {
  const id = `ti-${kind}${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-t`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#bcd8f2" />
        </linearGradient>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3db5ea" />
          <stop offset="1" stopColor="#0e82c4" />
        </linearGradient>
      </defs>
      {kind !== "braces" && kind !== "cosmetic" && (
        <path d={TOOTH_PATH} fill={`url(#${id}-t)`} stroke="#8fb6dd" strokeWidth="2" />
      )}
      {kind === "general" && (
        <path d="M40 30l10 4v8c0 7-5 11-10 13-5-2-10-6-10-13v-8l10-4Z" fill={`url(#${id}-a)`} stroke="#fff" strokeWidth="1.5" />
      )}
      {kind === "general" && <path d="M35.5 42l3 3 6-6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
      {kind === "cleaning" && (
        <g fill="#3db5ea">
          <path d="M52 6l1.6 4.4L58 12l-4.4 1.6L52 18l-1.6-4.4L46 12l4.4-1.6Z" />
          <path d="M8 34l1 2.6 2.6 1L9 38.6 8 41.2 7 38.6 4.4 37.6 7 36.6Z" />
          <path d="M56 32l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" />
        </g>
      )}
      {kind === "rootcanal" && (
        <g fill="none" strokeLinecap="round">
          <path d="M24 26c0 10 0 18-2 28M40 26c0 10 0 18 2 28" stroke="#ef4f6a" strokeWidth="3" />
          <path d="M24 26c4-5 12-5 16 0" stroke="#ef4f6a" strokeWidth="3" />
        </g>
      )}
      {kind === "filling" && (
        <g>
          <path d="M22 14c4 4 16 4 20 0l2 8c-6 4-18 4-24 0Z" fill={`url(#${id}-a)`} />
          <path d="M40 4l14-2-2 6-12 4Z" fill="#0a2552" opacity=".8" />
        </g>
      )}
      {kind === "extraction" && (
        <g fill="none" stroke="#0a2552" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 4v14M44 10l6-6 6 6" stroke="#0e82c4" />
        </g>
      )}
      {kind === "crown" && (
        <path d="M14 8l8 8 10-10 10 10 8-8-2 16H16Z" fill={`url(#${id}-a)`} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      )}
      {kind === "braces" && (
        <g>
          <path d="M4 22c8 16 48 16 56 0-6 22-50 22-56 0Z" fill="#ef4f6a" />
          {[12, 22, 32, 42, 52].map((x) => (
            <rect key={x} x={x - 4} y="24" width="8" height="10" rx="2" fill={`url(#${id}-t)`} stroke="#a9c8e6" />
          ))}
          <path d="M6 29c10 3 42 3 52 0" stroke="#0e82c4" strokeWidth="2" fill="none" />
          {[12, 22, 32, 42, 52].map((x) => (
            <rect key={`b${x}`} x={x - 2} y="27" width="4" height="4" rx="1" fill="#0a2552" />
          ))}
        </g>
      )}
      {kind === "cosmetic" && (
        <g>
          <path d="M4 24c8 18 48 18 56 0-4 24-52 24-56 0Z" fill="#ef4f6a" />
          <path d="M8 26c10 6 38 6 48 0v6c-10 6-38 6-48 0Z" fill={`url(#${id}-t)`} stroke="#a9c8e6" />
          <path d="M52 4l1.4 3.6L57 9l-3.6 1.4L52 14l-1.4-3.6L47 9l3.6-1.4Z" fill="#3db5ea" />
        </g>
      )}
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V14h2.7v8h3.1Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.6-1 2.5.1 1.1.5 2.1 1.2 3 1.2 1.8 2.8 3.2 4.7 4 .5.2 1 .4 1.5.5.6.2 1.2.2 1.7.1.7-.1 1.4-.6 1.8-1.2.2-.4.3-.9.2-1.3l-.3-.3Z" />
    </svg>
  );
}

/** Illustrated treatment room (placeholder until real clinic photos are added). */
export function ClinicIllustration({ className = "" }: { className?: string }) {
  const u = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`ci-wall${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f9fe" />
          <stop offset="1" stopColor="#e3eef9" />
        </linearGradient>
        <linearGradient id={`ci-sky${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe3f8" />
          <stop offset="1" stopColor="#e9f6fd" />
        </linearGradient>
        <linearGradient id={`ci-seat${u}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f5fbf" />
          <stop offset="1" stopColor="#0f3170" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#ci-wall${u})`} />
      {/* window with Nilgiri hills */}
      <rect x="30" y="34" width="130" height="110" rx="6" fill="#fff" />
      <rect x="36" y="40" width="118" height="98" rx="3" fill={`url(#ci-sky${u})`} />
      <path d="M36 112l30-26 22 16 28-30 38 34v32H36Z" fill="#7cc3a5" />
      <path d="M36 124l40-22 34 18 44-20v38H36Z" fill="#4fa784" />
      <path d="M95 40v98M36 89h118" stroke="#fff" strokeWidth="4" />
      {/* cabinet */}
      <rect x="250" y="150" width="130" height="90" rx="6" fill="#fff" stroke="#d3e3f3" />
      <path d="M250 180h130M315 150v90" stroke="#d3e3f3" />
      <rect x="250" y="142" width="130" height="10" rx="3" fill="#cfe0f1" />
      {/* monitor */}
      <rect x="270" y="56" width="90" height="56" rx="6" fill="#0d1b33" />
      <rect x="276" y="62" width="78" height="44" rx="3" fill="#1a438f" />
      <path d="M300 92c6-14 24-14 30 0" stroke="#3db5ea" strokeWidth="3" fill="none" />
      {/* floor */}
      <rect y="240" width="400" height="60" fill="#d6e4f2" />
      <path d="M0 240h400" stroke="#c2d6ea" strokeWidth="2" />
      {/* lamp */}
      <path d="M200 0v40c0 10 10 14 22 18" stroke="#9fb3c8" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="232" cy="64" rx="22" ry="10" fill="#e8eef5" stroke="#9fb3c8" strokeWidth="3" />
      <path d="M214 70l-30 80h96l-30-80Z" fill="#fff6c9" opacity=".25" />
      {/* dental chair */}
      <rect x="196" y="226" width="24" height="18" rx="4" fill="#9fb3c8" />
      <ellipse cx="208" cy="246" rx="46" ry="7" fill="#b9cadb" />
      <path d="M130 196c0-8 6-14 14-14h86c22 0 34-10 46-30l6-10c4-6 12-6 15 0 3 5 1 11-3 17l-14 22c-12 18-28 30-52 30H144c-8 0-14-6-14-15Z" fill={`url(#ci-seat${u})`} />
      <rect x="292" y="126" width="22" height="26" rx="10" fill="#1f5fbf" transform="rotate(30 303 139)" />
      <path d="M140 210h94" stroke="#0a2552" strokeWidth="6" strokeLinecap="round" />
      <path d="M120 186c-8 0-12 4-12 10v14" stroke="#9fb3c8" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* tray arm */}
      <path d="M110 150h50" stroke="#9fb3c8" strokeWidth="5" strokeLinecap="round" />
      <rect x="92" y="140" width="40" height="10" rx="3" fill="#e8eef5" stroke="#9fb3c8" strokeWidth="2" />
      <path d="M160 150v40" stroke="#9fb3c8" strokeWidth="5" strokeLinecap="round" />
      {/* plant */}
      <rect x="18" y="214" width="22" height="28" rx="4" fill="#fff" stroke="#d3e3f3" />
      <path d="M29 214c-10-14-6-26 0-30 6 4 10 16 0 30Zm0 0c-14-6-18-16-14-22 8 0 14 10 14 22Zm0 0c14-6 18-16 14-22-8 0-14 10-14 22Z" fill="#4fa784" />
    </svg>
  );
}
