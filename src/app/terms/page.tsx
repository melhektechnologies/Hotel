import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.6em] text-accent font-bold mb-4 block">Legal</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: May 10, 2026</p>
        </div>
        <div className="space-y-10 text-foreground">
          {[
            {
              title: "1. Reservations & Booking",
              body: "All reservations are subject to availability and confirmation by Skylight Hotel Addis Ababa. A valid credit card is required to secure all bookings. Full payment or a deposit as specified at the time of booking will be required to confirm your reservation. Rates are quoted per room or suite per night and are subject to 10% service charge, 15% VAT, and applicable municipal taxes.",
            },
            {
              title: "2. Cancellation Policy",
              body: "Cancellation policies vary by room category. Standard rooms (Deluxe) may be cancelled without charge up to 24 hours prior to the scheduled check-in time. Executive and Diplomatic suites require 48 to 72 hours notice, while Presidential Penthouses are non-refundable. Cancellations made outside these windows or no-shows will be charged the specified rate.",
            },
            {
              title: "3. Check-In & Check-Out",
              body: "Check-in time is 2:00 PM and check-out is at 12:00 noon. Early check-in and late check-out may be arranged through the Protocol Desk, subject to availability, and may incur additional charges. A valid passport or government ID is required upon check-in.",
            },
            {
              title: "4. Guest Conduct & Security",
              body: "Skylight Hotel is committed to maintaining a secure, respectful, and professional environment for all guests, diplomats, and corporate delegates. We reserve the right to request the departure of any guest whose conduct is deemed disruptive, non-compliant with security measures, or harmful to staff and other guests.",
            },
            {
              title: "5. Sustainability & Local Sourcing",
              body: "As part of our commitment to sustainable urban development, we minimize plastic usage and source fresh produce from local agricultural cooperatives. Guests are encouraged to participate in our energy conservation initiatives and respect our landscaped hotel grounds.",
            },
            {
              title: "6. Liability",
              body: "Skylight Hotel accepts no responsibility for loss, theft, or damage to personal property not secured in in-room safes. Guests participate in local excursions, transportation transfers, and fitness facilities at their own risk.",
            },
          ].map((section) => (
            <div key={section.title} className="space-y-4">
              <h2 className="text-2xl font-serif">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
