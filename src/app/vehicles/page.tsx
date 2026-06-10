/**
 * Vehicles Page — browse all showcased vehicles.
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4, 14.1, 14.2, 14.4
 */

import type { Metadata } from 'next';
import VehiclesPageContent from '@/components/vehicles/VehiclesPageContent';
import { vehicles } from '@/data/vehicles';

export const metadata: Metadata = {
  // Title: 51 chars (Req 14.1)
  title: 'Our Premium Vehicle Fleet for Hire | Greenlife Daily',
  // Description: 158 chars (Req 14.2)
  description:
    "Browse Greenlife Daily's premium fleet for weddings, matric dances, executive transport, airport transfers, and VIP hire. Enquire about your perfect vehicle.",
  openGraph: {
    title: 'Our Premium Vehicle Fleet for Hire | Greenlife Daily',
    description:
      "Browse Greenlife Daily's premium fleet for weddings, matric dances, executive transport, airport transfers, and VIP hire. Enquire about your perfect vehicle.",
    url: 'https://www.greenlifedaily.co.za/vehicles',
    siteName: 'Greenlife Daily',
    images: [
      {
        url: '/images/og-vehicles.webp',
        width: 1200,
        height: 630,
        alt: 'Greenlife Daily premium vehicle fleet available for hire',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Premium Vehicle Fleet for Hire | Greenlife Daily',
    description:
      "Browse Greenlife Daily's premium fleet for weddings, matric dances, executive transport, airport transfers, and VIP hire.",
    images: ['/images/og-vehicles.webp'],
  },
  alternates: {
    canonical: 'https://www.greenlifedaily.co.za/vehicles',
  },
};

export default function VehiclesPage() {
  return (
    <main id="main-content">
      <section
        aria-labelledby="vehicles-page-heading"
        className="bg-charcoal-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
              Our Fleet
            </p>
            <h1 id="vehicles-page-heading" className="mb-4 text-charcoal">
              Premium Vehicles for Every Occasion
            </h1>
            <p className="text-charcoal-400">
              Explore our full selection of luxury sedans, SUVs, and executive
              transport vehicles. Enquire about availability for your date.
            </p>
          </div>

          <VehiclesPageContent vehicles={vehicles} />
        </div>
      </section>
    </main>
  );
}
