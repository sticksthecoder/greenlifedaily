'use client';

/**
 * ServicesPageContent — full service sections with enquiry wiring and quote form.
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4
 */

import { useCallback, useEffect, useState } from 'react';
import ServiceCard from '@/components/shared/ServiceCard';
import QuoteForm from '@/components/shared/QuoteForm';
import QuoteFormHeader from '@/components/shared/QuoteFormHeader';
import type { Service, ServiceCategory } from '@/data/services';

export interface ServicesPageContentProps {
  services: Service[];
}

export default function ServicesPageContent({
  services,
}: ServicesPageContentProps) {
  const [prefilledService, setPrefilledService] = useState<
    ServiceCategory | undefined
  >(undefined);

  const handleEnquire = useCallback((category: ServiceCategory) => {
    setPrefilledService(category);
    const quoteForm = document.getElementById('quote-form');
    quoteForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      return;
    }

    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <div className="space-y-12">
        {services.map((service) => (
          <section
            key={service.id}
            id={service.slug}
            aria-label={service.title}
            className="scroll-mt-28"
          >
            <ServiceCard
              service={service}
              variant="full"
              onEnquire={handleEnquire}
            />
          </section>
        ))}
      </div>

      <div
        id="quote-form"
        className="mt-16 scroll-mt-28 rounded-2xl bg-white p-6 shadow-md ring-1 ring-charcoal-100 sm:p-10"
        aria-label="Request a service quote"
      >
        <QuoteFormHeader />
        <QuoteForm prefilledService={prefilledService} />
      </div>
    </>
  );
}
