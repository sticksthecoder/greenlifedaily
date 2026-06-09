'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
        Something went wrong
      </p>
      <h1 className="mb-4 text-charcoal">We hit an unexpected error</h1>
      <p className="mb-8 max-w-md text-charcoal-400">
        Please try again. If the problem continues, contact us via WhatsApp or
        the contact page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700"
      >
        Try Again
      </button>
    </main>
  );
}
