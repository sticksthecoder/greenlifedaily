'use client';

/**
 * FeaturedVehiclesSection — displays a curated grid of featured vehicles.
 *
 * Requirements: 2.1, 2.3, 2.4, 2.5, 2.6, 2.7
 */

import { useState, useCallback } from 'react';
import Link from 'next/link';
import VehicleCard from '@/components/shared/VehicleCard';
import QuoteForm from '@/components/shared/QuoteForm';
import QuoteFormHeader from '@/components/shared/QuoteFormHeader';
import { featuredVehicles } from '@/data/vehicles';

export default function FeaturedVehiclesSection() {
  const [prefilledVehicle, setPrefilledVehicle] = useState<string | undefined>(
    undefined,
  );

  /** Called when the user clicks "Enquire" on a VehicleCard */
  const handleEnquire = useCallback((vehicleName: string) => {
    setPrefilledVehicle(vehicleName);
    // Scroll to the quote form smoothly
    const el = document.getElementById('quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section
      id="featured-vehicles"
      aria-labelledby="featured-vehicles-heading"
      className="bg-charcoal-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
            Our Fleet
          </p>
          <h2
            id="featured-vehicles-heading"
            className="mb-4 text-charcoal"
          >
            Featured Vehicles
          </h2>
          <p className="mx-auto max-w-xl text-charcoal-400">
            A selection of our most popular premium vehicles. Each one is
            meticulously maintained and ready for your next occasion.
          </p>
        </div>

        {/* Vehicle grid — 1-col (≤768px), 2-col (769–1024px), 3-col (>1024px) */}
        {/* Req 2.5, 2.6, 2.7 */}
        <ul
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Featured vehicles"
        >
          {featuredVehicles.map((vehicle) => (
            <li key={vehicle.id}>
              <VehicleCard vehicle={vehicle} onEnquire={handleEnquire} />
            </li>
          ))}
        </ul>

        {/* "More vehicles available" notice (Req 2.4) */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-green-50 px-6 py-6 text-center">
          <p className="mx-auto mb-4 max-w-2xl text-center text-base text-charcoal-500">
            <span className="font-semibold text-charcoal">
              More vehicles available.
            </span>{' '}
            Our full fleet is broader than what&apos;s showcased here. If you
            have a specific vehicle or requirements in mind, reach out and
            we&apos;ll find the perfect match.
          </p>
          <Link
            href="/vehicles"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-green-600 px-6 py-2.5 text-sm font-semibold text-green-700 transition-colors duration-200 hover:bg-green-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            View All Vehicles
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              />
            </svg>
          </Link>
        </div>

        {/* Quote Form (Req 2.3 — pre-populated with vehicle name) */}
        <div
          id="quote-form"
          className="mt-16 scroll-mt-24 rounded-2xl bg-white p-6 shadow-md ring-1 ring-charcoal-100 sm:p-10"
          aria-label="Request a vehicle hire quote"
        >
          <QuoteFormHeader as="h3" />
          <QuoteForm prefilledVehicle={prefilledVehicle} />
        </div>
      </div>
    </section>
  );
}
