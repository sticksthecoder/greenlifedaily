/**
 * Vehicle data for Greenlife Daily premium vehicle rental.
 */

import type { ServiceCategory } from './services';

export interface Vehicle {
  id: string;
  name: string;
  category: ServiceCategory;
  passengerCapacity: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  /** Paths relative to /public/images/vehicles/ */
  images: string[];
  altText: string;
  featured: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: 'ford-mustang-gt',
    name: 'Ford Mustang GT',
    category: 'Luxury Vehicle Hire',
    passengerCapacity: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    images: ['/images/vehicles/ford-mustang-gt.webp'],
    altText:
      'Black Ford Mustang GT coupe with 5.0 badge parked on a residential driveway',
    featured: true,
  },
  {
    id: 'mercedes-v-class',
    name: 'Mercedes-Benz V-Class',
    category: 'Airport Transfers',
    passengerCapacity: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    images: ['/images/vehicles/mercedes-v-class.webp'],
    altText:
      'Cherry red Mercedes-Benz V-Class luxury MPV with chrome grille accents',
    featured: true,
  },
  {
    id: 'range-rover-autobiography',
    name: 'Range Rover Autobiography',
    category: 'VIP Escort Services',
    passengerCapacity: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    images: ['/images/vehicles/range-rover-autobiography.webp'],
    altText: 'Black Range Rover Autobiography SUV on a scenic mountain road',
    featured: true,
  },
  {
    id: 'mercedes-g63',
    name: 'Mercedes-AMG G63',
    category: 'Executive Transport',
    passengerCapacity: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    images: ['/images/vehicles/mercedes-g63.webp'],
    altText:
      'Black Mercedes-AMG G63 luxury SUV with AMG Panamericana grille in a modern warehouse setting',
    featured: true,
  },
  {
    id: 'lamborghini-urus',
    name: 'Lamborghini Urus',
    category: 'Wedding Vehicle Hire',
    passengerCapacity: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    images: ['/images/vehicles/lamborghini-urus.webp'],
    altText:
      'White Lamborghini Urus luxury SUV with black accents, red brake calipers, and angular front grille',
    featured: true,
  },
  {
    id: 'porsche-cayenne',
    name: 'Porsche Cayenne',
    category: 'Corporate Rentals',
    passengerCapacity: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    images: ['/images/vehicles/porsche-cayenne.webp'],
    altText:
      'Black Porsche Cayenne SUV with illuminated LED headlights in a studio setting',
    featured: false,
  },
  {
    id: 'maserati-granturismo-mc-stradale',
    name: 'Maserati GranTurismo MC Stradale',
    category: 'Music Video Vehicle Hire',
    passengerCapacity: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    images: ['/images/vehicles/maserati-granturismo-mc-stradale.webp'],
    altText:
      'Matte red Maserati GranTurismo MC Stradale coupe with trident grille on a stone driveway',
    featured: false,
  },
  {
    id: 'bmw-m4-g82',
    name: 'BMW M4 G82',
    category: 'Matric Dance Transport',
    passengerCapacity: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    images: ['/images/vehicles/bmw-m4-g82.webp'],
    altText:
      'Isle of Man Green BMW M4 G82 coupe with vertical kidney grilles parked on a brick driveway',
    featured: false,
  },
];

/** Vehicles marked as featured, displayed on the Home Page and Vehicles Page hero section. */
export const featuredVehicles: Vehicle[] = vehicles.filter((v) => v.featured);
