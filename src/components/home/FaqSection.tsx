'use client';

/**
 * FaqSection — accessible accordion FAQ component.
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4, 16.5
 */

import { useState } from 'react';
import { faqs } from '@/data/faqs';

export default function FaqSection() {
  // Track which FAQ items are expanded by their id
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-charcoal-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
            Got Questions?
          </p>
          <h2 id="faq-heading" className="mb-4 text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-xl text-charcoal-400">
            Everything you need to know before making a booking. Can&apos;t find
            what you&apos;re looking for? Reach out on WhatsApp and we&apos;ll
            help right away.
          </p>
        </div>

        {/* Accordion list (Req 6.2) */}
        <dl className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `faq-panel-${faq.id}`;
            const triggerId = `faq-trigger-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-shadow duration-200 ${
                  isOpen
                    ? 'border-green-200 bg-white shadow-sm'
                    : 'border-charcoal-100 bg-white hover:shadow-sm'
                }`}
              >
                {/* Question / trigger (Req 6.2, 16.5) */}
                <dt>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold text-charcoal transition-colors duration-150 hover:text-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:text-base"
                  >
                    <span>{faq.question}</span>

                    {/* Chevron icon — rotates when open */}
                    <svg
                      className={`h-5 w-5 shrink-0 text-green-600 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      />
                    </svg>
                  </button>
                </dt>

                {/* Answer panel — hidden by default (Req 6.2, 6.3, 6.4) */}
                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className={`px-6 pb-6 text-sm leading-relaxed text-charcoal-500 transition-all duration-300 sm:text-base ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  {faq.answer}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
