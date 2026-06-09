import type { ServiceCategory } from '@/data/services';
import { serviceCategories } from '@/data/services';
import type { Vehicle } from '@/data/vehicles';

export const VEHICLE_FILTER_STORAGE_KEY = 'greenlife_vehicle_filter';

export type VehicleFilterCategory = 'All' | ServiceCategory;

export const VEHICLE_FILTER_OPTIONS: VehicleFilterCategory[] = [
  'All',
  ...serviceCategories,
];

export function isVehicleFilterCategory(
  value: string,
): value is VehicleFilterCategory {
  return (
    value === 'All' ||
    (serviceCategories as string[]).includes(value)
  );
}

/**
 * Parses a `searchParams.category` value into a valid filter category.
 * Falls back to "All" for missing or invalid values.
 */
export function parseVehicleFilterCategory(
  param?: string,
): VehicleFilterCategory {
  if (!param) {
    return 'All';
  }

  const decoded = decodeURIComponent(param);
  if (isVehicleFilterCategory(decoded)) {
    return decoded;
  }

  return 'All';
}

export function filterVehiclesByCategory(
  vehicleList: Vehicle[],
  category: VehicleFilterCategory,
): Vehicle[] {
  if (category === 'All') {
    return vehicleList;
  }

  return vehicleList.filter((vehicle) => vehicle.category === category);
}

export function vehicleFilterToSearchParam(
  category: VehicleFilterCategory,
): string {
  if (category === 'All') {
    return '';
  }

  return encodeURIComponent(category);
}
