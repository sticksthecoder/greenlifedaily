'use client';

/**
 * VehiclesPageContent — client-side filter state, vehicle grid, and quote form.
 *
 * Requirements: 9.2, 9.3, 9.4, 9.5, 9.6
 */

import { useCallback, useMemo, useState } from 'react';
import VehicleCard from '@/components/shared/VehicleCard';
import QuoteForm from '@/components/shared/QuoteForm';
import QuoteFormHeader from '@/components/shared/QuoteFormHeader';
import VehicleFilter from '@/components/vehicles/VehicleFilter';
import VehicleFilterErrorBoundary from '@/components/vehicles/VehicleFilterErrorBoundary';
import type { Vehicle } from '@/data/vehicles';
import {
  filterVehiclesByCategory,
  type VehicleFilterCategory,
} from '@/lib/vehicle-filter';

export interface VehiclesPageContentProps {
  vehicles: Vehicle[];
  initialCategory: VehicleFilterCategory;
}

export default function VehiclesPageContent({
  vehicles,
  initialCategory,
}: VehiclesPageContentProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<VehicleFilterCategory>(initialCategory);
  const [prefilledVehicle, setPrefilledVehicle] = useState<string | undefined>(
    undefined,
  );

  const filteredVehicles = useMemo(
    () => filterVehiclesByCategory(vehicles, selectedCategory),
    [vehicles, selectedCategory],
  );

  const handleEnquire = useCallback((vehicleName: string) => {
    setPrefilledVehicle(vehicleName);
    const quoteForm = document.getElementById('quote-form');
    quoteForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <VehicleFilterErrorBoundary category={selectedCategory}>
        <VehicleFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </VehicleFilterErrorBoundary>

      {filteredVehicles.length > 0 ? (
        <ul
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          aria-label={
            selectedCategory === 'All'
              ? 'All vehicles'
              : `Vehicles for ${selectedCategory}`
          }
        >
          {filteredVehicles.map((vehicle) => (
            <li key={vehicle.id}>
              <VehicleCard vehicle={vehicle} onEnquire={handleEnquire} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl border border-charcoal-200 bg-white px-6 py-10 text-center">
          <p className="text-base text-charcoal-500">
            No vehicles are currently listed for{' '}
            <span className="font-semibold text-charcoal">{selectedCategory}</span>
            . Please enquire — we may still have suitable options available.
          </p>
        </div>
      )}

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
