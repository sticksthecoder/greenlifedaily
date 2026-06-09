/**
 * WhyChooseSection — six value propositions for Greenlife Daily.
 *
 * Requirements: 4.1, 4.2
 */

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  /** ≤ 25 words (Req 4.2) */
  description: string;
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M7 2v11h3v9l7-12h-4l4-8z" />
    </svg>
  );
}

function SupportAgentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M12 3a5 5 0 0 0-5 5v1.26A6.003 6.003 0 0 0 6 14.25V16h-.75A1.75 1.75 0 0 0 3.5 17.75V19h17v-1.25A1.75 1.75 0 0 0 18.75 16H18v-1.75A6.003 6.003 0 0 0 17 9.26V8a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v1.17A4.001 4.001 0 0 1 15 14.25V16H9v-1.75a4.001 4.001 0 0 1 0-7.08V8a3 3 0 0 1 3-3z" />
      <circle cx="12" cy="8" r="2.25" />
      <path d="M8 20.5c1.2-1.4 2.6-2 4-2s2.8.6 4 2H8z" />
    </svg>
  );
}

const valueProps: ValueProp[] = [
  {
    icon: <StarIcon />,
    title: 'Professional Service',
    description:
      'Uniformed, vetted drivers and courteous staff who go above and beyond to ensure a premium experience every time.',
  },
  {
    icon: <WrenchIcon />,
    title: 'Well Maintained Vehicles',
    description:
      'Every vehicle is inspected, serviced, and presented in showroom condition before each hire.',
  },
  {
    icon: <TagIcon />,
    title: 'Competitive Pricing',
    description:
      'Premium quality at fair, transparent rates. We offer flexible packages to match any budget and occasion.',
  },
  {
    icon: <CalendarIcon />,
    title: 'Flexible Rental Options',
    description:
      'Hourly, half-day, full-day, or multi-day bookings available. We adapt to your schedule, not the other way around.',
  },
  {
    icon: <BoltIcon />,
    title: 'Fast Response Times',
    description:
      'We respond to all enquiries within two hours during business hours. Last-minute bookings are always welcome.',
  },
  {
    icon: <SupportAgentIcon />,
    title: 'Reliable Customer Support',
    description:
      'Our team is reachable via WhatsApp, phone, and email. We stay in contact from booking to drop-off.',
  },
];

export default function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      className="bg-charcoal-900 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-400">
            Why Us
          </p>
          <h2
            id="why-choose-heading"
            className="mb-4 text-white"
          >
            Why Choose Greenlife Daily
          </h2>
          <p className="mx-auto max-w-xl text-charcoal-300">
            We&apos;ve built our reputation on delivering a level of service that
            matches the prestige of our vehicles.
          </p>
        </div>

        {/* Value propositions grid — Req 4.1 (six items), Req 4.2 (icon + title + ≤25-word desc) */}
        <ul
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Why choose Greenlife Daily"
        >
          {valueProps.map((vp) => (
            <li
              key={vp.title}
              className="flex items-start gap-5 rounded-2xl bg-charcoal-800 p-6 ring-1 ring-charcoal-700 transition-shadow duration-200 hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-600/20 text-green-400"
                aria-hidden="true"
              >
                {vp.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="mb-2 text-base font-semibold text-white">
                  {vp.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal-300">
                  {vp.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
