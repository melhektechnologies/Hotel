import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.6em] text-accent font-bold mb-4 block">Legal</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 10, 2026</p>
        </div>
        <div className="prose prose-lg max-w-none space-y-10 text-foreground">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">When you engage with Skylight Hotel Addis Ababa, we collect information to provide you with the highest level of personalised service. This may include your name, contact details, passport information, payment details, preferences, and feedback. We treat all personal information with the utmost discretion and confidentiality.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">Your information is used solely to facilitate your reservation, personalise your stay, communicate with you about our services, and improve the quality of our hospitality. We never sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif">3. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">We employ industry-leading encryption and security protocols to protect your personal information. All payment transactions are processed through PCI-DSS compliant systems. Our staff are trained in data protection and bound by strict confidentiality agreements.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif">4. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">Our website uses cookies to enhance your browsing experience and provide personalised content. You may control cookie settings through your browser preferences. Essential cookies required for website functionality cannot be disabled.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact our Data Protection Officer at privacy@addisskylighthotel.com. We aim to respond to all legitimate requests within 30 days.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif">6. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">For any privacy-related enquiries, please contact us at privacy@addisskylighthotel.com or write to Skylight Hotel Addis Ababa, Bole Airport Area, Airport Road, Addis Ababa, Ethiopia.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
