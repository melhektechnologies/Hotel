import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

const packages = [
  {
    name: "Diplomatic Summit Package",
    tag: "Corporate & Embassy",
    nights: 3,
    price: 1850,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    includes: ["Executive Business Room", "Secure Airport Pick-up & S-Class Chauffeur", "24/7 Diplomatic Liaison Access", "Complimentary Briefing Room Access", "Fast-track Security Clearance Assistance", "Dedicated Secretarial Services"],
  },
  {
    name: "Ethiopian Cultural Heritage Immersion",
    tag: "Cultural & Tourism",
    nights: 4,
    price: 2200,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop",
    includes: ["Executive Suite", "Traditional Coffee Ceremony Experience", "Private Tour of Addis Ababa Landmarks", "Traditional Dinner & Cultural Dance Show", "Bespoke Ethio-Coffee Spa Scrub", "Daily Highland Gourmet Breakfast"],
  },
  {
    name: "Weekend Executive Retreat",
    tag: "Leisure & Wellness",
    nights: 2,
    price: 950,
    image: "https://images.unsplash.com/photo-1544161515-4ae6ce6ea8a8?q=80&w=1200&auto=format&fit=crop",
    includes: ["Deluxe King Room", "Early Check-in & Late Checkout", "Unlimited Spa & Sauna Access", "Ethio-Herbal Massage Session", "Sunset Skylight Rooftop Cocktail", "Premium Airport Transfer"],
  },
];

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 text-center px-6">
        <span className="text-xs uppercase tracking-[0.6em] text-accent font-bold mb-6 block">Exclusive Offers</span>
        <h1 className="text-5xl md:text-7xl font-serif mb-8">Curated Packages</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
          We have crafted a collection of immersive packages that weave together our finest experiences into one seamless, extraordinary journey.
        </p>
      </section>

      {/* Packages */}
      <section className="pb-32 px-6 md:px-12 max-w-screen-xl mx-auto space-y-20">
        {packages.map((pkg, index) => (
          <div key={pkg.name} className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-stretch`}>
            <div className="w-full md:w-1/2 relative min-h-[400px] overflow-hidden group">
              <Image
                src={pkg.image}
                alt={pkg.name}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute top-8 left-8 bg-accent text-white text-[10px] uppercase tracking-widest font-bold px-6 py-3">
                {pkg.tag}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-8 py-4">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-50">{pkg.nights} nights from</span>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-5xl font-serif">${pkg.price.toLocaleString()}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-50">per couple</span>
                  </div>
                </div>
                <h2 className="text-4xl font-serif">{pkg.name}</h2>
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-widest text-accent font-bold">Package Includes</p>
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-foreground text-background hover:bg-accent transition-all duration-500 text-xs uppercase tracking-widest font-bold">
                  Book This Package
                </button>
                <button className="px-8 py-4 border border-border hover:border-accent transition-colors text-xs uppercase tracking-widest font-bold">
                  Enquire
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Promo Code Banner */}
      <section className="py-20 bg-foreground text-background text-center px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-3xl font-serif">Inner Circle Members Save More</h3>
          <p className="opacity-70 leading-relaxed">
            Join our loyalty programme and unlock exclusive member-only rates, early access to limited packages, and bespoke surprise amenities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-8">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-accent placeholder:opacity-40"
            />
            <button className="bg-accent text-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-500">
              Join Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
