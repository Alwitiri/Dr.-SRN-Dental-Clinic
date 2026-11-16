/**
 * Treatment content. Educational, general information only – no prices or
 * outcome guarantees. Set `offered: false` on any treatment the clinic does
 * not provide and it disappears from the whole site (menus, pages, sitemap, forms).
 */

export type TreatmentIconKind =
  | "general"
  | "cleaning"
  | "rootcanal"
  | "filling"
  | "extraction"
  | "crown"
  | "braces"
  | "cosmetic";

export type Treatment = {
  slug: string;
  name: string;
  icon: TreatmentIconKind;
  offered: boolean;
  short: string;
  summary: string;
  whenNeeded: string[];
  whatToExpect: string[];
  aftercare: string[];
  faqs: { q: string; a: string }[];
};

const all: Treatment[] = [
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    icon: "general",
    offered: true,
    short: "Routine check-ups and everyday dental care.",
    summary:
      "Regular dental check-ups help catch small problems before they become painful or expensive. A general consultation looks at your teeth, gums and bite, and gives you a clear plan for keeping your mouth healthy.",
    whenNeeded: [
      "It has been more than six months since your last check-up",
      "You have tooth sensitivity, mild pain or bleeding gums",
      "You want advice on brushing, flossing or diet for healthier teeth",
      "Your child needs their first dental visit",
    ],
    whatToExpect: [
      "A conversation about your concerns and medical history",
      "A careful examination of teeth, gums and soft tissues",
      "X-rays only when they are needed for diagnosis",
      "A simple explanation of findings and treatment options",
    ],
    aftercare: [
      "Brush twice daily with fluoride toothpaste",
      "Clean between your teeth once a day",
      "Plan your next routine visit as advised by the dentist",
    ],
    faqs: [
      {
        q: "How often should I visit the dentist?",
        a: "Most people benefit from a check-up every six months, but the dentist will suggest an interval that suits your oral health.",
      },
      {
        q: "Do I need an appointment for a consultation?",
        a: "An appointment helps us reduce your waiting time. You can request one online or on WhatsApp.",
      },
    ],
  },
  {
    slug: "teeth-cleaning",
    name: "Teeth Cleaning",
    icon: "cleaning",
    offered: true,
    short: "Professional scaling and polishing.",
    summary:
      "Even with good brushing, plaque and tartar build up in places a toothbrush cannot reach. Professional cleaning removes these deposits, helps prevent gum disease and leaves your teeth feeling fresh and smooth.",
    whenNeeded: [
      "Your gums bleed when you brush",
      "You notice yellow or brown deposits near the gum line",
      "You have persistent bad breath",
      "It is time for your routine six-monthly visit",
    ],
    whatToExpect: [
      "Gentle removal of plaque and tartar (scaling)",
      "Polishing to remove surface stains",
      "Advice on brushing technique and suitable oral-care products",
    ],
    aftercare: [
      "Mild sensitivity for a day or two is normal",
      "Avoid strongly coloured food and drinks for a few hours",
      "Keep up daily brushing and flossing",
    ],
    faqs: [
      {
        q: "Does cleaning damage the enamel?",
        a: "No. Professional scaling removes deposits from the tooth surface; it does not remove healthy enamel.",
      },
      {
        q: "Is teeth cleaning painful?",
        a: "Most patients feel only mild vibration or sensitivity. Let the dentist know if you are uncomfortable at any point.",
      },
    ],
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    icon: "rootcanal",
    offered: true,
    short: "Save an infected or badly decayed tooth.",
    summary:
      "When decay or injury reaches the soft pulp inside a tooth, root canal treatment removes the infected tissue, cleans and seals the canals, and helps you keep your natural tooth instead of losing it.",
    whenNeeded: [
      "Severe or lingering toothache, especially at night",
      "Prolonged sensitivity to hot or cold",
      "Swelling or a pimple-like bump on the gum",
      "A tooth that has darkened after an injury",
    ],
    whatToExpect: [
      "Local anaesthesia so the procedure is comfortable",
      "Cleaning and shaping of the root canals",
      "Filling and sealing of the canals",
      "A crown may be advised afterwards to protect the tooth",
    ],
    aftercare: [
      "Avoid chewing hard food on the treated tooth until it is fully restored",
      "Mild tenderness for a few days is common",
      "Attend all follow-up visits to complete the treatment",
    ],
    faqs: [
      {
        q: "Is root canal treatment painful?",
        a: "With modern anaesthesia, most patients find it no more uncomfortable than a filling. It is usually the infection, not the treatment, that causes pain.",
      },
      {
        q: "How many visits are needed?",
        a: "It depends on the tooth and the infection. The dentist will explain the plan after examining you.",
      },
    ],
  },
  {
    slug: "dental-fillings",
    name: "Dental Fillings",
    icon: "filling",
    offered: true,
    short: "Repair cavities with tooth-coloured fillings.",
    summary:
      "Fillings restore teeth that have been damaged by decay or minor fractures. Tooth-coloured materials can be matched to your natural teeth so the repair blends in.",
    whenNeeded: [
      "A visible hole or dark spot on a tooth",
      "Food getting stuck in the same place repeatedly",
      "Sensitivity to sweets, hot or cold",
      "A chipped or broken edge",
    ],
    whatToExpect: [
      "Removal of decayed tooth structure",
      "Placement and shaping of the filling material",
      "Bite check and polishing for a natural feel",
    ],
    aftercare: [
      "Wait until numbness wears off before eating",
      "Some sensitivity for a few days is normal",
      "Return if your bite feels high or uneven",
    ],
    faqs: [
      {
        q: "How long do fillings last?",
        a: "With good oral hygiene, fillings can last many years. Regular check-ups help spot wear early.",
      },
    ],
  },
  {
    slug: "tooth-extraction",
    name: "Tooth Extraction",
    icon: "extraction",
    offered: true,
    short: "Gentle removal of problematic teeth.",
    summary:
      "Sometimes a tooth cannot be saved, or it is causing crowding or repeated infection. A careful, gentle extraction relieves the problem and protects your overall oral health.",
    whenNeeded: [
      "A tooth that is too badly broken or decayed to restore",
      "Impacted or painful wisdom teeth",
      "Severe gum disease loosening a tooth",
      "Crowding, when advised as part of orthodontic treatment",
    ],
    whatToExpect: [
      "Examination and X-ray to plan the procedure",
      "Local anaesthesia for comfort",
      "Clear written and verbal aftercare instructions",
    ],
    aftercare: [
      "Bite on the gauze as instructed to control bleeding",
      "Avoid spitting, smoking and using a straw for 24 hours",
      "Eat soft, cool food and follow the medicines prescribed",
    ],
    faqs: [
      {
        q: "Will I need to replace an extracted tooth?",
        a: "Often yes – a missing tooth can let neighbouring teeth shift. The dentist can discuss options such as bridges.",
      },
    ],
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    icon: "crown",
    offered: true,
    short: "Restore strength and replace missing teeth.",
    summary:
      "A crown is a custom cap that protects and strengthens a weak tooth. A bridge replaces one or more missing teeth by anchoring to the teeth next to the gap, restoring your smile and your bite.",
    whenNeeded: [
      "After root canal treatment",
      "A tooth that is cracked, worn or heavily filled",
      "One or more missing teeth",
      "To improve the shape or colour of a damaged tooth",
    ],
    whatToExpect: [
      "Preparation of the tooth and an impression or scan",
      "A temporary crown while the final one is made",
      "Fitting and bite adjustment of the final crown or bridge",
    ],
    aftercare: [
      "Brush and floss around the crown or bridge every day",
      "Avoid biting very hard objects",
      "Keep up regular check-ups",
    ],
    faqs: [
      {
        q: "Will a crown look natural?",
        a: "Tooth-coloured crowns can be shade-matched to your neighbouring teeth.",
      },
    ],
  },
  {
    slug: "braces",
    name: "Braces",
    icon: "braces",
    offered: true,
    short: "Straighten teeth and correct your bite.",
    summary:
      "Braces gently move teeth into better positions over time. Straighter teeth are easier to clean and can improve both your bite and your confidence.",
    whenNeeded: [
      "Crowded, gapped or crooked teeth",
      "Upper or lower teeth that stick out",
      "Difficulty biting or chewing comfortably",
    ],
    whatToExpect: [
      "Assessment with photographs and X-rays",
      "A personalised treatment plan and timeline",
      "Regular adjustment visits during treatment",
      "Retainers after braces to keep teeth in place",
    ],
    aftercare: [
      "Clean carefully around brackets and wires",
      "Avoid sticky and very hard foods",
      "Wear retainers exactly as advised",
    ],
    faqs: [
      {
        q: "Am I too old for braces?",
        a: "Teeth can be moved at any age as long as the gums and bone are healthy. A consultation will tell you what is possible.",
      },
    ],
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    icon: "cosmetic",
    offered: true,
    short: "Brighter, more confident smiles.",
    summary:
      "Cosmetic dentistry focuses on how your smile looks – its colour, shape and symmetry – while keeping your teeth healthy. Options are planned around your goals and what is safe for your teeth.",
    whenNeeded: [
      "Stained or discoloured teeth",
      "Chipped, uneven or worn edges",
      "Small gaps between teeth",
      "You simply want to feel more confident about your smile",
    ],
    whatToExpect: [
      "A smile consultation to understand your goals",
      "An honest discussion of suitable options",
      "Treatment carried out in planned, comfortable steps",
    ],
    aftercare: [
      "Limit tea, coffee and tobacco to keep results longer",
      "Maintain regular cleaning visits",
    ],
    faqs: [
      {
        q: "Is teeth whitening safe?",
        a: "When planned and supervised by a dentist, whitening is considered safe. The dentist will first check that your teeth and gums are healthy.",
      },
    ],
  },
];

export const treatments = all.filter((t) => t.offered);

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}
