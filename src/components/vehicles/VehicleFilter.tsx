'use client';

/**
 * VehicleFilter — client-side category selector for the Vehicles page.
 *
 * Requirements: 9.5, 9.6, 9.7
 */

import { useEffect } from 'react';
import type { VehicleFilterCategory } from '@/lib/vehicle-filter';
import {
  VEHICLE_FILTER_OPTIONS,
  VEHICLE_FILTER_STORAGE_KEY,
  isVehicleFilterCategory,
} from '@/lib/vehicle-filter';

export interface VehicleFilterProps {
  selectedCategory: VehicleFilterCategory;
  onCategoryChange: (category: VehicleFilterCategory) => void;
}

function readStoredCategory(): VehicleFilterCategory | null {
  try {
    const stored = localStorage.getItem(VEHICLE_FILTER_STORAGE_KEY);
    if (stored && isVehicleFilterCategory(stored)) {
      return stored;
    }
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }

  return null;
}

function writeStoredCategory(category: VehicleFilterCategory): void {
  try {
    localStorage.setItem(VEHICLE_FILTER_STORAGE_KEY, category);
  } catch {
    // Ignore write failures in restricted browsing modes.
  }
}

export default function VehicleFilter({
  selectedCategory,
  onCategoryChange,
}: VehicleFilterProps) {
  useEffect(() => {
    const storedCategory = readStoredCategory();
    if (storedCategory && storedCategory !== selectedCategory) {
      onCategoryChange(storedCategory);
    }
    // Run once on mount to restore persisted filter state (Req 9.5).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelect(category: VehicleFilterCategory) {
    writeStoredCategory(category);
    onCategoryChange(category);
  }

  return (
    <div
      role="tablist"
      aria-label="Filter vehicles by service category"
      className="flex flex-wrap gap-2"
    >
      {VEHICLE_FILTER_OPTIONS.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => handleSelect(category)}
            className={[
              'inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
              isSelected
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-charcoal-600 ring-1 ring-charcoal-200 hover:bg-green-50 hover:text-green-700',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
            ].join(' ')}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
