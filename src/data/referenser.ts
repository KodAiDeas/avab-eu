// Datadriven källa för referensöversikten på /referenser/.
// Lägg till en ny referens genom att lägga till ett objekt i `references`.
// environments[] och technologies[] måste använda id:n som finns i listorna nedan.

export interface FilterOption {
  id: string;
  label: string;
  /** Valfri route dit filtret/pillret kan länka (miljö- eller tjänstesida). */
  href?: string;
}

export interface Reference {
  title: string;
  slug: string;
  location: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  environments: string[];
  technologies: string[];
  featured?: boolean;
}

// De 15 miljöerna. id:n matchar sajtens /miljo/-routes där en sådan finns,
// så att miljöpillren kan länka vidare till rätt miljösida.
export const environments: FilterOption[] = [
  { id: "simhall", label: "Simhall", href: "/miljo/simhall/" },
  { id: "sporthall", label: "Sporthall & arena", href: "/miljo/sporthall/" },
  { id: "ishall", label: "Ishall", href: "/miljo/ishall/" },
  { id: "skola", label: "Skola", href: "/miljo/skola/" },
  { id: "gym", label: "Gym", href: "/miljo/gym/" },
  { id: "kontor-konferens", label: "Kontor & konferens", href: "/miljo/kontor-konferens/" },
  { id: "hotell", label: "Hotell", href: "/miljo/hotell/" },
  { id: "restaurang-bar-klubb", label: "Restaurang & bar", href: "/miljo/restaurang-bar-klubb/" },
  { id: "butik-retail", label: "Butik & galleria", href: "/miljo/butik-retail/" },
  { id: "kopcentrum-galleria", label: "Köpcentrum & galleria", href: "/miljo/kopcentrum-galleria/" },
  { id: "industri", label: "Industri", href: "/miljo/industri/" },
  { id: "kyrka", label: "Kyrka & samlingslokal", href: "/miljo/kyrka/" },
  { id: "utomhusidrott", label: "Utomhusidrott", href: "/miljo/utomhusidrott/" },
  { id: "parkering-garage", label: "Parkering & garage", href: "/miljo/parkering-garage/" },
  { id: "vard", label: "Vård", href: "/miljo/vard/" },
];

// Teknikfilter. Huvudkategorier, inte varje enskild produkt.
// href pekar mot relevant tjänste-/kunskapssida där en sådan finns.
export const technologies: FilterOption[] = [
  { id: "ljud", label: "Ljud", href: "/tjanster/ljudsystem/" },
  { id: "bild", label: "Bild & skärmar", href: "/tjanster/skarmar-projektorer/" },
  { id: "ljus", label: "Ljus", href: "/miljo/gym/" },
  { id: "styrsystem", label: "Styrsystem", href: "/tjanster/styrsystem-integration/" },
  { id: "crestron", label: "Crestron" },
  { id: "dsp", label: "DSP" },
  { id: "mikrofoner", label: "Mikrofoner", href: "/tjanster/mikrofoner/" },
  { id: "horslinga", label: "Hörslinga", href: "/tjanster/horslinga/" },
  { id: "dante", label: "Dante" },
  { id: "ledvagg", label: "LED-vägg" },
  { id: "bakgrundsmusik", label: "Bakgrundsmusik", href: "/tjanster/bakgrundsmusik/" },
  { id: "konferens", label: "Konferens & videomöte", href: "/tjanster/konferensteknik/" },
  { id: "taluppfattbarhet", label: "Taluppfattbarhet", href: "/tjanster/taluppfattbarhet-akustik/" },
  { id: "projektering", label: "Projektering", href: "/tjanster/projektering/" },
  { id: "service", label: "Service" },
];

export const references: Reference[] = [
  {
    title: "Säffle simhall",
    slug: "/referenser/saffle-simhall/",
    location: "Säffle",
    image: "/assets/avab-referens-saffle-simhall-1200x800.webp",
    imageAlt: "Säffle simhall med zonindelat ljud och Crestronstyrning från AVAB",
    excerpt:
      "Överordnat Crestronsystem, zonindelat ljud, ingjutna hörslingor, projektor och RGB-styrd miljöbelysning. Upp till 487 sparade arbetstimmar per år.",
    environments: ["simhall"],
    technologies: ["ljud", "styrsystem", "crestron", "ljus", "horslinga", "mikrofoner", "bild", "projektering"],
    featured: true,
  },
  {
    title: "Årjängs simhall",
    slug: "/referenser/arjangs-simhall/",
    location: "Årjäng",
    image: "/assets/arjang-simhall-25m-bassang-nybyggnation.jpg",
    imageAlt: "Årjängs simhall med Bose ControlSpace och zonindelat ljud från AVAB",
    excerpt:
      "Bose ControlSpace EX-1280, sex ljudzoner, 100V med tio års garanti, projektor och diskslinga i en krävande klor- och fuktmiljö.",
    environments: ["simhall"],
    technologies: ["ljud", "dsp", "horslinga", "bild", "projektering"],
  },
  {
    title: "Sannerudshallen, Kil",
    slug: "/referenser/sannerudshallen-kil/",
    location: "Kil",
    image: "/assets/sannerudshallen-fardig-ljudinstallation.jpg",
    imageAlt: "Sannerudshallen i Kil med omprojekterat ishallsljud från AVAB",
    excerpt:
      "Omprojekterat ishallsljud med riktade 12-tums passiva Electro-Voice-högtalare, dbx DriveRack, nytt slutsteg och skyddad rackplacering.",
    environments: ["ishall", "sporthall"],
    technologies: ["ljud", "dsp", "taluppfattbarhet", "projektering"],
  },
  {
    title: "Kroppkärrs IP",
    slug: "/referenser/kroppkarrs-ip-fotboll/",
    location: "Karlstad",
    image: "/assets/kroppkarrs-ip-hero-hogtalare.jpg",
    imageAlt: "Kroppkärrs IP med tvåzons utomhusljud över fotbollsplanerna från AVAB",
    excerpt:
      "Tvåzons utomhusljud med AtlasIED-högtalare, 100V, Denon-mixer, trådlösa mikrofoner och skyddad Bluetooth-pairing över två fotbollsplaner.",
    environments: ["utomhusidrott", "sporthall"],
    technologies: ["ljud", "mikrofoner"],
  },
  {
    title: "Minnebergsskolan, Arvika",
    slug: "/referenser/minnebergsskolan-arvika/",
    location: "Arvika",
    image: "/assets/avab-referens-minnebergsskolan-arvika-1200x800.webp",
    imageAlt: "Minnebergsskolan i Arvika med aula, hörsalar och Crestron från AVAB",
    excerpt:
      "Skola för 900 elever: klassrum, 20 hörsalar, 18 infoskärmar och en aula med Crestron, DMX och Dante.",
    environments: ["skola"],
    technologies: ["ljud", "bild", "ljus", "styrsystem", "crestron", "dante", "mikrofoner", "horslinga"],
    featured: true,
  },
  {
    title: "Lesjöfors AB",
    slug: "/referenser/lesjofors-ab/",
    location: "Lesjöfors",
    image: "/assets/lesjofors-konferensrum-fardigt-langbord.webp",
    imageAlt: "Konferensrum hos Lesjöfors AB med Q-SYS, beamforming-takmikrofon och videomöte från AVAB",
    excerpt:
      "Konferensrum med Q-SYS, AEC, Dante, Audio-Technica beamforming-takmikrofon, Huddly-kamera och USB-C-videomöte.",
    environments: ["industri", "kontor-konferens"],
    technologies: ["ljud", "bild", "dsp", "dante", "mikrofoner", "konferens"],
  },
  {
    title: "Hundfjällshotellet & Hundfjällscenter",
    slug: "/referenser/hundfjallshotellet-hundfjallscenter-salen/",
    location: "Sälen",
    image: "/assets/avab-referens-hundfjallshotellet-salen-1200x800.webp",
    imageAlt: "Hög entré i Hundfjällshotellet i Sälen med pendlade högtalare från AVAB",
    excerpt:
      "494 högtalare i 28 appstyrda ljudzoner, EASE-projektering, fem konferensrum med SLS-hörslinga och Dante mellan husen.",
    environments: ["hotell", "kontor-konferens", "restaurang-bar-klubb", "gym"],
    technologies: ["ljud", "dante", "horslinga", "konferens", "bakgrundsmusik", "projektering", "mikrofoner"],
    featured: true,
  },
  {
    title: "Friskis&Svettis Karlstad",
    slug: "/referenser/friskis-solstadens-sportcenter/",
    location: "Karlstad",
    image: "/assets/friskis-solstadens-sportcenter-av-teknik.webp",
    imageAlt: "Friskis&Svettis Karlstad, Solstadens Sportcenter, med zonstyrt ljud från AVAB",
    excerpt:
      "Service, utbyte och komplettering av en tio år gammal anläggning: 24 ljudzoner, 32 ingångar, sju salar, Crestron och ClearOne.",
    environments: ["gym"],
    technologies: ["ljud", "styrsystem", "crestron", "dsp", "mikrofoner", "konferens", "service"],
    featured: true,
  },
  {
    title: "Claessons Konferens & Restaurang",
    slug: "/referenser/claessons-restaurang-konferens/",
    location: "Karlstad",
    image: "/assets/claessons-albatrossen-stor-sal.webp",
    imageAlt: "Claessons Konferens och Restaurang med åtta konferensrum och festvåning",
    excerpt:
      "Åtta konferensrum för 6 till 200 personer, Biamp-styrning, HDBaseT, trådlösa mikrofoner, restaurangljud och Pioneer XPRS-festanläggning.",
    environments: ["kontor-konferens", "restaurang-bar-klubb"],
    technologies: ["ljud", "bild", "styrsystem", "mikrofoner", "bakgrundsmusik", "konferens", "service"],
    featured: true,
  },
  {
    title: "Nordic Wellness Marieberg",
    slug: "/referenser/nordic-wellness-orebro-marieberg/",
    location: "Örebro",
    image: "/assets/nordic-wellness-marieberg-ledstrak-slutresultat.jpg",
    imageAlt: "Nordic Wellness Marieberg i Örebro med 180 meter LED från AVAB",
    excerpt:
      "180 meter fjärrstyrd LED-belysning pendlad helt parallellt från ett snett tak i en ombyggd padelhall. Precisionsmontage på höjd.",
    environments: ["gym"],
    technologies: ["ljus", "styrsystem"],
  },
  {
    title: "Sörby idrottshall, Kumla",
    slug: "/referenser/sorby-sporthall-kumla/",
    location: "Kumla",
    image: "/assets/avab-referens-sorby-sporthall-kumla-1200x900.webp",
    imageAlt: "Sörby idrottshall i Kumla med Crestron, Dante och LED-vägg från AVAB",
    excerpt:
      "Delbar hall med Crestron, Bose ControlSpace EX-1280, Dante-anslutna Bluetooth-mottagare, trådlösa mikrofoner och LED-vägg.",
    environments: ["sporthall", "skola"],
    technologies: ["ljud", "bild", "styrsystem", "crestron", "dsp", "dante", "mikrofoner", "ledvagg", "taluppfattbarhet"],
  },
  {
    title: "Ekhagsskolan, Dals Långed",
    slug: "/referenser/ekhagsskolan-dals-langed/",
    location: "Dals Långed",
    image: "/assets/ekhagsskolan-idrottshall-hogtalare-oversikt.webp",
    imageAlt: "Ekhagsskolan i Dals Långed med zonstyrt ljud i idrottshall från AVAB",
    excerpt:
      "Zonstyrt ljud i en delbar skolidrottshall med Bose EX-880, CC-16-paneler, JBL EON, Sennheiser-mikrofoner, AUX och Bluetooth.",
    environments: ["skola", "sporthall"],
    technologies: ["ljud", "styrsystem", "dsp", "mikrofoner", "taluppfattbarhet", "projektering"],
  },
  {
    title: "Lundsbergs skola",
    slug: "/referenser/lundsbergs-skola-gym/",
    location: "Storfors",
    image: "/assets/lundsbergs-skola-gym-oversikt.webp",
    imageAlt: "Översikt över gymmiljön på Lundsbergs skola med infällda högtalare från AVAB",
    excerpt:
      "Appstyrd ljudanläggning i åtta zoner för gym, spinning- och roddsal, entré och omklädningsrum, med infällda högtalare och basar.",
    environments: ["skola", "gym"],
    technologies: ["ljud", "bild", "bakgrundsmusik", "projektering"],
  },
  {
    title: "Hanza Mechanics, Töcksfors",
    slug: "/referenser/hanza-konferens-tocksfors/",
    location: "Töcksfors",
    image: "/assets/Hanza konf 1200x900.webp",
    imageAlt: "Konferensrum hos Hanza Mechanics i Töcksfors med videobar och rumsbokning från AVAB",
    excerpt:
      "Två nya konferensrum med 85-tums Samsung PRO, Crestron AirMedia, Teams/BYOD, Sennheiser-videobar och rumsbokningspaneler utanför fyra rum.",
    environments: ["industri", "kontor-konferens"],
    technologies: ["bild", "styrsystem", "crestron", "mikrofoner", "konferens"],
  },
];
