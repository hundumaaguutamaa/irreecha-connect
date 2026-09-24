import { om, am } from "./translations-om-am";

export type Lang = "om" | "am" | "en";

export interface Pillar {
  title: string;
  body: string;
}

export interface TranslationDict {
  code: Lang;
  appName: string;
  tagline: string;
  langLabel: string;
  nav: {
    home: string;
    schedule: string;
    visitor: string;
    diaspora: string;
    culture: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    countdown: string;
    units: [string, string, string, string];
  };
  days: [string, string, string];
  dayLabel: string;
  quick: { title: string; items: Pillar[] };
  sacred: { eyebrow: string; title: string; body: string; pillars: Pillar[] };
  featured: { title: string; subtitle: string; details: string; all: string };
  vendors: { title: string; subtitle: string };
  alerts: { title: string; items: string[] };
  status: { published: string; live: string; tentative: string; special: string };
  categories: {
    ceremony: string;
    prayer: string;
    gadaa: string;
    music: string;
    youth: string;
    symposium: string;
    diaspora: string;
  };
  schedule: {
    title: string;
    subtitle: string;
    filterDay: string;
    allDays: string;
    allCategories: string;
    search: string;
    noResults: string;
    results: string;
    addCalendar: string;
    added: string;
    directions: string;
    dressCode: string;
    location: string;
    time: string;
    mapTitle: string;
    mapHint: string;
  };
  map: {
    title: string;
    legend: string;
    legendItems: {
      sacred: string;
      stage: string;
      medical: string;
      shuttle: string;
      parking: string;
      food: string;
    };
  };
  visitor: {
    title: string;
    subtitle: string;
    transportTitle: string;
    transportBody: string;
    checklistTitle: string;
    checklist: string[];
    etiquetteTitle: string;
    etiquetteBody: string;
    dos: string[];
    donts: string[];
    emergencyTitle: string;
    callNow: string;
  };
  diaspora: {
    title: string;
    subtitle: string;
    storiesTitle: string;
    broadcastTitle: string;
    broadcastBody: string;
    watchLive: string;
    blessingTitle: string;
    blessingBody: string;
    blessingCta: string;
    wallTitle: string;
    wallBody: string;
    wallPlaceholder: string;
    wallSubmit: string;
    wallEmpty: string;
  };
  culture: { title: string; subtitle: string; cards: Pillar[] };
  footer: { rights: string; note: string; explore: string; language: string };
  emergency: { label: string; call: string };
}

const en: TranslationDict = {
  code: "en",
  appName: "Irreecha Connect",
  tagline: "Your cultural companion for Irreecha 2026",
  langLabel: "Language",
  nav: {
    home: "Home",
    schedule: "Festival Guide",
    visitor: "Visitor & Safety",
    diaspora: "Diaspora Hub",
    culture: "Cultural Stories",
  },
  hero: {
    badge: "Official Cultural Guide 2026",
    title: "Celebrate. Understand. Connect.",
    subtitle:
      "Three days of thanksgiving at Lake Hora Finfinnee and Lake Hora Harsadi, with all you need to join with respect.",
    ctaPrimary: "Explore the festival guide",
    ctaSecondary: "Open the site map",
    countdown: "Countdown to Irreecha 2026",
    units: ["Days", "Hours", "Minutes", "Seconds"],
  },
  days: ["Day 1 - Fri 02 Oct", "Day 2 - Sat 03 Oct", "Day 3 - Sun 04 Oct"],
  dayLabel: "Day",
  quick: {
    title: "Plan your visit",
    items: [
      { title: "Festival guide", body: "Ceremonies, Gadaa assemblies and music." },
      { title: "Interactive map", body: "Stages, water, first aid and shuttles." },
      { title: "Safety & transport", body: "Buses, parking, etiquette and hotlines." },
      { title: "Diaspora broadcast", body: "Live streams and global blessings." },
    ],
  },
  sacred: {
    eyebrow: "What Irreecha means",
    title: "A thanksgiving to Waaqa, shared by millions",
    body: "Irreecha is the Oromo thanksgiving festival. Families gather at the water's edge with fresh coqorsa grass, dip it into the lake, and give thanks for peace, fertility and another year of life.",
    pillars: [
      {
        title: "Coqorsa, the green grass",
        body: "Fresh grass stands for renewal and abundance. It is carried, dipped and shared as a sign of blessing.",
      },
      {
        title: "The Oda tree",
        body: "Under the sacred sycamore, elders speak the blessings that bind the community to peace.",
      },
      {
        title: "Water and springs",
        body: "Lakes and springs are honoured as sources of life. Visitors keep a respectful distance.",
      },
    ],
  },
  featured: {
    title: "Featured ceremonies",
    subtitle: "Live and upcoming moments across both festival sites",
    details: "View details",
    all: "Full schedule",
  },
  vendors: {
    title: "Local community stands",
    subtitle: "Traditional attire, crafts, food and coffee hosted by Bishoftu and Addis families",
  },
  alerts: {
    title: "Safety advisories",
    items: [
      "Drink water often and rest in the shaded zones between 11:00 and 15:00.",
      "Agree on a family meeting point before you enter the crowd.",
      "Only dry, grassy ground is safe for prayer mats. Keep clear of the water after dusk.",
      "Follow marshal instructions at shuttle stops and pedestrian crossings.",
    ],
  },
  status: {
    published: "Published",
    live: "Live now",
    tentative: "Tentative",
    special: "Special ceremony",
  },
  categories: {
    ceremony: "Ceremony",
    prayer: "Thanksgiving prayer",
    gadaa: "Gadaa assembly",
    music: "Music & poetry",
    youth: "Youth & diaspora walk",
    symposium: "Cultural symposium",
    diaspora: "Diaspora programme",
  },
  schedule: {
    title: "Festival guide & schedule",
    subtitle: "Filter by day, site and category to build your own Irreecha 2026 plan.",
    filterDay: "Day",
    allDays: "All days",
    allCategories: "All categories",
    search: "Search ceremonies, sites or Gadaa assemblies",
    noResults: "No ceremonies match these filters. Try another day or category.",
    results: "ceremonies",
    addCalendar: "Add to calendar",
    added: "Added to your calendar",
    directions: "Getting there",
    dressCode: "Dress code",
    location: "Site",
    time: "Time",
    mapTitle: "Site map",
    mapHint: "Tap a pin to see what happens there.",
  },
  map: {
    title: "Interactive site map",
    legend: "Filter points",
    legendItems: {
      sacred: "Sacred water",
      stage: "Main stage",
      medical: "First aid",
      shuttle: "Shuttle stop",
      parking: "Parking",
      food: "Food & water",
    },
  },
  visitor: {
    title: "Visitor & safety",
    subtitle: "Everything you need before you arrive, from shuttle lines to cultural etiquette.",
    transportTitle: "Transport & shuttle hubs",
    transportBody:
      "Express shuttles run from Addis Ababa to Bishoftu every 20 minutes from 04:30. Return trips run until 22:00.",
    checklistTitle: "Before you arrive",
    checklist: [
      "Wear light, respectful white or traditional attire and comfortable shoes.",
      "Carry a small bundle of fresh coqorsa grass if you plan to join the thanksgiving.",
      "Bring a refillable water bottle, a hat and sun protection.",
      "Pack personal medication and note the nearest first aid tent.",
      "Save the emergency hotlines before you lose signal in the crowd.",
    ],
    etiquetteTitle: "Cultural etiquette",
    etiquetteBody:
      "Irreecha is a peaceful, family-centred gathering. Respect for elders and for the water protects the spirit of the day.",
    dos: [
      "Greet and give way to elders, the Aba Gadaa and Haadha Siinqee women.",
      "Keep to marked paths around the lakes and springs.",
      "Join the blessing with quiet gratitude, even as you celebrate.",
      "Take your rubbish with you and keep the grass clean.",
    ],
    donts: [
      "Do not wade, swim or wash anything in the sacred water.",
      "Do not block ceremonial processions for photographs.",
      "Do not bring glass, drones or amplified sound into the assembly areas.",
    ],
    emergencyTitle: "Emergency directory",
    callNow: "Call",
  },
  diaspora: {
    title: "Diaspora hub",
    subtitle:
      "Wherever you are, Irreecha reaches you. Join the stream, share a blessing and stay close to home.",
    storiesTitle: "Voices from the diaspora",
    broadcastTitle: "Live broadcast schedule",
    broadcastBody:
      "Official channels carry the Finfinnee and Harsadi ceremonies live, with commentary in Afaan Oromoo, Amharic and English.",
    watchLive: "Watch live",
    blessingTitle: "Send an Irreecha blessing",
    blessingBody: "Read the traditional blessing aloud, then share it with family back home.",
    blessingCta: "Read the blessing",
    wallTitle: "Global greetings wall",
    wallBody: "Leave a short message for the community and see what others have written.",
    wallPlaceholder: "Write your Irreecha greeting",
    wallSubmit: "Post greeting",
    wallEmpty: "Be the first to greet the community.",
  },
  culture: {
    title: "Cultural stories",
    subtitle: "The meaning behind the grass, the tree, the water and the Gadaa system.",
    cards: [
      {
        title: "Why green grass",
        body: "Coqorsa is dipped into the lake and lifted again, carrying the year's gratitude back to the family home.",
      },
      {
        title: "The Gadaa system",
        body: "An indigenous Oromo governance system of eight-year cycles that still guides the assembly at Irreecha.",
      },
      {
        title: "Ayyaana and the Oda",
        body: "Under the Oda tree, elders speak blessings that bind the community to peace and to one another.",
      },
      {
        title: "A festival for everyone",
        body: "Irreecha welcomes every guest who arrives with respect, whatever their language or origin.",
      },
    ],
  },
  footer: {
    rights: "Irreecha Connect 2026. A community cultural guide.",
    note: "Built for visitors, the Oromo diaspora and tourists in Afaan Oromoo, Amharic and English.",
    explore: "Explore",
    language: "Language",
  },
  emergency: { label: "Emergency", call: "Call" },
};

export const translations: Record<Lang, TranslationDict> = { om, am, en };

export const LANGS: { code: Lang; short: string; label: string }[] = [
  { code: "om", short: "OM", label: "Afaan Oromoo" },
  { code: "am", short: "AM", label: "አማርኛ" },
  { code: "en", short: "EN", label: "English" },
];