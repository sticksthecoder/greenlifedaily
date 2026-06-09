/**
 * ClickToCallButton — mobile-only click-to-call button (≤768px viewports).
 *
 * Hidden on `md` breakpoints and above via Tailwind's `md:hidden` utility.
 * Links to `tel:` using the phone number sourced first from the env variable
 * `NEXT_PUBLIC_PHONE_NUMBER`, falling back to the value exported from
 * `src/data/company.ts`.
 *
 * Validates: Requirement 12.5
 */

import { company } from '@/data/company';

/**
 * Inline phone icon SVG — keeps the component self-contained.
 */
function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * ClickToCallButton renders a green `<a href="tel:…">` element that is only
 * visible on mobile viewports (width ≤ 768 px). It is hidden at the `md`
 * breakpoint and above.
 *
 * The phone number is derived from the `NEXT_PUBLIC_PHONE_NUMBER` environment
 * variable if set; otherwise it falls back to `company.phoneNumber` from
 * `src/data/company.ts`.
 *
 * Minimum touch target: 44 × 44 CSS px (Req 17.3).
 */
export default function ClickToCallButton({ className = '' }: { className?: string }) {
  // Use env var first; fall back to static company data
  const displayNumber =
    process.env.NEXT_PUBLIC_PHONE_NUMBER ?? company.phoneNumber;

  // Build the tel: href — strip all characters except digits, +, and spaces
  // so it is a valid telephone URI regardless of how the number is formatted.
  const telHref = `tel:${displayNumber.replace(/[^\d+]/g, '')}`;

  return (
    <a
      href={telHref}
      aria-label={`Call Greenlife Daily on ${displayNumber}`}
      className={[
        // Only visible on mobile; hidden at md (768 px) and above
        'md:hidden',
        // Layout — minimum touch target 44 × 44 px (Req 17.3)
        'inline-flex items-center gap-2 min-h-[44px] min-w-[44px]',
        // Visual styling — solid green pill button
        'rounded-full bg-green-600 px-5 py-3',
        'text-white text-sm font-semibold leading-none whitespace-nowrap shadow-md',
        // Transitions & interactive states
        'transition-all duration-200 hover:bg-green-700 hover:shadow-lg',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
        'active:bg-green-800 active:scale-95',
        className,
      ].join(' ')}
    >
      <PhoneIcon />
      <span>{displayNumber}</span>
    </a>
  );
}
