'use client';

import QuoteForm from '@/components/shared/QuoteForm';
import QuoteFormHeader from '@/components/shared/QuoteFormHeader';

interface HomeQuoteSectionProps {
  prefilledVehicle?: string;
}

export default function HomeQuoteSection({ prefilledVehicle }: HomeQuoteSectionProps) {
  return (
    <section
      aria-labelledby="home-quote-heading"
      className="bg-white pt-0 pb-20 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          id="quote-form"
          className="scroll-mt-24 rounded-2xl bg-charcoal-50 p-6 shadow-md ring-1 ring-charcoal-100 sm:p-10"
          aria-label="Request a vehicle hire quote"
        >
          <QuoteFormHeader headingId="home-quote-heading" />
          <QuoteForm prefilledVehicle={prefilledVehicle} />
        </div>
      </div>
    </section>
  );
}
