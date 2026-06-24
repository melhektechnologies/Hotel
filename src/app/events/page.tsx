import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

const venues = [
  {
    name: "The Skylight Grand Ballroom",
    capacity: "Up to 2,000 delegates",
    type: "Diplomatic Summits & Galas",
    area: "2,200 sqm",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    features: ["Pillarless Architecture", "VIP Holding Lounges", "Live Video Translation System", "Direct Vehicle Entry Access"],
  },
  {
    name: "Diplomatic Boardroom Suite",
    capacity: "Up to 24 delegates",
    type: "Executive Sessions & Briefings",
    area: "80 sqm",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    features: ["Biometric Access Security", "Encrypted Video Conferencing", "Private Refreshment Lounge", "Dedicated Protocol Detail"],
  },
  {
    name: "The Garden Terrace Lobby",
    capacity: "Up to 300 guests",
    type: "Receptions & Cocktails",
    area: "450 sqm",
    image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=1200&auto=format&fit=crop",
    features: ["Landscaped gardens view", "Ethio-coffee ritual setups", "Bespoke catering detail", "Security-cleared perimeters"],
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[75vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop"
          alt="Events Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <span className="text-xs uppercase tracking-[0.8em] mb-6 opacity-80">Exceptional Occasions</span>
          <h1 className="text-5xl md:text-8xl font-serif leading-tight mb-8">Meetings &<br /><span className="italic">Events</span></h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-8">Every Occasion, Elevated</h2>
        <p className="text-muted-foreground leading-relaxed text-lg font-light">
          From secured diplomatic summits for global heads of state to grand banquets and high-profile corporate exhibitions, Swiss Inn Nexus Hotel provides East Africa's premier hosting infrastructure.
        </p>
      </section>

      {/* Venues */}
      <section className="pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 gap-20">
          {venues.map((venue, index) => (
            <div key={venue.name} className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}>
              <div className="w-full md:w-3/5 relative aspect-video overflow-hidden group">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>
              <div className="w-full md:w-2/5 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{venue.type}</span>
                  <div className="h-[1px] w-8 bg-accent/30" />
                  <span className="text-[10px] uppercase tracking-widest opacity-50">{venue.area}</span>
                </div>
                <h2 className="text-4xl font-serif">{venue.name}</h2>
                <p className="text-muted-foreground font-light">
                  Capacity: <span className="text-foreground font-medium">{venue.capacity}</span>
                </p>
                <ul className="space-y-3 pt-4 border-t border-border">
                  {venue.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 px-10 py-4 bg-foreground text-background hover:bg-accent transition-all text-xs uppercase tracking-widest font-bold">
                  Request a Proposal
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wedding CTA */}
      <section className="relative py-40 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=2070&auto=format&fit=crop"
          alt="Weddings"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-6 space-y-8">
          <h2 className="text-5xl md:text-7xl font-serif italic">Your Grand Celebration</h2>
          <p className="max-w-xl mx-auto opacity-80 font-light leading-relaxed">
            Host your wedding banquet in the grandest ballroom in East Africa. Our dedicated events planning team orchestrates every detail, from cultural coffee rituals to custom culinary menus.
          </p>
          <button className="px-14 py-5 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-all duration-500">
            Begin Planning
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
