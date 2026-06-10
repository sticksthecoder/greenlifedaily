/**
 * Unit tests for vehicle filter helpers.
 *
 * Requirements: 9.6, 9.7
 */

import { describe, it, expect } from 'vitest';
import { vehicles } from '@/data/vehicles';
import {
  filterVehiclesByCategory,
  isVehicleFilterCategory,
  parseVehicleFilterCategory,
} from './vehicle-filter';

describe('vehicle filter helpers', () => {
  it('parses a valid category from search params', () => {
    expect(parseVehicleFilterCategory('Wedding Vehicle Hire')).toBe(
      'Wedding Vehicle Hire',
    );
    expect(
      parseVehicleFilterCategory(encodeURIComponent('Airport Transfers')),
    ).toBe('Airport Transfers');
  });

  it('falls back to All for missing or invalid categories', () => {
    expect(parseVehicleFilterCategory()).toBe('All');
    expect(parseVehicleFilterCategory('Not A Real Category')).toBe('All');
  });

  it('filters vehicles to only the selected category', () => {
    const airportVehicles = filterVehiclesByCategory(
      vehicles,
      'Airport Transfers',
    );

    expect(airportVehicles.length).toBeGreaterThan(0);
    expect(
      airportVehicles.every(
        (vehicle) => vehicle.category === 'Airport Transfers',
      ),
    ).toBe(true);
  });

  it('returns all vehicles when category is All', () => {
    expect(filterVehiclesByCategory(vehicles, 'All')).toHaveLength(vehicles.length);
  });

  it('recognises All and every service category as valid filter values', () => {
    expect(isVehicleFilterCategory('All')).toBe(true);
    expect(isVehicleFilterCategory('Luxury Vehicle Hire')).toBe(true);
    expect(isVehicleFilterCategory('Invalid')).toBe(false);
  });
});
