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

    id: 'mercedes-v-class',

    name: 'Mercedes-Benz V-Class',

    category: 'Airport Transfers',

    passengerCapacity: 7,

    transmission: 'Automatic',

    fuelType: 'Diesel',

    images: ['/images/vehicles/mercedes-v-class.webp'],

    altText:

      'Glossy black Mercedes-Benz V-Class luxury MPV with chrome grille in a showroom',

    featured: true,

  },

  {

    id: 'range-rover-sport',

    name: 'Range Rover Sport (Bulletproof)',

    category: 'VIP Escort Services',

    passengerCapacity: 5,

    transmission: 'Automatic',

    fuelType: 'Petrol',

    images: ['/images/vehicles/range-rover-sport.webp'],

    altText:

      'Black Range Rover Sport HSE with approved badge parked at a dealership',

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

    id: 'bmw-x5-m-competition',

    name: 'BMW X5 M Competition',

    category: 'Music Video Vehicle Hire',

    passengerCapacity: 5,

    transmission: 'Automatic',

    fuelType: 'Petrol',

    images: ['/images/vehicles/bmw-x5-m-competition.webp'],

    altText:

      'Black BMW X5 M Competition SUV with LED headlights on a stone-paved driveway',

    featured: false,

  },

  {

    id: 'bmw-x3',

    name: 'BMW X3',

    category: 'Luxury Vehicle Hire',

    passengerCapacity: 5,

    transmission: 'Automatic',

    fuelType: 'Petrol',

    images: ['/images/vehicles/bmw-x3.webp'],

    altText:

      'Black BMW X3 luxury SUV, three-quarter front view with LED headlights',

    featured: false,

  },

  {

    id: 'mercedes-s-class',

    name: 'Mercedes-Benz S-Class',

    category: 'Matric Dance Transport',

    passengerCapacity: 5,

    transmission: 'Automatic',

    fuelType: 'Petrol',

    images: ['/images/vehicles/mercedes-s-class.webp'],

    altText:

      'Black Mercedes-Benz S-Class luxury sedan, three-quarter front view',

    featured: false,

  },

];



/** Vehicles marked as featured, displayed on the Home Page and Vehicles Page hero section. */

export const featuredVehicles: Vehicle[] = vehicles.filter((v) => v.featured);


