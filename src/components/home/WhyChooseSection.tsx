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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

const valueProps: ValueProp[] = [
  {
    icon: <StarIcon />,
    title: 'Professional Service',
    description:
      'Vetted drivers and courteous staff who go above and beyond to ensure a premium experience every time.',
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
    icon: <PhoneIcon />,
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
