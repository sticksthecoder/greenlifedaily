'use client';

/**
 * VehiclesPageContent — vehicle grid and quote form.
 */

import { useCallback, useState } from 'react';
import VehicleCard from '@/components/shared/VehicleCard';
import QuoteForm from '@/components/shared/QuoteForm';
import QuoteFormHeader from '@/components/shared/QuoteFormHeader';
import type { Vehicle } from '@/data/vehicles';

export interface VehiclesPageContentProps {
  vehicles: Vehicle[];
}

export default function VehiclesPageContent({
  vehicles,
}: VehiclesPageContentProps) {
  const [prefilledVehicle, setPrefilledVehicle] = useState<string | undefined>(
    undefined,
  );

  const handleEnquire = useCallback((vehicleName: string) => {
    setPrefilledVehicle(vehicleName);
    const quoteForm = document.getElementById('quote-form');
    quoteForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <ul
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        aria-label="All vehicles"
      >
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <VehicleCard vehicle={vehicle} onEnquire={handleEnquire} />
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl border border-green-200 bg-green-50 px-6 py-6 text-center">
        <p className="mx-auto max-w-2xl text-center text-base text-charcoal-500">
          <span className="font-semibold text-charcoal">More vehicles available.</span>{' '}
          Our full fleet extends beyond what is showcased here. Share your
          requirements and we will source the perfect vehicle for your occasion.
        </p>
      </div>

      <div
        id="quote-form"
        className="mt-16 scroll-mt-24 rounded-2xl bg-white p-6 shadow-md ring-1 ring-charcoal-100 sm:p-10"
        aria-label="Request a vehicle hire quote"
      >
        <QuoteFormHeader />
        <QuoteForm prefilledVehicle={prefilledVehicle} />
      </div>
    </>
  );
}
