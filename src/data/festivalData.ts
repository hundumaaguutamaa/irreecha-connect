import type { Lang } from "./translations";

export type SiteId = "finfinnee" | "harsadi";
export type EventCategory =
  | "ceremony"
  | "prayer"
  | "gadaa"
  | "music"
  | "youth"
  | "symposium"
  | "diaspora";
export type EventStatus = "published" | "live" | "tentative" | "special";
export type NodeType = "sacred" | "stage" | "medical" | "shuttle" | "parking" | "food";
export type TransportMode = "bus" | "van" | "train" | "car";

export interface Site {
  id: SiteId;
  name: Record<Lang, string>;
  city: Record<Lang, string>;
}

export interface FestivalEvent {
  id: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  dress: Record<Lang, string>;
  day: number;
  time: string;
  site: SiteId;
  category: EventCategory;
  status: EventStatus;
  featured?: boolean;
}

export interface MapNode {
  id: string;
  site: SiteId;
  type: NodeType;
  x: number;
  y: number;
  note: Record<Lang, string>;
}

export interface Vendor {
  id: string;
  name: string;
  tag: string;
  site: SiteId;
  blurb: Record<Lang, string>;
}

export interface TransportRoute {
  id: string;
  mode: TransportMode;
  from: string;
  to: string;
  time: string;
  freq: string;
}

export interface EmergencyContact {
  id: string;
  label: Record<Lang, string>;
  number: string;
  icon: string;
}

export interface DiasporaStory {
  id: string;
  city: string;
  author: string;
  quote: Record<Lang, string>;
}

export interface BroadcastChannel {
  id: string;
  name: string;
  platform: string;
  time: string;
  live: boolean;
}

export const IMAGES = {
  hero: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ea5b5c0a-91dc-49f4-a638-2d0fb51db3b3/irreecha-hero-4df64c4d-1790246602259.webp",
  prayer:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ea5b5c0a-91dc-49f4-a638-2d0fb51db3b3/irreecha-prayer-0749fdb4-1790246601826.webp",
  coqorsa:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ea5b5c0a-91dc-49f4-a638-2d0fb51db3b3/irreecha-coqorsa-7d6f6d85-1790246601331.webp",
  oda: "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ea5b5c0a-91dc-49f4-a638-2d0fb51db3b3/irreecha-oda-7123459c-1790246602032.webp",
  diaspora:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ea5b5c0a-91dc-49f4-a638-2d0fb51db3b3/irreecha-diaspora-0fcdb4c6-1790246602232.webp",
  vendor:
    "https://dala-prod-public-storage.s3.eu-west-1.amazonaws.com/generated-images/ea5b5c0a-91dc-49f4-a638-2d0fb51db3b3/irreecha-vendor-fb8755c6-1790246601989.webp",
};

export const FESTIVAL_START = "2026-10-02T05:30:00+03:00";

export const SITES: Site[] = [
  {
    id: "finfinnee",
    name: {
      en: "Lake Hora Finfinnee",
      om: "Hora Finfinnee",
      am: "ሆራ ፍንፍኔ",
    },
    city: { en: "Addis Ababa", om: "Finfinnee", am: "አዲስ አበባ" },
  },
  {
    id: "harsadi",
    name: {
      en: "Lake Hora Harsadi",
      om: "Hora Harsadii",
      am: "ሆራ ሃርሳዲ",
    },
    city: { en: "Bishoftu", om: "Bishooftuu", am: "ቢሾፍቱ" },
  },
];

export const EVENTS: FestivalEvent[] = [
  {
    id: "ev-1",
    day: 1,
    time: "05:30",
    site: "finfinnee",
    category: "prayer",
    status: "live",
    featured: true,
    title: {
      en: "Dawn Thanksgiving Prayer",
      om: "Kadhannaa Galataa Barii",
      am: "የንጋት ምስጋና ጸሎት",
    },
    description: {
      en: "Families gather at the water's edge to dip coqorsa grass and give thanks as the sun rises.",
      om: "Maatiiwwan malkaa cinaatti walitti qabamanii, aduun bahaa jirtuu coqorsa cuunfanii galata dhiyeessu.",
      am: "ቤተሰቦች በሐይቁ ዳርቻ ተሰብስበው ቆቆርሳ አጥለቅልቀው ፀሐይ ሲወጣ ምስጋና ያቀርባሉ።",
    },
    dress: {
      en: "White traditional attire",
      om: "Uffata adii aadaa",
      am: "ነጭ ባህላዊ ልብስ",
    },
  },
  {
    id: "ev-2",
    day: 2,
    time: "06:00",
    site: "harsadi",
    category: "ceremony",
    status: "published",
    featured: true,
    title: {
      en: "Irreecha Malkaa Harsadi",
      om: "Irreecha Malkaa Harsadii",
      am: "ኢሬቻ ማልካ ሃርሳዲ",
    },
    description: {
      en: "The main thanksgiving at Lake Hora Harsadi, led by Aba Gadaa and community elders.",
      om: "Galanni guddaan Hora Harsadii irratti, Abbaa Gadaa fi jaarsolii hawaasaatiin geggeeffama.",
      am: "ዋናው ምስጋና በሆራ ሃርሳዲ ሐይቅ፣ በአባ ገዳና በማህበረሰብ ሽማግሌዎች ይመራል።",
    },
    dress: {
      en: "White attire with cultural shawl",
      om: "Uffata adii fi shaalii aadaa",
      am: "ነጭ ልብስና ባህላዊ ሻማ",
    },
  },
  {
    id: "ev-3",
    day: 1,
    time: "09:00",
    site: "finfinnee",
    category: "gadaa",
    status: "special",
    title: {
      en: "Gadaa Elders Assembly",
      om: "Marii Jaarsolii Gadaa",
      am: "የገዳ ሽማግሌዎች ጉባኤ",
    },
    description: {
      en: "Gadaa leaders and Haadha Siinqee women open the assembly with blessings for peace.",
      om: "Gegeessitoonni Gadaa fi dubartoonni Haadha Siinqee marii eebba nageenyaatiin banu.",
      am: "የገዳ መሪዎችና ሃዳ ሲንቄ ሴቶች ጉባኤውን በሰላም በረከት ይከፍታሉ።",
    },
    dress: {
      en: "Traditional shawl and staff",
      om: "Shaalii aadaa fi ulee",
      am: "ባህላዊ ሻማና በትር",
    },
  },
  {
    id: "ev-4",
    day: 2,
    time: "08:30",
    site: "harsadi",
    category: "youth",
    status: "published",
    title: {
      en: "Coqorsa Procession & Youth Walk",
      om: "Geengoo Coqorsaa fi Deemsa Dargaggootaa",
      am: "የቆቆርሳ ሰልፍና የወጣቶች ጉዞ",
    },
    description: {
      en: "Youth groups and diaspora guests walk together carrying green grass toward the lake.",
      om: "Gareen dargaggootaa fi keessummoonni hawaasa alaa coqorsa qabatanii gara malkaa deemu.",
      am: "የወጣት ቡድኖችና የዲያስፖራ እንግዶች አረንጓዴ ሣር ይዘው ወደ ሐይቁ ይጓዛሉ።",
    },
    dress: {
      en: "White attire with green sash",
      om: "Uffata adii fi geengoo magariisa",
      am: "ነጭ ልብስና አረንጓዴ ቀበቶ",
    },
  },
  {
    id: "ev-5",
    day: 1,
    time: "19:30",
    site: "finfinnee",
    category: "music",
    status: "published",
    title: {
      en: "Traditional Music & Poetry Night",
      om: "Halkan Muuziqaa fi Walaloo Aadaa",
      am: "የባህል ሙዚቃና ግጥም ምሽት",
    },
    description: {
      en: "Ayyaana songs, Oromo poetry and dance on the main stage until late evening.",
      om: "Sirboota Ayyaanaa, walaloo Oromoo fi shubbisa waltajjii guddii irratti hanga galgala.",
      am: "የአያና ዘፈኖች፣ የኦሮሞ ግጥምና ጭፈራ በዋናው መድረክ እስከ ምሽት ድረስ።",
    },
    dress: {
      en: "Comfortable traditional wear",
      om: "Uffata aadaa mijataa",
      am: "ምቹ ባህላዊ ልብስ",
    },
  },
  {
    id: "ev-6",
    day: 3,
    time: "11:00",
    site: "harsadi",
    category: "diaspora",
    status: "tentative",
    title: {
      en: "Diaspora Welcome Reception",
      om: "Simannaa Hawaasa Alaa",
      am: "የዲያስፖራ አቀባበል",
    },
    description: {
      en: "A welcome for returning diaspora families with coffee ceremony and community greetings.",
      om: "Simannaa maatii hawaasa alaa deebi'aniif, sirna bunaatiin fi nagaa hawaasaatiin.",
      am: "ለተመለሱ የዲያስፖራ ቤተሰቦች በቡና ሥርዓትና በማህበረሰብ ሰላምታ የሚደረግ አቀባበል።",
    },
    dress: {
      en: "Smart traditional or white",
      om: "Uffata aadaa bareedaa",
      am: "የሚያምር ባህላዊ ወይም ነጭ ልብስ",
    },
  },
  {
    id: "ev-7",
    day: 3,
    time: "14:00",
    site: "finfinnee",
    category: "symposium",
    status: "tentative",
    title: {
      en: "Cultural Symposium: Irreecha Heritage",
      om: "Marii Aadaa: Seenaa Irreechaa",
      am: "የባህል ጉባኤ የኢሬቻ ቅርስ",
    },
    description: {
      en: "Scholars and elders discuss the history and future of the Irreecha festival.",
      om: "Hayyootaa fi jaarsoliin seenaa fi egeree ayyaana Irreechaa irratti mari'atu.",
      am: "ምሁራንና ሽማግሌዎች ስለ ኢሬቻ በዓል ታሪክና የወደፊት ሁኔታ ይወያያሉ።",
    },
    dress: {
      en: "Neat casual or traditional",
      om: "Uffata qulqulluu",
      am: "ንጹህ ተራ ወይም ባህላዊ ልብስ",
    },
  },
  {
    id: "ev-8",
    day: 3,
    time: "18:00",
    site: "harsadi",
    category: "prayer",
    status: "published",
    featured: true,
    title: {
      en: "Evening Bonfire & Blessing",
      om: "Ibsaa Abiddaa fi Eebba Galgalaa",
      am: "የምሽት እሳትና በረከት",
    },
    description: {
      en: "Families close the festival around the fire with songs and a final blessing.",
      om: "Maatiiwwan ayyaana abidda cinaatti sirbaa fi eebba dhumaa waliin xumuru.",
      am: "ቤተሰቦች በዓሉን በእሳት ዙሪያ በዘፈንና በመጨረሻ በረከት ይዘጋሉ።",
    },
    dress: {
      en: "Warm layers, traditional wear",
      om: "Uffata ho'a aadaa",
      am: "ሞቅ ያለ ባህላዊ ልብስ",
    },
  },
];

export const MAP_NODES: MapNode[] = [
  {
    id: "f-sacred",
    site: "finfinnee",
    type: "sacred",
    x: 48,
    y: 62,
    note: {
      en: "Enter the prayer ground barefoot and quiet.",
      om: "Bakka kadhannaa kophee hin uffatin, calqabaadhu.",
      am: "የጸሎት ቦታውን ጫማ ሳይጫሙና በጸጥታ ይግቡ።",
    },
  },
  {
    id: "f-stage",
    site: "finfinnee",
    type: "stage",
    x: 30,
    y: 40,
    note: {
      en: "Music, poetry and the youth walk start here.",
      om: "Muuziqaa, walaloo fi deemsi dargaggootaa asii jalqaba.",
      am: "ሙዚቃ፣ ግጥምና የወጣቶች ጉዞ ከዚህ ይጀምራል።",
    },
  },
  {
    id: "f-medical",
    site: "finfinnee",
    type: "medical",
    x: 72,
    y: 34,
    note: {
      en: "Nurses and an ambulance on standby.",
      om: "Narsii fi ambulaansii qophii irra jira.",
      am: "ነርሶችና አምቡላንስ ዝግጁ ናቸው።",
    },
  },
  {
    id: "f-shuttle",
    site: "finfinnee",
    type: "shuttle",
    x: 18,
    y: 74,
    note: {
      en: "Buses to Megenagna every 15 minutes.",
      om: "Awtoobusii gara Megenaaña daqiiqaa 15 hunda.",
      am: "ወደ መገናኛ አውቶቡሶች በየ15 ደቂቃ።",
    },
  },
  {
    id: "f-parking",
    site: "finfinnee",
    type: "parking",
    x: 82,
    y: 68,
    note: {
      en: "Family parking with a free shuttle loop.",
      om: "Bakka dhaabbii maatii fi geengoo konkolaataa bilisaa.",
      am: "የቤተሰብ ማቆሚያና ነጻ የአውቶቡስ ዑደት።",
    },
  },
  {
    id: "f-food",
    site: "finfinnee",
    type: "food",
    x: 60,
    y: 24,
    note: {
      en: "Free water refills and community kitchens.",
      om: "Bishaan bilisaa fi kuusaa nyaataa hawaasaa.",
      am: "ነጻ የውሃ ሙሌትና የማህበረሰብ ምግብ ቤቶች።",
    },
  },
  {
    id: "h-sacred",
    site: "harsadi",
    type: "sacred",
    x: 46,
    y: 66,
    note: {
      en: "The main Malkaa blessing ground.",
      om: "Bakka eebba Malkaa guddaa.",
      am: "ዋናው የማልካ በረከት ቦታ።",
    },
  },
  {
    id: "h-stage",
    site: "harsadi",
    type: "stage",
    x: 28,
    y: 44,
    note: {
      en: "Main stage and the diaspora welcome tent.",
      om: "Waltajjii guddaa fi dunkaana simannaa hawaasa alaa.",
      am: "ዋና መድረክና የዲያስፖራ አቀባበል ድንኳን።",
    },
  },
  {
    id: "h-medical",
    site: "harsadi",
    type: "medical",
    x: 74,
    y: 38,
    note: {
      en: "Field clinic with cooling tents.",
      om: "Kiliniika dirree fi dunkaana qabbanaawaa.",
      am: "የመስክ ክሊኒክና ማቀዝቀዣ ድንኳኖች።",
    },
  },
  {
    id: "h-shuttle",
    site: "harsadi",
    type: "shuttle",
    x: 20,
    y: 70,
    note: {
      en: "Express shuttles back to Addis Ababa.",
      om: "Konkolaataa saffisaa gara Finfinnee deebi'u.",
      am: "ወደ አዲስ አበባ የሚመለሱ ፈጣን አውቶቡሶች።",
    },
  },
  {
    id: "h-parking",
    site: "harsadi",
    type: "parking",
    x: 80,
    y: 72,
    note: {
      en: "Coach and private car parking, gates 2 and 3.",
      om: "Bakka dhaabbii awtoobusii fi konkolaataa dhuunfaa, balbala 2 fi 3.",
      am: "የአውቶቡስና የግል መኪና ማቆሚያ፣ በር 2ና 3።",
    },
  },
  {
    id: "h-food",
    site: "harsadi",
    type: "food",
    x: 58,
    y: 22,
    note: {
      en: "Bishoftu food village and coffee stands.",
      om: "Ganda nyaataa Bishooftuu fi dhaabbii buna.",
      am: "የቢሾፍቱ የምግብ መንደርና የቡና ድንኳኖች።",
    },
  },
];

export const VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "Bishoftu Uffata Aadaa",
    tag: "attire",
    site: "harsadi",
    blurb: {
      en: "Handwoven traditional Oromo clothing and shawls.",
      om: "Uffata aadaa Oromoo harkaan hojjetame fi shaalii.",
      am: "በእጅ የተሰራ ባህላዊ የኦሮሞ ልብስና ሻማ።",
    },
  },
  {
    id: "v2",
    name: "Hora Coffee Ceremony",
    tag: "food",
    site: "finfinnee",
    blurb: {
      en: "Traditional jebena coffee served under the trees.",
      om: "Buna jebenaa aadaa muka jalatti dhiyaata.",
      am: "ባህላዊ የጀበና ቡና ከዛፎች ስር።",
    },
  },
  {
    id: "v3",
    name: "Cuukkoo Kitchen",
    tag: "food",
    site: "harsadi",
    blurb: {
      en: "Oromo home cooking: cuukkoo, marqaa and roasted barley.",
      om: "Nyaata manaa Oromoo: cuukkoo, marqaa fi bishingaa.",
      am: "የኦሮሞ የቤት ምግብ፦ ቹኮ፣ ማርቃና የተጠበሰ ገብስ።",
    },
  },
  {
    id: "v4",
    name: "Siinqee Beads & Crafts",
    tag: "craft",
    site: "finfinnee",
    blurb: {
      en: "Beadwork, leather and baskets made by women's groups.",
      om: "Faaya harkaa, gogaa fi gobbaa dubartoonni hojjetan.",
      am: "በሴቶች ቡድን የተሰሩ ዶቃ፣ ቆዳና ቅርጫቶች።",
    },
  },
  {
    id: "v5",
    name: "Irreecha Coqorsa Stand",
    tag: "attire",
    site: "finfinnee",
    blurb: {
      en: "Fresh coqorsa grass, green sashes and white cloth.",
      om: "Coqorsa haaraa, geengoo magariisaa fi huccuu adii.",
      am: "ትኩስ ቆቆርሳ፣ አረንጓዴ ቀበቶና ነጭ ጨርቅ።",
    },
  },
  {
    id: "v6",
    name: "Bishoftu Cultural Guides",
    tag: "guide",
    site: "harsadi",
    blurb: {
      en: "Local guides offering respectful heritage walks.",
      om: "Geggeessitoonni naannoo daawwannaa aadaa kabajaan kennu.",
      am: "የአካባቢ አስጎብኚዎች በአክብሮት የቅርስ ጉዞ ያቀርባሉ።",
    },
  },
];

export const TRANSPORT: TransportRoute[] = [
  {
    id: "t1",
    mode: "bus",
    from: "Meskel Square",
    to: "Bishoftu (Harsadi)",
    time: "04:30 - 21:00",
    freq: "Every 20 min",
  },
  {
    id: "t2",
    mode: "bus",
    from: "Bole Airport",
    to: "Bishoftu (Harsadi)",
    time: "05:00 - 20:00",
    freq: "Every 30 min",
  },
  {
    id: "t3",
    mode: "bus",
    from: "Megenagna",
    to: "Addis (Finfinnee)",
    time: "04:30 - 20:30",
    freq: "Every 15 min",
  },
  {
    id: "t4",
    mode: "train",
    from: "Adama Station",
    to: "Bishoftu",
    time: "06:00 - 19:00",
    freq: "Every 60 min",
  },
  {
    id: "t5",
    mode: "van",
    from: "Bole Michael",
    to: "Hora Finfinnee",
    time: "05:00 - 21:00",
    freq: "Every 10 min",
  },
  {
    id: "t6",
    mode: "car",
    from: "Parking P1 / P2",
    to: "Harsadi gate",
    time: "All day",
    freq: "Free shuttle loop",
  },
];

export const EMERGENCY: EmergencyContact[] = [
  {
    id: "e1",
    number: "907",
    icon: "FirstAid",
    label: { en: "Ambulance & Medical", om: "Ambulaansii fi yaalaa", am: "አምቡላንስና ህክምና" },
  },
  {
    id: "e2",
    number: "991",
    icon: "ShieldCheck",
    label: { en: "Police", om: "Poolisii", am: "ፖሊስ" },
  },
  {
    id: "e3",
    number: "939",
    icon: "Campfire",
    label: { en: "Fire Service", om: "Tajaajila ibiddaa", am: "የእሳት አደጋ አገልግሎት" },
  },
  {
    id: "e4",
    number: "+251 911 000 111",
    icon: "MagnifyingGlass",
    label: {
      en: "Lost & Found Desk",
      om: "Badee fi argamee ayyaanaa",
      am: "የጠፋና የተገኘ ዴስክ",
    },
  },
  {
    id: "e5",
    number: "+251 911 222 333",
    icon: "Globe",
    label: {
      en: "Diaspora Assistance",
      om: "Gargaarsa hawaasa alaa",
      am: "የዲያስፖራ ድጋፍ",
    },
  },
  {
    id: "e6",
    number: "+251 911 444 555",
    icon: "Users",
    label: {
      en: "Volunteer Marshals",
      om: "Geggeessitoonni fedhiin",
      am: "የበጎ ፍቃድ ጠባቂዎች",
    },
  },
];

export const STORIES: DiasporaStory[] = [
  {
    id: "s1",
    city: "Minneapolis",
    author: "Tolaa B.",
    quote: {
      en: "We wake before dawn to stream the Harsadi prayer. It feels like home.",
      om: "Barii dursee kaafnee kadhannaa Harsadii tamsaasu. Mana fakkaata.",
      am: "ከንጋት በፊት ተነስተን የሃርሳዲን ጸሎት እናያለን። እንደ ቤት ይሰማል።",
    },
  },
  {
    id: "s2",
    city: "London",
    author: "Hawi T.",
    quote: {
      en: "The kids carry green grass in their bags. The blessing travels with them.",
      om: "Ijoollonni coqorsa boorsaa isaanii keessaatti geessu. Eebbi isaan waliin deema.",
      am: "ልጆቹ አረንጓዴ ሣር በሻንጣቸው ይይዛሉ። በረከቱ አብሮ ይጓዛል።",
    },
  },
  {
    id: "s3",
    city: "Melbourne",
    author: "Chaltu G.",
    quote: {
      en: "Our community hall fills with white shawls and coffee smoke every Irreecha.",
      om: "Galma hawaasa keenya Irreecha hunda shaalii adii fi aara bunaatiin guuta.",
      am: "የማህበረሰባችን አዳራሽ በየኢሬቻው በነጭ ሻማና በቡና ጢስ ይሞላል።",
    },
  },
  {
    id: "s4",
    city: "Nairobi",
    author: "Gemechu D.",
    quote: {
      en: "We cross the border just to stand with family at the water's edge.",
      om: "Daangaa ceesuun qofa malkaa cinaatti maatii waliin dhaabbachuuf.",
      am: "በውሃ ዳርቻ ከቤተሰብ ጋር ለመቆም ድንበሩን እንሻገራለን።",
    },
  },
  {
    id: "s5",
    city: "Frankfurt",
    author: "Bontu A.",
    quote: {
      en: "I teach my daughter the blessing in Afaan Oromoo, word by word.",
      om: "Intala kootiif eebba Afaan Oromoon, jecha jechaan barsiisa.",
      am: "ለልጄ በረከቱን በኦሮሚኛ ቃል በቃል አስተምራለሁ።",
    },
  },
];

export const CHANNELS: BroadcastChannel[] = [
  { id: "b1", name: "OBN TV", platform: "Satellite & YouTube", time: "Day 2 - 05:30", live: true },
  { id: "b2", name: "OMN", platform: "Satellite", time: "Day 2 - 05:30", live: true },
  { id: "b3", name: "EBC", platform: "National TV", time: "Day 1 - 19:30", live: false },
  { id: "b4", name: "Irreecha Live", platform: "YouTube Live", time: "All three days", live: true },
];

export const BLESSING: Record<Lang, string> = {
  en: "Waaqa, giver of all life, receive this festival of thanksgiving. Take this coqorsa from the lake and grant the Oromo people abundance and health. May peace descend on our land and on all the world.",
  om: "Yaa Waaqa guutuu, ayyaana kee nagaa nuu kenni. Coqorsa kana malkaa keessaa fudhadhu, badhaadhina fi fayyaa hawaasa Oromoof kenni. Nageenyi biyya keenyaa fi addunyaa hunda irratti haa bu'a.",
  am: "ጌታ ሆይ ሙሉ የሆንክ ዋቃ፣ በዓልህን በሰላም አድርስ። ይህን ቆቆርሳ ከሐይቁ ተቀብለህ ለኦሮሞ ሕዝብ ብዛትና ጤና ስጥ። ሰላም በአገራችንና በዓለም ሁሉ ላይ ይውረድ።",
};