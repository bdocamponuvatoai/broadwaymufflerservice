// Site content. Services are limited to what public listings and reviews document;
// see docs/content-sources.md before adding anything.
import type { StaticImageData } from "next/image";

import catalyticConverter from "@/assets/images/catalytic-converter-studio.webp";
import classicCar from "@/assets/images/classic-car-drive.webp";
import classicMustang from "@/assets/images/classic-mustang.webp";
import classicPickup from "@/assets/images/classic-pickup.webp";
import exhaustWelding from "@/assets/images/custom-exhaust-welding.webp";
import exhaustFabrication from "@/assets/images/exhaust-fabrication.webp";
import muffler from "@/assets/images/muffler-studio.webp";

export type ServiceSlug =
  "muffler-exhaust-repair" | "custom-exhaust-fabrication" | "catalytic-converters" | "classic-specialty-vehicles";

export type Service = {
  slug: ServiceSlug;
  short: string;
  title: string;
  tagline: string;
  description: string;
  intro: string;
  items: string[];
  bring: string;
  image: StaticImageData;
  alt: string;
};

export const services: Service[] = [
  {
    slug: "muffler-exhaust-repair",
    short: "Mufflers & exhaust",
    title: "Muffler & exhaust repair",
    tagline: "Get back to the sound you know.",
    description: "A new rattle, a loose pipe or an exhaust that’s suddenly louder. Start with what’s changed.",
    intro:
      "Small exhaust problems make a big impression. Tell the shop what you hear, when it happens and what you drive, and talk through the right next step.",
    items: [
      "Muffler repair and replacement",
      "Exhaust pipes, joints and connections",
      "Rattles, broken hangers and loose components",
      "Repair options matched to the condition of the system",
    ],
    bring: "Your vehicle’s year, make and model, a description of the sound, and any recent damage or repair history.",
    image: muffler,
    alt: "Stainless steel exhaust muffler on a grey studio surface",
  },
  {
    slug: "custom-exhaust-fabrication",
    short: "Custom fabrication",
    title: "Custom exhaust fabrication",
    tagline: "When off the shelf isn’t the answer.",
    description: "Routing, fitment and fabrication for the car you’re making your own.",
    intro:
      "A custom project starts with a conversation about fit, clearance, materials and how you use the car. Bring the details and talk through a practical scope.",
    items: [
      "Custom exhaust fitment and routing",
      "Fabrication and welding",
      "Muffler and exhaust-tip options",
      "Fit for the vehicle and how it’s driven",
    ],
    bring:
      "Photos of your current setup, the vehicle’s details, any parts you already have, and what you want to change.",
    image: exhaustWelding,
    alt: "Technician in a welding helmet TIG welding a stainless exhaust pipe",
  },
  {
    slug: "catalytic-converters",
    short: "Catalytic converters",
    title: "Catalytic converter service",
    tagline: "A clear next step for your converter.",
    description: "Replacement, damage, or a converter that’s been stolen. Start with your vehicle.",
    intro:
      "Converter replacement depends on the vehicle and the parts it needs. Share your vehicle details and what happened so the shop can talk through the next step.",
    items: [
      "Replacement and installation",
      "Damage and theft-related exhaust repair",
      "Vehicle-specific parts and fitment",
      "A look at any diagnosis or inspection paperwork you have",
    ],
    bring:
      "Year, make, model and engine if you know it, plus any diagnostic or inspection paperwork. Share sensitive documents directly with the shop.",
    image: catalyticConverter,
    alt: "Stainless steel catalytic converter on a grey studio surface",
  },
  {
    slug: "classic-specialty-vehicles",
    short: "Classics & specialty cars",
    title: "Classic & specialty vehicles",
    tagline: "For the car you’ll never sell.",
    description: "Familiar classics and less common fitments, handled by a shop that likes the details.",
    intro:
      "The right exhaust work respects the character of the car. Tell the shop about its history, its current setup and what you want from the next chapter.",
    items: [
      "Classic-car exhaust repair and fitment",
      "Custom work for uncommon vehicles",
      "Original and modified setups",
      "Planning around condition and parts availability",
    ],
    bring:
      "Vehicle details, photos of the underside or existing exhaust if you have them, and your goals for the project.",
    image: classicCar,
    alt: "Midnight-blue classic fastback with dual exhaust tips parked outside a workshop",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Parts of the exhaust system, front to back, for the "follow the pipe" diagram. */
export type ExhaustPart = {
  id: string;
  name: string;
  role: string;
  signs: string[];
  service: ServiceSlug;
};

export const exhaustParts: ExhaustPart[] = [
  {
    id: "manifold",
    name: "Manifold & headers",
    role: "Collects exhaust from the engine and starts it on its way.",
    signs: ["A ticking sound on a cold start that fades as the engine warms", "Exhaust smell under the hood"],
    service: "muffler-exhaust-repair",
  },
  {
    id: "converter",
    name: "Catalytic converter",
    role: "Cleans the exhaust before it leaves the car.",
    signs: [
      "A sudden loud roar after the car has been parked: a sign of converter theft",
      "A rattle from underneath at start-up",
      "A check-engine light with an emissions code",
    ],
    service: "catalytic-converters",
  },
  {
    id: "pipes",
    name: "Pipes & flex section",
    role: "Carries exhaust under the car and absorbs engine movement.",
    signs: ["Rattling over bumps", "A pipe hanging low or dragging", "A puffing or hissing sound underneath"],
    service: "muffler-exhaust-repair",
  },
  {
    id: "muffler",
    name: "Muffler",
    role: "Quiets the exhaust to the sound you expect.",
    signs: [
      "The car is suddenly louder than usual",
      "A deep rumble or drone",
      "Rust holes or soot on the muffler body",
    ],
    service: "muffler-exhaust-repair",
  },
  {
    id: "tailpipe",
    name: "Tailpipe & tips",
    role: "Where the exhaust exits, and where custom work often shows.",
    signs: ["A bent or loose tip", "You want a different look, routing or sound"],
    service: "custom-exhaust-fabrication",
  },
];

export type Project = {
  id: string;
  title: string;
  category: "Classic vehicles" | "Fabrication";
  label: string;
  image: StaticImageData;
  alt: string;
  description: string;
};

/** Real shop photos from the business's public Yelp listing. Rights must be confirmed before launch. */
export const projects: Project[] = [
  {
    id: "classic-pickup",
    title: "Character worth keeping",
    category: "Classic vehicles",
    label: "Classic pickup, in the bay",
    image: classicPickup,
    alt: "Blue classic pickup with its hood raised on a yellow lift inside the shop",
    description: "A blue classic pickup up on the lift in the service bay.",
  },
  {
    id: "exhaust-fabrication",
    title: "It’s all in the fit",
    category: "Fabrication",
    label: "Exhaust fabrication",
    image: exhaustFabrication,
    alt: "Bent stainless exhaust pipes with a flex section and mounting flanges resting on a red welding machine",
    description: "Shaped stainless pipework with a braided flex section and mounting flanges, ready to fit.",
  },
  {
    id: "classic-mustang",
    title: "Another chapter ahead",
    category: "Classic vehicles",
    label: "Classic Mustang",
    image: classicMustang,
    alt: "Light green classic Ford Mustang coupe on a vehicle transport trailer at dusk",
    description: "A light green classic Mustang coupe, arriving on a transport trailer.",
  },
];

export const projectCategories = ["All work", "Classic vehicles", "Fabrication"] as const;

export const steps = [
  {
    title: "Tell the shop about the car",
    body: "Call, or prepare a request with the year, make, model and what you’ve noticed.",
  },
  {
    title: "Agree a time",
    body: "The shop confirms availability and anything it needs from you before the visit.",
  },
  {
    title: "Bring it to North Main",
    body: "Bring photos, inspection notes and your questions. Agree the work before it starts.",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What kind of work does Broadway Muffler do?",
    a: "Muffler and exhaust repair, custom exhaust fabrication, catalytic converter service, and exhaust work on classic and specialty vehicles. For anything else, call first to check the shop can help.",
  },
  {
    q: "Can I bring in a classic or modified car?",
    a: "Yes. Classic cars and custom exhaust projects are part of the work. Share the vehicle details, any modifications and what you want to change when you call or send a request.",
  },
  {
    q: "Can I get a price before bringing the car in?",
    a: "Start by describing the vehicle and the problem. The shop will tell you what it needs to see before discussing a price. This website doesn’t give instant estimates.",
  },
  {
    q: "What are your opening hours?",
    a: "Public listings disagree on current hours, so please call before visiting to confirm the day’s hours and availability.",
  },
  {
    q: "How do I arrange a visit?",
    a: "Call, or use the request page to prepare an email. A preferred day in your request isn’t a confirmed appointment: the shop confirms availability directly.",
  },
  {
    q: "Can I send photos of my car or exhaust?",
    a: "Yes. The request page prepares an email to the shop, and you can attach photos in your email app before sending.",
  },
];
