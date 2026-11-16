/**
 * Genuine patient testimonials ONLY – copied from Google reviews or given with written
 * permission. Leave empty until real ones are collected; the site then shows the Google
 * rating card and review links instead.
 *
 * Example:
 * { name: "Priya S.", text: "Very gentle and professional.", rating: 5, source: "Google" }
 */
export type Testimonial = { name: string; text: string; rating: number; source: "Google" | "Patient feedback" };

export const testimonials: Testimonial[] = [];
