export const HOTEL_BRAND = {
  name: "Swiss Inn Nexus Hotel",
  tagline: "Future Digital Experience Concept",
  location: "Gerji Mebrathaile Street, Bole, Addis Ababa, Ethiopia",
  philosophy: "Swiss Inn Nexus Hotel offers a seamless blend of Ethiopian hospitality and future-ready digital experiences. Located just minutes from Bole International Airport, our 4-star sanctuary provides 151 guest rooms, vibrant dining options, and premium conference facilities.",
  contact: {
    phone: "+251 11 646 6868",
    email: "reservations@nexusaddis.net",
    address: "Gerji Mebrathaile Street, Bole, Addis Ababa, Ethiopia",
  },
  social: {
    instagram: "https://instagram.com/swissinnnexus",
    facebook: "https://facebook.com/swissinnnexus",
    twitter: "https://twitter.com/swissinnnexus",
  }
};

export type RoomType = {
  id: string;
  slug: string;
  name: string;
  category: "Room" | "Suite" | "Penthouse";
  description: string;
  size: string; // sqm
  capacity: string;
  floor: string;
  basePrice: number;
  features: string[];
  images: string[];
  view: string;
  cancellation: string;
  breakfast: string;
  conditions: string;
};

export const ROOMS: RoomType[] = [
  {
    id: "deluxe-king",
    slug: "deluxe-king",
    name: "Deluxe King Room",
    category: "Room",
    description: "Designed for business travelers and short-stay visitors. Features a plush king bed, an ergonomic work desk, a rainfall shower, and floor-to-ceiling windows overlooking the Bole business district.",
    size: "36 m²",
    capacity: "2 Adults",
    floor: "Floors 2–5",
    basePrice: 195,
    view: "City / Bole District View",
    features: ["Rainfall Shower", "Ergonomic Workstation", "Complimentary High-Speed Wi-Fi", "Ethiopian Coffee Press"],
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop"
    ],
    cancellation: "Free cancellation up to 24 hours prior to check-in.",
    breakfast: "Complimentary traditional Ethiopian & continental breakfast buffet.",
    conditions: "Guaranteed check-in at 14:00, checkout at 12:00."
  },
  {
    id: "deluxe-twin",
    slug: "deluxe-twin",
    name: "Deluxe Twin Room",
    category: "Room",
    description: "Sophisticated and functional accommodation featuring twin beds, a writing desk, and high-speed fiber internet. Ideal for conference attendees and corporate delegates visiting the nearby UNECA headquarters.",
    size: "38 m²",
    capacity: "2 Adults",
    floor: "Floors 2–5",
    basePrice: 210,
    view: "Bole Skyline View",
    features: ["Two Twin Beds", "High-Speed Fiber Wi-Fi", "Integrated USB Charging Hubs", "Complimentary Water Bottling"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200&auto=format&fit=crop"
    ],
    cancellation: "Free cancellation up to 24 hours prior to check-in.",
    breakfast: "Complimentary breakfast buffet included.",
    conditions: "Guaranteed check-in at 14:00, checkout at 12:00."
  },
  {
    id: "executive-business",
    slug: "executive-business",
    name: "Executive Business Room",
    category: "Room",
    description: "Located on higher floors, this room provides executive privileges, including exclusive access to the Skylight Club Lounge, priority check-in, and complimentary airport shuttle services.",
    size: "42 m²",
    capacity: "2 Adults",
    floor: "Floors 6–8",
    basePrice: 285,
    view: "Panoramic City View",
    features: ["Access to Club Lounge", "Complimentary Airport Transfers", "Workstation with Printer Interface", "Espresso Machine"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop"
    ],
    cancellation: "Free cancellation up to 24 hours prior to check-in.",
    breakfast: "Executive Lounge breakfast buffet & evening cocktails.",
    conditions: "Priority check-in & late checkout (subject to availability)."
  },
  {
    id: "executive-suite",
    slug: "executive-suite",
    name: "Executive Suite",
    category: "Suite",
    description: "A spacious residence featuring a separated living lounge, dining table, and double vanity bath. Perfect for diplomatic delegates and families seeking refined luxury in Addis Ababa.",
    size: "72 m²",
    capacity: "3 Adults",
    floor: "Floors 8–10",
    basePrice: 420,
    view: "Addis Ababa Highland Hills",
    features: ["Separated Living Lounge", "Double Vanity Bathroom", "Skylight Lounge Privileges", "Private Mini-bar"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop"
    ],
    cancellation: "Free cancellation up to 48 hours prior to check-in.",
    breakfast: "Complimentary Room-Service breakfast or Club Lounge access.",
    conditions: "Complimentary luxury shuttle and express laundry."
  },
  {
    id: "diplomatic-suite",
    slug: "diplomatic-suite",
    name: "Diplomatic Suite",
    category: "Suite",
    description: "Optimized for global diplomats and delegation leaders. Features bulletproof window glazing, a private meeting desk for confidential briefings, a separate service entrance, and 24/7 dedicated butler support.",
    size: "110 m²",
    capacity: "3 Adults",
    floor: "Floors 11–12",
    basePrice: 750,
    view: "Addis Ababa Diplomatic Hub",
    features: ["Secured Bulletproof Glazing", "Private Meeting Desk", "Service Entrance", "24/7 Butler Service"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop"
    ],
    cancellation: "Free cancellation up to 72 hours prior to check-in.",
    breakfast: "Bespoke in-room chef prepared breakfast and VIP airport fast-track.",
    conditions: "Access to private diplomatic briefing room included."
  },
  {
    id: "presidential-suite",
    slug: "presidential-suite",
    name: "Presidential Penthouse",
    category: "Penthouse",
    description: "The peak of luxury in East Africa. Comprises a bulletproof master bedroom, an expansive dining hall, a full private kitchen, a state-of-the-art boardroom, and a dedicated culinary and butler detail with VIP airport motorcade transfers.",
    size: "240 m²",
    capacity: "4 Adults",
    floor: "Penthouse Level",
    basePrice: 2400,
    view: "360° Skyline Views",
    features: ["Private Boardroom", "Bulletproof Master Bedroom", "VIP Airport Motorcade Escort", "Fully Equipped Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop"
    ],
    cancellation: "Non-refundable. Requires direct wire-transfer validation.",
    breakfast: "Private chef prepared breakfast, lunch, and dinner.",
    conditions: "Special protocol validation and security check required."
  }
];

export const DINING = [
  {
    name: "Ta'em Traditional",
    concept: "Ethiopian Heritage Dining",
    chef: "Tigist Hailemariam",
    description: "A rich culinary exploration of traditional Ethiopian cooking. Enjoy freshly baked injera, slow-cooked doro wat, and kitfo, completed by an authentic live Ethiopian coffee ceremony.",
    hours: "12:00 - 23:00",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "The Grand Pavilion",
    concept: "East African Fine Dining",
    chef: "Jean-Marc Dubois",
    description: "Blending contemporary European culinary methods with vibrant East African spices and local ingredients. Features high-ceiling glass architecture with views of the hotel gardens.",
    hours: "06:00 - 23:00",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop"
  }
];

export const MEETING_SPACES = [
  {
    name: "The Skylight Grand Ballroom",
    capacity: "2,000 Delegates",
    area: "2,200 m²",
    description: "The largest pillarless ballroom in East Africa, perfectly configured for international diplomatic summits, wedding banquets, and major global exhibitions.",
    features: ["Pillarless Architecture", "VIP Holding Lounges", "Live Video Translation System", "Direct Vehicle Entry Access"]
  },
  {
    name: "Diplomatic Boardroom Suite",
    capacity: "24 Delegates",
    area: "80 m²",
    description: "Fully secured soundproof boardroom designed for confidential executive consultations, embassy sessions, or private corporate board meetings.",
    features: ["Encrypted Video Conferencing", "Private Refreshment Lounge", "Biometric Access Security"]
  }
];

export const BUSINESS_RULES = {
  taxRate: 0.15, // 15% Ethiopian VAT
  serviceCharge: 0.10, // 10% Service Charge
  checkInTime: "14:00",
  checkOutTime: "12:00",
  cancellationPolicy: "Standard room cancellation is free up to 24 hours prior to scheduled arrival date.",
};
