/**
 * VehicleCard component — displays a vehicle's key details and an enquiry CTA.
 *
 * Validates: Requirements 2.2, 2.3, 9.2, 9.3, 14.7, 18.1
 */

import Image from 'next/image';
import type { Vehicle } from '@/data/vehicles';

export interface VehicleCardProps {
  vehicle: Vehicle;
  onEnquire?: (vehicleName: string) => void;
}

/**
 * Icons for vehicle specs — inline SVG kept small to avoid extra image requests.
 */
function PassengerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function TransmissionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM18 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM8 18v-4.5H6L10 6v5h2l-4 7z" />
    </svg>
  );
}

/**
 * VehicleCard — responsive card showing vehicle photo, specs, and enquiry CTA.
 */
export default function VehicleCard({ vehicle, onEnquire }: VehicleCardProps) {
  const {
    name,
    category,
    passengerCapacity,
    transmission,
    fuelType,
    images,
    altText,
  } = vehicle;

  const imageSrc = images[0] ?? '/images/vehicles/placeholder.webp';

  function handleEnquire() {
    onEnquire?.(name);
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl border border-charcoal-100">
      {/* Vehicle image */}
      <div className="relative w-full aspect-[16/10] bg-charcoal-100">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {category}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Vehicle name */}
        <h3 className="text-lg font-semibold text-charcoal leading-snug">
          {name}
        </h3>

        {/* Specs grid */}
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 text-sm text-charcoal-500" aria-label={`${name} specifications`}>
          {/* Passenger capacity */}
          <li className="flex items-center gap-1.5">
            <span className="text-green-600">
              <PassengerIcon />
            </span>
            <span>
              <span className="font-medium text-charcoal">{passengerCapacity}</span>
              {' '}
              {passengerCapacity === 1 ? 'Passenger' : 'Passengers'}
            </span>
          </li>

          {/* Transmission */}
          <li className="flex items-center gap-1.5">
            <span className="text-green-600">
              <TransmissionIcon />
            </span>
            <span>{transmission}</span>
          </li>

          {/* Fuel type */}
          <li className="flex items-center gap-1.5">
            <span className="text-green-600">
              <FuelIcon />
            </span>
            <span>{fuelType}</span>
          </li>
        </ul>

        {/* Enquire CTA — pushed to bottom of card */}
        <div className="mt-auto pt-2">
          <button
            type="button"
            onClick={handleEnquire}
            className="w-full rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:bg-green-800"
            aria-label={`Enquire about the ${name}`}
          >
            Enquire
          </button>
        </div>
      </div>
    </article>
  );
}
