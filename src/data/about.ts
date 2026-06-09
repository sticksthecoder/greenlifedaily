/**
 * About page content for Greenlife Daily.
 *
 * Requirements: 10.2, 10.3, 10.4
 */

export interface CompanyValue {
  title:
    | 'Professionalism'
    | 'Reliability'
    | 'Customer Satisfaction'
    | 'Safety'
    | 'Excellence';
  description: string;
}

export interface AboutContent {
  overview: {
    heading: string;
    paragraphs: string[];
  };
  mission: {
    heading: string;
    statement: string;
  };
  vision: {
    heading: string;
    statement: string;
  };
  values: CompanyValue[];
}

export const aboutContent: AboutContent = {
  overview: {
    heading: 'Company Overview',
    paragraphs: [
      'Greenlife Daily was founded with a simple belief: every important occasion deserves a vehicle and a service experience to match. What began as a boutique luxury hire operation in Gauteng has grown into a trusted partner for private clients, corporate teams, production houses, and event planners across Johannesburg, Pretoria, and surrounding areas.',
      'Today we serve a wide range of needs — from matric dances and weddings to executive roadshows, airport transfers, VIP escort movements, and on-set vehicle supply for music videos and film productions. While we showcase a curated selection of our fleet online, our broader inventory and sourcing network mean we can fulfil bespoke requests beyond what is listed.',
      'Our team combines hospitality-minded service with rigorous operational standards. Every booking is handled with care, from the first enquiry through to the final drop-off, so you can focus on the moment — not the logistics.',
    ],
  },
  mission: {
    heading: 'Our Mission',
    statement:
      'To deliver impeccably presented vehicles and dependable, professional transport that elevates every journey — giving our clients confidence, comfort, and peace of mind on the occasions that matter most.',
  },
  vision: {
    heading: 'Our Vision',
    statement:
      'To be South Africa\'s most trusted premium vehicle hire brand — recognised for exceptional service, operational excellence, and a fleet that sets the standard for luxury transport nationwide.',
  },
  values: [
    {
      title: 'Professionalism',
      description:
        'From our chauffeurs to our coordination team, we represent Greenlife Daily with polish, punctuality, and respect. Every interaction reflects the premium standard our clients expect.',
    },
    {
      title: 'Reliability',
      description:
        'We honour commitments. Vehicles arrive prepared, drivers are on time, and communication stays clear throughout your hire — because your schedule cannot afford surprises.',
    },
    {
      title: 'Customer Satisfaction',
      description:
        'Your experience drives everything we do. We listen carefully, tailor solutions to your needs, and follow through until you are completely satisfied with the result.',
    },
    {
      title: 'Safety',
      description:
        'Safety is non-negotiable. Our fleet is maintained to the highest standards, our drivers are vetted and trained, and every journey is planned with care for passengers and road conditions.',
    },
    {
      title: 'Excellence',
      description:
        'We pursue excellence in every detail — vehicle presentation, route planning, client communication, and post-hire follow-up — so each hire feels effortlessly premium.',
    },
  ],
};
