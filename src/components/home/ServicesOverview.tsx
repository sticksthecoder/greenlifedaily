/**
 * ServicesOverview — lists all nine service categories with overview cards.
 *
 * Requirements: 3.1, 3.2, 3.3
 */

import Link from 'next/link';
import ServiceCard from '@/components/shared/ServiceCard';
import { services } from '@/data/services';

export default function ServicesOverview() {
  return (
    <section
      id="services"
      aria-labelledby="services-overview-heading"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
            What We Offer
          </p>
          <h2
            id="services-overview-heading"
            className="mb-4 text-charcoal"
          >
            Our Services
          </h2>
          <p className="mx-auto max-w-xl text-charcoal-400">
            From intimate celebrations to large-scale productions, we have a
            service tailored to your exact needs.
          </p>
        </div>

        {/* Service cards grid — all nine services (Req 3.1) */}
        <ul
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Services offered by Greenlife Daily"
        >
          {services.map((service) => (
            <li key={service.id} className="flex flex-col">
              {/*
               * Wrap card in a link to the relevant anchor on the Services Page.
               * Req 3.3: CTA links to /services#<slug>
               */}
              <Link
                href={`/services#${service.slug}`}
                aria-label={`Learn more about ${service.title}`}
                className="flex flex-1 flex-col rounded-2xl transition-shadow duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <ServiceCard service={service} variant="overview" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Call-to-action to the full Services page */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:bg-green-800"
          >
            Explore All Services
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
