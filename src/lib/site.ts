// Shared site content: photos, property options and service areas.

// Full-resolution hero photo supplied by the client.
export const photos = {
  hero: "/hero.jpg",
};

// Full-resolution Unsplash photos (free for commercial use, Unsplash License), chosen to match each slot in the designs.
// Next.js resizes them per screen; 2400px source keeps heroes sharp on retina.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=90`;

export const designPhotos = {
  // home
  livingRoom: unsplash("1564078516393-cf04bd966897"),
  tenantPlacement: unsplash("1748063578185-3d68121b11ff"),
  propertyManagement: unsplash("1757792859308-b8d2115a0010"),
  rentCollection: unsplash("1651176118867-f4ac0b1d6da4"),
  propertyCare: unsplash("1620207745017-3e9ef8cd2a1b"),
  journey: unsplash("1665249934445-1de680641f50"),
  skyline: unsplash("1544970748-a04e01fff99c"),
  analysisHouse: unsplash("1602193289141-9605ad75d0a5"),
  analysisStone: unsplash("1579724175242-0204ecac28cb"),
  // services page
  servicesHero: unsplash("1568605114967-8130f3a36994"),
  rowTenant: unsplash("1665249934445-1de680641f50"),
  rowManagement: unsplash("1602193289141-9605ad75d0a5"),
  rowRent: unsplash("1651176118867-f4ac0b1d6da4"),
  rowCare: unsplash("1780337675943-f63d92324e7b"),
  servicesCta: unsplash("1588351829783-6edb9bd6af6a"),
  // areas page
  areasHero: unsplash("1562762394-3acfba62a48e"),
  areaCharlotte: unsplash("1678275868398-ed28a3a8df4e"),
  areaBallantyne: unsplash("1785243946963-8e9405c6971c"),
  areaMatthews: unsplash("1761839259488-2bdeeae794f5"),
  areaHuntersville: unsplash("1590526062333-264c32242d05"),
  // rental analysis page
  analysisReceive: unsplash("1601617956235-c97e358d054f"),
  analysisStoneBand: unsplash("1635074155443-6cbf74711dd2"),
  // resources + contact pages
  resourcesHero: unsplash("1791197538911-46dbf6687be7"),
  resourcesFeatured: unsplash("1783490244502-cd5f236e3780"),
  guideSkyline: unsplash("1554380032-80ba97e6eccd"),
  guideLiving: unsplash("1706200234292-66928ea63168"),
  guideHouse: unsplash("1544984243-ec57ea16fe25"),
  contactHero: unsplash("1608619769165-25647672335f"),
  contactCta: unsplash("1748063578185-3d68121b11ff"),
  areasMarketStreet: unsplash("1622521506372-eedbda7f4be7"),
};

export const PROPERTY_TYPES = ["Single Family", "Townhome", "Condo / Apartment", "Multi-Family", "Luxury / Estate"];

export const AMENITIES = [
  "Smart Home System", "Pool & Spa", "Gated Security Access", "Garage Parking",
  "Updated Kitchen", "Lake Access / Dock", "Guest House / ADU", "Outdoor Living Space",
];


export type Area = { name: string; lat: number; lng: number; blurb: string; img: string; note?: string };

// Service areas with real coordinates (for the coverage map). Photos are representative, not of the exact town.
export const AREAS: Area[] = [
  { name: "Charlotte", lat: 35.227, lng: -80.843, note: "Primary service area", img: designPhotos.areaCharlotte,
    blurb: "The region's urban core — uptown condos, historic neighborhoods and steady renter demand." },
  { name: "Huntersville", lat: 35.41, lng: -80.843, img: designPhotos.areaHuntersville,
    blurb: "North of Charlotte near Lake Norman, with family neighborhoods and newer communities." },
  { name: "Concord", lat: 35.409, lng: -80.58, note: "Select areas", img: unsplash("1759870010783-5bb588affd48"),
    blurb: "Home of Charlotte Motor Speedway, with fast-growing neighborhoods across Cabarrus County." },
  { name: "Harrisburg", lat: 35.324, lng: -80.658, img: unsplash("1565402170291-8491f14678db"),
    blurb: "A Cabarrus County suburb between Charlotte and Concord with family-friendly neighborhoods." },
  { name: "Mint Hill", lat: 35.18, lng: -80.647, img: unsplash("1748444146081-d141d1034fcb"),
    blurb: "A quiet, small-town feel on Charlotte's east side, known for larger lots and mature trees." },
  { name: "Matthews", lat: 35.117, lng: -80.723, img: designPhotos.areaMatthews,
    blurb: "A walkable historic downtown and established neighborhoods southeast of Charlotte." },
  { name: "Indian Trail", lat: 35.077, lng: -80.669, img: unsplash("1631458325834-8f678e48912c"),
    blurb: "A fast-growing Union County town with plenty of newer single-family homes." },
  { name: "Pineville", lat: 35.083, lng: -80.892, img: unsplash("1621465558419-1deb2e51b530"),
    blurb: "A compact town beside Carolina Place mall, with quick access to I-485." },
  { name: "Ballantyne", lat: 35.053, lng: -80.849, img: designPhotos.areaBallantyne,
    blurb: "South Charlotte's hub of office parks, golf and newer homes popular with professionals." },
];

export const ALSO_SERVING = AREAS.slice(1).map((a) => (a.note === "Select areas" ? `${a.name} (select areas)` : a.name));

export const CONTACT = {
  phone: "+1 704 333 1234",
  phoneHref: "tel:+17043331234",
  email: "info@aboderental.com",
  address: "500 S College St, Charlotte, NC 28202",
};

// Lets the home-page mini form hand its values to the rental analysis form without putting them in the URL.
export const PREFILL_KEY = "abode:analysis-prefill";
