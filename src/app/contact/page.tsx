/**
 * Contact Page — quote form, contact details, and location map.
 *
 * Requirements: 11.1, 11.2, 11.6, 11.7, 11.8, 11.9, 14.1, 14.2, 14.4
 */

import type { Metadata } from 'next';
import ContactDetails from '@/components/contact/ContactDetails';
import GoogleMapsEmbed from '@/components/contact/GoogleMapsEmbed';
import QuoteForm from '@/components/shared/QuoteForm';
import QuoteFormHeader from '@/components/shared/QuoteFormHeader';
import { company } from '@/data/company';

export const metadata: Metadata = {
  // Title: 53 chars (Req 14.1)
  title: 'Contact Greenlife Daily | Request a Vehicle Hire Quote',
  // Description: 157 chars (Req 14.2)
  description:
    'Contact Greenlife Daily for vehicle hire quotes. Call, email, or WhatsApp our Gauteng team. View business hours, service area, and request a quote online.',
  openGraph: {
    title: 'Contact Greenlife Daily | Request a Vehicle Hire Quote',
    description:
      'Contact Greenlife Daily for vehicle hire quotes. Call, email, or WhatsApp our Gauteng team. View business hours, service area, and request a quote online.',
    url: 'https://www.greenlifedaily.co.za/contact',
    siteName: 'Greenlife Daily',
    images: [
      {
        url: '/images/og-contact.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Greenlife Daily for premium vehicle hire',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Greenlife Daily | Request a Vehicle Hire Quote',
    description:
      'Contact Greenlife Daily for premium vehicle hire quotes. Call, email, or WhatsApp our Gauteng team today.',
    images: ['/images/og-contact.webp'],
  },
  alternates: {
    canonical: 'https://www.greenlifedaily.co.za/contact',
  },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section
        aria-labelledby="contact-page-heading"
        className="bg-charcoal-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
              Get In Touch
            </p>
            <h1 id="contact-page-heading" className="mb-4 text-charcoal">
              Contact {company.name}
            </h1>
            <p className="text-charcoal-400">
              Request a quote online, call us directly, or message us on
              WhatsApp. Our team responds promptly during business hours and will
              help you find the right vehicle for your occasion.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
            <div
              id="quote-form"
              className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-md ring-1 ring-charcoal-100 sm:p-10"
              aria-label="Request a vehicle hire quote"
            >
              <QuoteFormHeader />
              <QuoteForm />
            </div>

            <div className="space-y-8">
              <ContactDetails />

              <section aria-labelledby="location-heading">
                <h2
                  id="location-heading"
                  className="mb-4 text-lg font-bold text-charcoal"
                >
                  Our Location
                </h2>
                <GoogleMapsEmbed />
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
