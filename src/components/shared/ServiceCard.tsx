import Image from 'next/image';
import type { Service, ServiceCategory } from '@/data/services';

export interface ServiceCardProps {
  service: Service;
  variant: 'overview' | 'full';
  onEnquire?: (category: ServiceCategory) => void;
}

/**
 * ServiceCard renders a single service in one of two modes:
 * - `variant="overview"`: compact card with icon, title, and ≤30-word description (Req 3.2)
 * - `variant="full"`:     full detail with heading, description, use cases, and enquiry CTA (Req 8.3, 8.4)
 */
export default function ServiceCard({ service, variant, onEnquire }: ServiceCardProps) {
  const { icon, title, shortDescription, fullDescription, useCases, category } = service;

  // Determine whether the icon string is a path to an image file or a plain emoji/text
  const isImagePath = icon.startsWith('/') || icon.startsWith('http');

  function handleEnquire() {
    onEnquire?.(category);
  }

  if (variant === 'overview') {
    return (
      <article
        className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-charcoal-100 transition-shadow duration-200 hover:shadow-md"
        aria-label={`${title} service overview`}
      >
        {/* Icon */}
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50"
          aria-hidden="true"
        >
          {isImagePath ? (
            <Image
              src={icon}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-3xl leading-none">{icon}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-center text-base font-semibold text-charcoal">
          {title}
        </h3>

        {/* Short description (≤ 30 words per Req 3.2) */}
        <p className="text-center text-sm leading-relaxed text-charcoal-400">
          {shortDescription}
        </p>
      </article>
    );
  }

  // variant === 'full'
  return (
    <article
      className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-charcoal-100"
      aria-label={`${title} service detail`}
    >
      {/* Header: icon + heading */}
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-50"
          aria-hidden="true"
        >
          {isImagePath ? (
            <Image
              src={icon}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-3xl leading-none">{icon}</span>
          )}
        </div>
        <h2 className="text-xl font-bold text-charcoal md:text-2xl">{title}</h2>
      </div>

      {/* Full description */}
      <p className="leading-relaxed text-charcoal-500">{fullDescription}</p>

      {/* Use cases */}
      {useCases.length > 0 && (
        <section aria-label={`${title} use cases`}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-700">
            Ideal For
          </h3>
          <ul className="space-y-2" role="list">
            {useCases.map((useCase) => (
              <li
                key={useCase}
                className="flex items-start gap-2 text-sm text-charcoal-500"
              >
                {/* Decorative tick */}
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  />
                </svg>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Enquiry CTA (Req 8.4) */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleEnquire}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:bg-green-800"
          aria-label={`Enquire about ${title}`}
        >
          Enquire About This Service
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
        </button>
      </div>
    </article>
  );
}
