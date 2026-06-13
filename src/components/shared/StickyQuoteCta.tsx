/**
 * StickyQuoteCta — fixed "Request a Quote" button visible at all scroll positions.
 *
 * Positioned at the bottom-right of the viewport, above the WhatsApp floating
 * button (which typically sits at bottom-right at a lower z-index). The button
 * links to the quote form anchor on the home or contact page.
 *
 * Validates: Requirements 12.3, 12.4
 */

import Link from 'next/link';
import { QUOTE_FORM_HREF } from '@/data/navigation';

/**
 * Inline SVG for the document/quote icon — no external image request.
 */
function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75-6.75a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
        clipRule="evenodd"
      />
      <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
    </svg>
  );
}

/**
 * StickyQuoteCta renders a fixed green "Request a Quote" button anchored to
 * the bottom-right of the screen. It is visible on every page at every scroll
 * position and navigates the visitor to the quote form section.
 *
 * Positioning note: `bottom-24` (6 rem) gives clearance above a WhatsApp
 * floating button that typically sits at `bottom-6`. Adjust if the WhatsApp
 * button uses a different offset.
 */
export default function StickyQuoteCta() {
  return (
    <Link
      href={QUOTE_FORM_HREF}
      aria-label="Request a quote"
      className={[
        'fixed bottom-24 right-4 z-40',
        'flex items-center justify-center min-h-[52px] min-w-[52px]',
        'rounded-full bg-green-600 p-3.5',
        'text-white shadow-lg',
        'transition-all duration-200 hover:bg-green-700 hover:shadow-xl',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
        'active:bg-green-800 active:scale-95',
      ].join(' ')}
    >
      <QuoteIcon />
    </Link>
  );
}
