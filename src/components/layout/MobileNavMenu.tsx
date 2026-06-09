'use client';

/**
 * MobileNavMenu — full-screen mobile navigation rendered in a portal.
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import ClickToCallButton from '@/components/shared/ClickToCallButton';
import { NAV_LINKS, QUOTE_FORM_HREF } from '@/data/navigation';

interface MobileNavMenuProps {
  open: boolean;
  drawerId: string;
  pathname: string;
  onClose: () => void;
  isActivePath: (pathname: string, href: string) => boolean;
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function MobileNavMenu({
  open,
  drawerId,
  pathname,
  onClose,
  isActivePath,
}: MobileNavMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] md:hidden" aria-hidden={!open}>
      <button
        type="button"
        className="absolute inset-0 bg-charcoal-900/50"
        aria-label="Close navigation menu"
        onClick={onClose}
      />

      <nav
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-charcoal-100 px-4 py-4">
          <span className="text-sm font-semibold text-charcoal-600">Menu</span>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-charcoal-600 transition-colors duration-200 hover:bg-charcoal-50 hover:text-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <li key={link.href} className="mb-1">
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'flex min-h-[48px] items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200',
                    active
                      ? 'bg-green-50 text-green-700'
                      : 'text-charcoal-700 hover:bg-charcoal-50 hover:text-green-700',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
                  ].join(' ')}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 flex-col gap-3 border-t border-charcoal-100 px-4 py-4">
          <ClickToCallButton className="w-full justify-center" />
          <Link
            href={QUOTE_FORM_HREF}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-95"
            onClick={onClose}
          >
            Request a Quote
          </Link>
        </div>
      </nav>
    </div>,
    document.body,
  );
}
