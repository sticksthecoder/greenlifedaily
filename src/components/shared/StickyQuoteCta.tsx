'use client';

/**
 * StickyQuoteCta — fixed quote button anchored above the WhatsApp FAB.
 *
 * Validates: Requirements 12.3, 12.4
 */

import Link from 'next/link';
import { QUOTE_FORM_HREF } from '@/data/navigation';
import { useFloatingCtaVisibility } from '@/hooks/useFloatingCtaVisibility';

function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 shrink-0"
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

export default function StickyQuoteCta() {
  const visible = useFloatingCtaVisibility();

  return (
    <Link
      href={QUOTE_FORM_HREF}
      aria-label="Request a quote"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={[
        'fixed bottom-24 right-4 z-40',
        'flex min-h-[52px] min-w-[52px] items-center justify-center',
        'rounded-full bg-green-600 p-3.5 text-white shadow-lg',
        'transition-all duration-300 hover:bg-green-700 hover:shadow-xl',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
        'active:scale-95 active:bg-green-800',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0',
      ].join(' ')}
    >
      <QuoteIcon />
    </Link>
  );
}
