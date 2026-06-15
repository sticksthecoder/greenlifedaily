import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import StickyQuoteCta from "@/components/shared/StickyQuoteCta";
import "./globals.css";

// Load Inter from Google Fonts via next/font (Requirement 18.3 — modern sans-serif)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Greenlife Daily | Premium Vehicle Hire South Africa",
    template: "%s | Greenlife Daily",
  },
  description:
    "Greenlife Daily offers premium vehicle hire across South Africa for weddings, matric dances, corporate events, airport transfers, VIP transport, and film productions.",
  metadataBase: new URL("https://www.greenlifedaily.co.za"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.greenlifedaily.co.za",
    siteName: "Greenlife Daily",
    title: "Greenlife Daily | Premium Vehicle Hire South Africa",
    description:
      "Premium vehicle hire for weddings, matric dances, corporate events, airport transfers, and VIP transport across South Africa.",
    images: [
      {
        url: "/images/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Greenlife Daily — Premium Vehicle Hire South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenlife Daily | Premium Vehicle Hire South Africa",
    description:
      "Premium vehicle hire for weddings, matric dances, corporate events, and VIP transport across South Africa.",
    images: ["/images/og-default.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col overflow-x-hidden antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-green-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Navbar />
        <div className="min-w-0 flex-1 overflow-x-clip">{children}</div>
        <Footer />
        <WhatsAppButton />
        <StickyQuoteCta />
      </body>
    </html>
  );
}
