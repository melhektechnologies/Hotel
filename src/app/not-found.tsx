import Link from "next/link";
import Image from "next/image";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=2070&auto=format&fit=crop"
          alt="404 Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.8em] text-accent font-bold mb-8">We Seem To Have Lost You</p>
        <h1 className="text-[120px] md:text-[200px] font-serif leading-none opacity-20 mb-0">404</h1>
        <h2 className="text-4xl md:text-6xl font-serif -mt-8 md:-mt-12 mb-8">Page Not Found</h2>
        <p className="text-lg opacity-70 font-light leading-relaxed mb-12">
          It seems the page you are looking for has drifted with the tide. Allow us to guide you back to the sanctuary.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 px-10 py-5 bg-accent text-white text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-500"
          >
            <Home size={16} />
            Return Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-3 px-10 py-5 border border-white/30 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-all duration-500"
          >
            <ArrowLeft size={16} />
            Contact Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
