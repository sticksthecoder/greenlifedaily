/**
 * HeroSection — full-width banner at the top of the Home Page.
 *
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6
 */

import Link from 'next/link';
import { company } from '@/data/company';
import HeroBackground from '@/components/home/HeroBackground';

export default function HeroSection() {
  const whatsAppUrl = `https://wa.me/${company.whatsAppNumber}?text=${encodeURIComponent(
    'Hi Greenlife Daily, I would like to enquire about vehicle hire.',
  )}`;

  return (
    <section
      aria-label="Premium Vehicle Hire For Every Occasion"
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-charcoal-900"
    >
      {/* Rotating background vehicle images (Req 1.5) */}
      <HeroBackground />

      {/* ------------------------------------------------------------------ */}
      {/* Content                                                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* Pre-headline accent */}
        <p className="mb-4 inline-block rounded-full bg-green-600/20 px-4 py-1 text-sm font-medium tracking-widest text-green-300 ring-1 ring-green-600/40">
          South Africa&apos;s Premium Fleet
        </p>

        {/* Headline (Req 1.1) */}
        <h1 className="mb-6 text-white">
          Premium Vehicle Hire{' '}
          <span className="text-green-400">For Every Occasion</span>
        </h1>

        {/* Sub-headline (Req 1.2) */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-charcoal-200 sm:text-xl">
          From matric dances and weddings to executive transport, airport
          transfers, and film productions — Greenlife Daily delivers an
          immaculate fleet and professional service for every moment that
          matters.
        </p>

        {/* CTA buttons — single-column on mobile (Req 1.6), row on sm+ */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary CTA: Request a Quote (Req 1.3) */}
          <Link
            href="#quote-form"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-green-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 active:bg-green-800 sm:w-auto"
            aria-label="Request a vehicle hire quote"
          >
            Request a Quote
          </Link>

          {/* Secondary CTA: WhatsApp Us (Req 1.4) */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border-2 border-white/70 bg-transparent px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-white/20 sm:w-auto"
            aria-label="Chat with Greenlife Daily on WhatsApp"
          >
            {/* WhatsApp icon */}
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg
          className="h-6 w-6 text-white/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
