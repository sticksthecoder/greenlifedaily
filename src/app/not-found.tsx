import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
        404
      </p>
      <h1 className="mb-4 text-charcoal">Page Not Found</h1>
      <p className="mb-8 max-w-md text-charcoal-400">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700"
      >
        Back to Home
      </Link>
    </main>
  );
}
