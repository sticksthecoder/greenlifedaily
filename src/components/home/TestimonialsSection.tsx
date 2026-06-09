'use client';

/**
 * TestimonialsSection — auto-advancing carousel with prev/next controls.
 *
 * Requirements: 5.1, 5.2, 5.3, 5.4, 16.5
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { testimonials } from '@/data/testimonials';

/** Render up to 5 filled/empty stars */
function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-charcoal-200'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const AUTO_ADVANCE_MS = 5000;
const TRANSITION_MS = 300; // Req 5.4

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = testimonials.length;

  /** Navigate to a specific slide index with transition guard */
  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(((index % total) + total) % total);
        setIsTransitioning(false);
      }, TRANSITION_MS);
    },
    [isTransitioning, total],
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  /** Auto-advance every AUTO_ADVANCE_MS ms */
  useEffect(() => {
    timerRef.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, goNext]);

  /** Keyboard navigation on the carousel */
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  }

  const testimonial = testimonials[current];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
            Client Stories
          </p>
          <h2
            id="testimonials-heading"
            className="text-charcoal"
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel (Req 5.1, 16.5) */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          onKeyDown={handleKeyDown}
        >
          {/* Slide */}
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${current + 1} of ${total}: ${testimonial.reviewerName}`}
            aria-live="polite"
            aria-atomic="true"
            className={`transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <blockquote className="mx-auto max-w-2xl rounded-2xl bg-charcoal-50 p-8 text-center shadow-sm ring-1 ring-charcoal-100 sm:p-10">
              {/* Opening quote */}
              <span
                className="mb-4 block text-5xl leading-none text-green-600/30"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Review text (Req 5.2) */}
              <p className="mb-6 text-base leading-relaxed text-charcoal-500 sm:text-lg">
                {testimonial.reviewText}
              </p>

              {/* Star rating (Req 5.2) */}
              <div className="mb-4 flex justify-center">
                <StarRating rating={testimonial.starRating} />
              </div>

              {/* Reviewer name (Req 5.2) */}
              <footer>
                <cite className="text-sm font-semibold not-italic text-charcoal">
                  {testimonial.reviewerName}
                </cite>
              </footer>
            </blockquote>
          </div>

          {/* Navigation controls (Req 5.3) */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {/* Previous */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-charcoal-200 text-charcoal-400 transition-colors duration-200 hover:border-green-600 hover:text-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17 10a.75.75 0 0 1-.75.75H6.612l3.158 3.96a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 1 1 1.04 1.08L6.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                />
              </svg>
            </button>

            {/* Dot indicators */}
            <div
              role="tablist"
              aria-label="Testimonial navigation"
              className="flex gap-2"
            >
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}: ${t.reviewerName}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
                    i === current
                      ? 'w-8 bg-green-600'
                      : 'w-2.5 bg-charcoal-200 hover:bg-charcoal-400'
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-charcoal-200 text-charcoal-400 transition-colors duration-200 hover:border-green-600 hover:text-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              <svg
                className="h-5 w-5"
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
        </div>
      </div>
    </section>
  );
}
