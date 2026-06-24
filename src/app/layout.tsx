import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import LoadingScreen from "@/components/layout/LoadingScreen";
import ClientSideUI from "@/components/layout/ClientSideUI";
import AIConcierge from "@/components/AIConcierge";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FDFCFB', // Matches our luxury background
};

export const metadata: Metadata = {
  metadataBase: new URL('https://nexusaddis.net'),
  title: {
    default: "Swiss Inn Nexus Hotel | Future Digital Experience Concept",
    template: "%s | Swiss Inn Nexus Hotel",
  },
  description: "Swiss Inn Nexus Hotel Addis Ababa. A modern 4-star experience featuring 151 suites, diverse culinary options, and premier conference facilities in Bole.",
  keywords: ["swiss inn nexus hotel", "nexus hotel addis ababa", "luxury hotel addis ababa", "bole district hotel", "meetings events addis ababa"],
  authors: [{ name: "Melhek Technologies" }],
  creator: "Melhek Technologies",
  publisher: "Melhek Technologies",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexusaddis.net",
    siteName: "Swiss Inn Nexus Hotel",
    title: "Swiss Inn Nexus Hotel | Future Digital Experience Concept",
    description: "Swiss Inn Nexus Hotel Addis Ababa. A modern 4-star experience featuring 151 suites, diverse culinary options, and premier conference facilities.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Swiss Inn Nexus Hotel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiss Inn Nexus Hotel | Future Digital Experience Concept",
    description: "Swiss Inn Nexus Hotel Addis Ababa. A modern 4-star experience featuring 151 suites, diverse culinary options, and premier conference facilities.",
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth selection:bg-accent selection:text-white">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}>
        <AppProvider>
          <LoadingScreen />
          <SmoothScroll>
            {children}
            <ClientSideUI />
          </SmoothScroll>
          <AIConcierge />
        </AppProvider>
      </body>
    </html>
  );
}
