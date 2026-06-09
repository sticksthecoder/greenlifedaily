/**
 * Vehicles Page — browse all showcased vehicles with category filtering.
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.7, 14.1, 14.2, 14.4
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import VehiclesPageContent from '@/components/vehicles/VehiclesPageContent';
import { serviceCategories } from '@/data/services';
import { vehicles } from '@/data/vehicles';
import {
  parseVehicleFilterCategory,
  vehicleFilterToSearchParam,
} from '@/lib/vehicle-filter';

interface VehiclesPageProps {
  searchParams?: {
    category?: string;
  };
}

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

export default function VehiclesPage({ searchParams }: VehiclesPageProps) {
  const initialCategory = parseVehicleFilterCategory(searchParams?.category);

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
              Explore our curated selection of luxury sedans, SUVs, and executive
              transport vehicles. Filter by service category to find the right fit,
              then enquire about availability for your date.
            </p>
          </div>

          <noscript>
            <div className="mb-8 rounded-2xl border border-charcoal-200 bg-white p-5">
              <p className="mb-3 text-sm font-semibold text-charcoal">
                Filter by category:
              </p>
              <ul className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/vehicles"
                    className="inline-flex min-h-[44px] items-center rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white"
                  >
                    All
                  </Link>
                </li>
                {serviceCategories.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/vehicles?category=${vehicleFilterToSearchParam(category)}`}
                      className="inline-flex min-h-[44px] items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal-600 ring-1 ring-charcoal-200 hover:bg-green-50"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </noscript>

          <VehiclesPageContent
            vehicles={vehicles}
            initialCategory={initialCategory}
          />
        </div>
      </section>
    </main>
  );
}
