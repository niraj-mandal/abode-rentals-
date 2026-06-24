export interface Property {
  id: string;
  title: string;
  location: string;
  price: number; // in USD per month
  description: string;
  image: string; // Unsplash Image ID
  beds: number;
  baths: number;
  size: number; // sq ft
  rating: number;
  category: "Mansion" | "Penthouse" | "Villa" | "Chalet" | "Beach House";
  features: string[];
  coordinates: { x: number; y: number }; // Percentage offsets for mock map layout (0-100)
}

export const properties: Property[] = [
  {
    id: "myers-park-estate",
    title: "The Myers Park Estate",
    location: "Myers Park, Charlotte, NC",
    price: 12500,
    description: "An architectural masterpiece in Charlotte's historic Myers Park. This estate offers unparalleled privacy, a custom salt-water plunge pool, a state-of-the-art chef's kitchen, and an expansive covered loggia with a stone fireplace. Fully integrated with smart-home automation and professional property oversight.",
    image: "1600596542815-ffad4c1539a9",
    beds: 5,
    baths: 6,
    size: 6800,
    rating: 4.95,
    category: "Mansion",
    features: ["Saltwater Pool", "Chef's Kitchen", "Smart Home Tech", "Covered Loggia", "Wine Cellar"],
    coordinates: { x: 35, y: 52 }
  },
  {
    id: "plaza-penthouse",
    title: "The Plaza Penthouse",
    location: "Plaza Midwood, Charlotte, NC",
    price: 8200,
    description: "A gorgeous duplex penthouse overlooking the Uptown Charlotte skyline. Featuring towering timber ceilings, floor-to-ceiling windows, custom quartz finishes, and a private 1,200 sq ft rooftop terrace with an outdoor kitchen. Complete with automated access and secure underground parking.",
    image: "1512917774080-9991f1c4c750",
    beds: 3,
    baths: 3.5,
    size: 3200,
    rating: 4.98,
    category: "Penthouse",
    features: ["Rooftop Terrace", "Skyline Views", "Secure Parking", "Automated Entry", "Quartz Countertops"],
    coordinates: { x: 55, y: 38 }
  },
  {
    id: "lake-norman-sanctuary",
    title: "Lake Norman Sanctuary",
    location: "Mooresville, NC",
    price: 15000,
    description: "Experience luxury waterfront living on the shores of Lake Norman. This modern estate features a private deep-water dock, an infinity-edge pool, a lakeside fire pit, and double-tier sun decks. Large glass walls open directly to provide gorgeous sunset views across the water.",
    image: "1600607687939-ce8a6c25118c",
    beds: 4,
    baths: 4.5,
    size: 7400,
    rating: 4.92,
    category: "Villa",
    features: ["Waterfront View", "Private Yacht Slip", "Infinity Pool", "Sunset Decks", "Lakeside Fire Pit"],
    coordinates: { x: 42, y: 22 }
  },
  {
    id: "dilworth-carriage-house",
    title: "Dilworth Carriage House",
    location: "Dilworth, Charlotte, NC",
    price: 5800,
    description: "A meticulously restored historic carriage house in the heart of Dilworth. Featuring oak hardwood flooring, exposed brick walls, and modern designer lighting. Includes a private courtyard patio and dedicated workspace, making it ideal for corporate professionals.",
    image: "1580587771525-78b9dba3b914",
    beds: 2,
    baths: 2,
    size: 2100,
    rating: 4.96,
    category: "Villa",
    features: ["Historic Courtyard", "Exposed Brick", "Hardwood Floors", "Corporate Setup", "Proximity to Uptown"],
    coordinates: { x: 38, y: 58 }
  },
  {
    id: "eastover-manor",
    title: "The Eastover Manor",
    location: "Eastover, Charlotte, NC",
    price: 18500,
    description: "An elegant, traditional brick manor situated in Eastover, Charlotte's premier luxury neighborhood. Surrounded by manicured English gardens, this residence offers formal dining, a detached guest house, a professional gym, and supreme privacy behind automated gates.",
    image: "1600566753376-12c8ab7fb75b",
    beds: 6,
    baths: 7.5,
    size: 9200,
    rating: 4.99,
    category: "Mansion",
    features: ["Detached Guest House", "Gated Security", "Formal Gardens", "Private Gym", "Formal Dining Room"],
    coordinates: { x: 48, y: 62 }
  },
  {
    id: "southpark-penthouse",
    title: "SouthPark Skyline Penthouse",
    location: "SouthPark, Charlotte, NC",
    price: 6500,
    description: "A sleek, modern penthouse located in SouthPark's shopping and dining district. Offering high ceilings, motorized drapery, premium Sub-Zero appliances, and floor-to-ceiling windows. Residents enjoy concierge services and access to a heated rooftop pool.",
    image: "1613490493576-7fde63acd811",
    beds: 2,
    baths: 2.5,
    size: 2400,
    rating: 4.89,
    category: "Penthouse",
    features: ["Sub-Zero Appliances", "Motorized Drapery", "Rooftop Pool Access", "Concierge Services", "Walkable Location"],
    coordinates: { x: 50, y: 72 }
  }
];
