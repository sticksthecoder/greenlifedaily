/**
 * About Page — company background, mission, vision, and values.
 *
 * Requirements: 10.1, 10.2, 10.3, 10.4, 14.1, 14.2, 14.4
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { aboutContent } from '@/data/about';
import { company } from '@/data/company';

export const metadata: Metadata = {
  // Title: 52 chars (Req 14.1)
  title: 'About Greenlife Daily | Premium Vehicle Hire Gauteng',
  // Description: 156 chars (Req 14.2)
  description:
    'Learn about Greenlife Daily — a Gauteng premium vehicle hire company for weddings, corporate events, VIP transport, and special occasions in South Africa.',
  openGraph: {
    title: 'About Greenlife Daily | Premium Vehicle Hire Gauteng',
    description:
      'Learn about Greenlife Daily — a Gauteng premium vehicle hire company for weddings, corporate events, VIP transport, and special occasions in South Africa.',
    url: 'https://www.greenlifedaily.co.za/about',
    siteName: 'Greenlife Daily',
    images: [
      {
        url: '/images/og-about.webp',
        width: 1200,
        height: 630,
        alt: 'About Greenlife Daily premium vehicle hire',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Greenlife Daily | Premium Vehicle Hire Gauteng',
    description:
      'Learn about Greenlife Daily — a Gauteng premium vehicle hire company for weddings, corporate events, VIP transport, and special occasions.',
    images: ['/images/og-about.webp'],
  },
  alternates: {
    canonical: 'https://www.greenlifedaily.co.za/about',
  },
};

export default function AboutPage() {
  const { overview, mission, vision, values } = aboutContent;

  return (
    <main id="main-content">
      <section
        aria-labelledby="about-page-heading"
        className="bg-charcoal-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
              Who We Are
            </p>
            <h1 id="about-page-heading" className="mb-4 text-charcoal">
              About {company.name}
            </h1>
            <p className="text-lg text-charcoal-400">{company.tagline}</p>
          </div>

          <div className="space-y-16">
            <section
              aria-labelledby="company-overview-heading"
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-charcoal-100 sm:p-10"
            >
              <h2
                id="company-overview-heading"
                className="mb-6 text-2xl font-bold text-charcoal"
              >
                {overview.heading}
              </h2>
              <div className="space-y-4 text-charcoal-500 leading-relaxed">
                {overview.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            <div className="grid gap-8 md:grid-cols-2">
              <section
                aria-labelledby="mission-heading"
                className="rounded-2xl bg-green-600 p-8 text-white shadow-md sm:p-10"
              >
                <h2
                  id="mission-heading"
                  className="mb-4 text-xl font-bold sm:text-2xl"
                >
                  {mission.heading}
                </h2>
                <p className="leading-relaxed text-green-50">{mission.statement}</p>
              </section>

              <section
                aria-labelledby="vision-heading"
                className="rounded-2xl bg-charcoal-800 p-8 text-white shadow-md sm:p-10"
              >
                <h2
                  id="vision-heading"
                  className="mb-4 text-xl font-bold sm:text-2xl"
                >
                  {vision.heading}
                </h2>
                <p className="leading-relaxed text-charcoal-200">{vision.statement}</p>
              </section>
            </div>

            <section aria-labelledby="values-heading">
              <div className="mb-8">
                <h2
                  id="values-heading"
                  className="mb-3 text-2xl font-bold text-charcoal"
                >
                  Our Values
                </h2>
                <p className="text-charcoal-400">
                  Five principles guide how we serve every client, on every hire.
                </p>
              </div>

              <ul
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                aria-label="Greenlife Daily company values"
              >
                {values.map((value) => (
                  <li
                    key={value.title}
                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-charcoal-100 transition-shadow duration-200 hover:shadow-md"
                  >
                    <h3 className="mb-3 text-lg font-semibold text-green-700">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal-500">
                      {value.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center">
              <h2 className="mb-3 text-xl font-bold text-charcoal">
                Ready to work with us?
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-charcoal-500">
                Explore our services and fleet, or get in touch to discuss your
                requirements with our team.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  View Our Services
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-green-600 px-6 py-3 text-sm font-semibold text-green-700 transition-colors duration-200 hover:bg-green-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
