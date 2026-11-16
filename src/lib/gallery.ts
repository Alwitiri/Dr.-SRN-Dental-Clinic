/**
 * Clinic photographs. Put real photos in /public/images/clinic/ and set `src`.
 * Items without `src` render as a branded placeholder so the layout stays complete.
 */
export type GalleryItem = {
  title: string;
  caption: string;
  icon: "door" | "reception" | "chair" | "equipment" | "team" | "sterile";
  src?: string;
};

export const gallery: GalleryItem[] = [
  { title: "Clinic Entrance", caption: "Ground floor, easy to find near Sait Memorial Hospital", icon: "door" },
  { title: "Reception", caption: "A calm, welcoming space to check in", icon: "reception" },
  { title: "Treatment Room", caption: "Comfortable dental chair and good lighting", icon: "chair" },
  { title: "Dental Equipment", caption: "Modern instruments for precise care", icon: "equipment" },
  { title: "Sterilisation", caption: "Strict hygiene and instrument sterilisation", icon: "sterile" },
  { title: "Our Team", caption: "Friendly doctor and staff", icon: "team" },
];
