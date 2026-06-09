/**
 * Home Page — assembles all home-page sections and exports page metadata.
 *
 * Requirements: 14.1, 14.2, 14.3, 14.4, 14.9
 */

import type { Metadata } from 'next';
import { company } from '@/data/company';
import HeroSection from '@/components/home/HeroSection';
import FeaturedVehiclesSection from '@/components/home/FeaturedVehiclesSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FaqSection from '@/components/home/FaqSection';
import FinalCtaSection from '@/components/home/FinalCtaSection';

// ---------------------------------------------------------------------------
// Page Metadata (Req 14.1 — 50–60 char title, Req 14.2 — 150–160 char desc,
//               Req 14.4 — OG tags)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  // Title: 51 chars — within 50–60 char target (Req 14.1)
  title: 'Greenlife Daily | Premium Vehicle Hire South Africa',
  // Description: 157 chars — within 150–160 char target (Req 14.2)
  description:
    'Premium vehicle hire in South Africa for weddings, matric dances, executive transport, airport transfers, VIP escort & film productions. Get a quote today.',
  openGraph: {
    title: 'Greenlife Daily | Premium Vehicle Hire South Africa',
    description:
      'Greenlife Daily offers a curated fleet of luxury vehicles for weddings, corporate events, matric dances, VIP transport & film productions across South Africa.',
    url: 'https://www.greenlifedaily.co.za',
    siteName: 'Greenlife Daily',
    images: [
      {
        url: '/images/og-home.webp',
        width: 1200,
        height: 630,
        alt: 'Greenlife Daily — Premium Vehicle Hire South Africa',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greenlife Daily | Premium Vehicle Hire South Africa',
    description:
      'Greenlife Daily offers a curated fleet of luxury vehicles for weddings, corporate events, matric dances, VIP transport & film productions across South Africa.',
    images: ['/images/og-home.webp'],
  },
  alternates: {
    canonical: 'https://www.greenlifedaily.co.za',
  },
};

// ---------------------------------------------------------------------------
// JSON-LD Structured Data (Req 14.3, 14.9)
// ---------------------------------------------------------------------------

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  url: 'https://www.greenlifedaily.co.za',
  logo: 'https://www.greenlifedaily.co.za/images/logo.webp',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: company.phoneNumber,
    contactType: 'customer service',
    areaServed: 'ZA',
    availableLanguage: 'English',
  },
  sameAs: [
    company.socialMedia.facebook,
    company.socialMedia.instagram,
    company.socialMedia.linkedin,
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: company.name,
  description:
    'Premium vehicle hire company in South Africa offering luxury, executive, wedding, matric dance, airport transfer, VIP escort, and film production vehicle hire.',
  url: 'https://www.greenlifedaily.co.za',
  telephone: company.phoneNumber,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.streetAddress,
    addressLocality: company.suburb,
    addressRegion: company.province,
    postalCode: company.postalCode,
    addressCountry: 'ZA',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Johannesburg',
    },
    {
      '@type': 'City',
      name: 'Pretoria',
    },
    {
      '@type': 'State',
      name: 'Gauteng',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vehicle Hire Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Luxury Vehicle Hire' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Vehicle Hire' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Executive Transport' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Airport Transfers' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Matric Dance Transport' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'VIP Escort Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Rentals' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Music Video Vehicle Hire' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'TV & Film Production Vehicle Hire' } },
    ],
  },
  priceRange: '$$',
  currenciesAccepted: 'ZAR',
  image: 'https://www.greenlifedaily.co.za/images/og-home.webp',
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data (Req 14.3, 14.9) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, localBusinessSchema]),
        }}
      />

      {/* Home page sections in order */}
      <main id="main-content">
        {/* 1. Hero (Req 1.x) */}
        <HeroSection />

        {/* 2. Featured Vehicles + Quote Form (Req 2.x) */}
        <FeaturedVehiclesSection />

        {/* 3. Services Overview (Req 3.x) */}
        <ServicesOverview />

        {/* 4. Why Choose Greenlife Daily (Req 4.x) */}
        <WhyChooseSection />

        {/* 5. Testimonials (Req 5.x) */}
        <TestimonialsSection />

        {/* 6. FAQ (Req 6.x) */}
        <FaqSection />

        {/* 7. Final CTA (Req 7.x) */}
        <FinalCtaSection />
      </main>
    </>
  );
}
