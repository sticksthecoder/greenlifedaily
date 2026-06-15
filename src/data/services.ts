export type ServiceCategory =
  | 'Luxury Vehicle Hire'
  | 'Matric Dance Transport'
  | 'Wedding Vehicle Hire'
  | 'Executive Transport'
  | 'Airport Transfers'
  | 'Corporate Rentals'
  | 'VIP Escort Services'
  | 'Music Video Vehicle Hire'
  | 'TV & Film Production Vehicle Hire';

export interface Service {
  id: string;
  category: ServiceCategory;
  slug: string;
  icon: string;
  title: string;
  shortDescription: string; // <= 30 words
  fullDescription: string;
  useCases: string[];
}

export const serviceCategories: ServiceCategory[] = [
  'Luxury Vehicle Hire',
  'Matric Dance Transport',
  'Wedding Vehicle Hire',
  'Executive Transport',
  'Airport Transfers',
  'Corporate Rentals',
  'VIP Escort Services',
  'Music Video Vehicle Hire',
  'TV & Film Production Vehicle Hire',
];

export const services: Service[] = [
  {
    id: 'luxury-vehicle-hire',
    category: 'Luxury Vehicle Hire',
    slug: 'luxury-vehicle-hire',
    icon: '/icons/luxury-vehicle.svg',
    title: 'Luxury Vehicle Hire',
    shortDescription:
      'Experience ultimate prestige with our handpicked fleet of luxury vehicles, perfect for any occasion demanding elegance and comfort.',
    fullDescription:
      "Our luxury vehicle hire service gives you access to a carefully curated fleet of premium cars, from sleek sedans to commanding SUVs. Whether you're attending a gala event, celebrating a milestone, or simply want to arrive in style, our immaculately maintained vehicles and professional service ensure an unforgettable experience. All vehicles are comprehensively insured, GPS tracked, and inspected before every hire.",
    useCases: [
      'Special occasions and milestone celebrations',
      'High-profile business meetings',
      'Gala dinners and awards ceremonies',
      'Weekend leisure drives',
      'Honeymoons and anniversaries',
    ],
  },
  {
    id: 'matric-dance-transport',
    category: 'Matric Dance Transport',
    slug: 'matric-dance-transport',
    icon: '/icons/matric-dance.svg',
    title: 'Matric Dance Transport',
    shortDescription:
      'Arrive at your matric dance in unforgettable style with a premium vehicle that sets the tone for your special night.',
    fullDescription:
      "Your matric dance is one of the most memorable nights of your life, and your arrival should match the occasion. We provide show stopping vehicles for matric students who want to make a grand entrance. Our professional drivers ensure you and your group travel safely and punctually, so you can focus on celebrating. Packages are available for individuals, couples, and groups, with vehicles decorated on request.",
    useCases: [
      'Individual or couple matric dance arrivals',
      'Group matric dance transport packages',
      'Pre-event photo opportunity arrivals',
      'Post-dance transport home',
    ],
  },
  {
    id: 'wedding-vehicle-hire',
    category: 'Wedding Vehicle Hire',
    slug: 'wedding-vehicle-hire',
    icon: '/icons/wedding.svg',
    title: 'Wedding Vehicle Hire',
    shortDescription:
      'Make your wedding day perfect with elegant bridal transport, from the ceremony to the reception, tailored to your vision.',
    fullDescription:
      "A wedding day deserves flawless transport. We offer a premium range of wedding vehicles, from classic luxury sedans to modern SUVs, dressed to complement your theme. Our experienced, formally dressed chauffeurs are punctual, discreet, and dedicated to ensuring the bride, groom, and bridal party travel in comfort and elegance. We coordinate all logistics with your wedding planner to guarantee seamless arrivals and departures throughout the day.",
    useCases: [
      'Bridal party transport to the ceremony',
      'Bride and groom getaway vehicle',
      'Guest shuttle services between venues',
      'Engagement or pre-wedding photo shoots',
      'Honeymoon departure transport',
    ],
  },
  {
    id: 'executive-transport',
    category: 'Executive Transport',
    slug: 'executive-transport',
    icon: '/icons/executive-transport.svg',
    title: 'Executive Transport',
    shortDescription:
      'Reliable, discreet, and punctual executive transport for business travellers who value comfort, privacy, and professionalism.',
    fullDescription:
      "Our executive transport service is designed for business professionals who require a seamless, high standard travel experience. Our professional chauffeurs understand the demands of corporate schedules. They are punctual, discreet, and committed to making every journey productive and stress free. Vehicles are equipped with climate control and can be booked on a one off or regular retainer basis to suit your business needs.",
    useCases: [
      'Board meetings and investor presentations',
      'Intercity business travel',
      'Client entertainment and transfers',
      'Conference and summit transport',
      'Recurring executive commute arrangements',
    ],
  },
  {
    id: 'airport-transfers',
    category: 'Airport Transfers',
    slug: 'airport-transfers',
    icon: '/icons/airport-transfers.svg',
    title: 'Airport Transfers',
    shortDescription:
      'Stress free airport transfers with meet and greet service and premium vehicles for every arrival and departure.',
    fullDescription:
      "We take the hassle out of airport travel. A professional chauffeur will meet you in arrivals, assist with luggage, and escort you to a spotlessly clean vehicle. Whether you're travelling for business or leisure, departing or arriving, our transfers are reliable, comfortable, and always punctual.",
    useCases: [
      'International and domestic flight arrivals',
      'Departure transfers from home or hotel',
      'Business delegation airport meet-and-greet',
      'Early morning and late-night flights',
      'Multi-stop itinerary transfers',
    ],
  },
  {
    id: 'corporate-rentals',
    category: 'Corporate Rentals',
    slug: 'corporate-rentals',
    icon: '/icons/corporate-rentals.svg',
    title: 'Corporate Rentals',
    shortDescription:
      "Flexible short and long term corporate vehicle rentals with fleet management support, tailored to your company's travel policy.",
    fullDescription:
      "Our corporate rental programme provides businesses with flexible access to a premium vehicle fleet on short or long term agreements. We work with HR, travel management, and executive assistants to integrate seamlessly into your existing travel policy. Our account management team handles scheduling, invoicing, and fleet coordination, so your team always has the right vehicle available. Volume discounts and dedicated account managers are available for regular clients.",
    useCases: [
      'Long-term executive vehicle rental',
      'Short-term project-based fleet hire',
      'Visiting executive and client transport',
      'Staff relocation transport assistance',
      'Multi-vehicle corporate event transport',
    ],
  },
  {
    id: 'vip-escort-services',
    category: 'VIP Escort Services',
    slug: 'vip-escort-services',
    icon: '/icons/vip-escort.svg',
    title: 'VIP Escort Services',
    shortDescription:
      'Secure, discreet VIP escort services for high-profile individuals requiring professional protection and premium transport.',
    fullDescription:
      "We provide comprehensive VIP escort services for high net worth individuals, government officials, celebrities, and visiting dignitaries. Our professional drivers are trained in defensive driving, route planning, and discretion. Convoy arrangements, advance route reconnaissance, and coordinated logistics with security teams are all available. Every detail is managed with the highest level of confidentiality and professionalism to ensure the safety and comfort of our clients.",
    useCases: [
      'Government official and diplomatic transport',
      'Celebrity and high-net-worth individual transport',
      'Corporate VIP guest management',
      'Secure event arrivals and departures',
      'Coordinated multi-vehicle convoy movements',
    ],
  },
  {
    id: 'music-video-vehicle-hire',
    category: 'Music Video Vehicle Hire',
    slug: 'music-video-vehicle-hire',
    icon: '/icons/music-video.svg',
    title: 'Music Video Vehicle Hire',
    shortDescription:
      'Supply your music video with striking, camera-ready luxury vehicles that enhance your visual concept and elevate production value.',
    fullDescription:
      "Premium vehicles are a staple of compelling music video productions, and we have the fleet to make your vision a reality. We supply clean, high impact vehicles, from sports cars to luxury SUVs, for use on set, in motion, or as props. Our team works closely with directors and production coordinators to accommodate shoot schedules, multiple locations, and specific vehicle requirements. All vehicles are camera ready and can be detailed and prepared to your creative brief.",
    useCases: [
      'Hero vehicle feature shots',
      'Convoy and motorcade sequences',
      'Static prop vehicles for set design',
      'Multiple-vehicle shoots across locations',
      'Wrap or branding on vehicles for production',
    ],
  },
  {
    id: 'tv-film-production-vehicle-hire',
    category: 'TV & Film Production Vehicle Hire',
    slug: 'tv-film-production-vehicle-hire',
    icon: '/icons/film-production.svg',
    title: 'TV & Film Production Vehicle Hire',
    shortDescription:
      'Reliable production vehicle hire for TV and film sets, from on camera hero vehicles to unit base and talent transport.',
    fullDescription:
      "We support South African and international TV and film productions with a versatile fleet available for on camera use, talent transport, and unit base logistics. We understand production timelines are tight and budgets are closely managed, so our production coordination team ensures vehicles are where they need to be, when they need to be there. We supply everything from sleek luxury cars for period or contemporary scenes to SUVs for talent movement and supporting cast transport.",
    useCases: [
      'On-camera hero and supporting vehicles',
      'Talent and cast transport between locations',
      'Background vehicle placements',
      'Unit base and production crew transport',
      'Location scout and production recce vehicles',
    ],
  },
];
