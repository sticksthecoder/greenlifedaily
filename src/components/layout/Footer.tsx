/**
 * Footer — site-wide footer with navigation and contact details.
 *
 * Requirements: 13.5, 19.4
 */

import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { company } from '@/data/company';
import { NAV_LINKS } from '@/data/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal-100 bg-charcoal-800 text-charcoal-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Logo variant="footer" />
            <p className="mt-4 text-sm leading-relaxed text-charcoal-300">
              Premium vehicle hire across Johannesburg, Pretoria, and Gauteng for
              weddings, corporate events, VIP transport, and special occasions.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-charcoal-200 transition-colors duration-200 hover:text-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-charcoal-200">
              <li>
                <a
                  href={`tel:${company.phoneNumber.replace(/[^\d+]/g, '')}`}
                  className="transition-colors duration-200 hover:text-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                >
                  {company.phoneNumber}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors duration-200 hover:text-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                >
                  {company.email}
                </a>
              </li>
              <li>{company.address}</li>
              <li>{company.businessHours.weekdays}</li>
              <li>{company.businessHours.saturday}</li>
              <li>{company.businessHours.sunday}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-charcoal-700 pt-8">
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
            <div className="hidden flex-1 md:block" aria-hidden="true" />
            <p className="text-center text-sm text-charcoal-300">
              &copy; {currentYear} {company.name}. All rights reserved.
            </p>
            {company.consultantCompanyName ? (
              <p className="flex-1 text-center text-sm text-charcoal-400 md:text-right">
                {company.consultantCompanyUrl ? (
                  <a
                    href={company.consultantCompanyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                  >
                    {company.consultantCompanyName}
                  </a>
                ) : (
                  company.consultantCompanyName
                )}
              </p>
            ) : (
              <div className="hidden flex-1 md:block" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
