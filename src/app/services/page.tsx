/**
 * Services Page — detailed information for each service category.
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4, 14.1, 14.2, 14.4
 */

import type { Metadata } from 'next';
import ServicesPageContent from '@/components/services/ServicesPageContent';
import { services } from '@/data/services';

export const metadata: Metadata = {
  // Title: 50 chars (Req 14.1)
  title: 'Our Premium Vehicle Hire Services | Greenlife Daily',
  // Description: 157 chars (Req 14.2)
  description:
    'Explore nine premium vehicle hire services from Greenlife Daily for weddings, matric dances, executive transport, airport transfers, VIP escort, and film hire.',
  openGraph: {
    title: 'Our Premium Vehicle Hire Services | Greenlife Daily',
    description:
      'Explore nine premium vehicle hire services from Greenlife Daily for weddings, matric dances, executive transport, airport transfers, VIP escort, and film hire.',
    url: 'https://www.greenlifedaily.co.za/services',
    siteName: 'Greenlife Daily',
    images: [
      {
        url: '/images/og-services.webp',
        width: 1200,
        height: 630,
        alt: 'Greenlife Daily premium vehicle hire services',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Premium Vehicle Hire Services | Greenlife Daily',
    description:
      "Explore Greenlife Daily's nine premium hire services for weddings, matric dances, executive transport, airport transfers, VIP escort, and TV & film production.",
    images: ['/images/og-services.webp'],
  },
  alternates: {
    canonical: 'https://www.greenlifedaily.co.za/services',
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <section
        aria-labelledby="services-page-heading"
        className="bg-charcoal-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
              What We Offer
            </p>
            <h1 id="services-page-heading" className="mb-4 text-charcoal">
              Our Services
            </h1>
            <p className="text-charcoal-400">
              From intimate celebrations to large-scale productions, Greenlife
              Daily offers nine specialised vehicle hire services. Select a
              category below to learn more, then enquire when you are ready to
              book.
            </p>
          </div>

          <ServicesPageContent services={services} />
        </div>
      </section>
    </main>
  );
}
