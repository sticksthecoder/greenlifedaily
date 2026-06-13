/**
 * QuoteFormHeader — centred heading and subtitle above the quote form.
 */

interface QuoteFormHeaderProps {
  as?: 'h2' | 'h3';
  /** ID for the heading — use with aria-labelledby on a parent section. */
  headingId?: string;
}

export default function QuoteFormHeader({
  as: Heading = 'h2',
  headingId,
}: QuoteFormHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <Heading
        id={headingId}
        className="mb-2 text-center text-xl font-bold text-charcoal sm:text-2xl"
      >
        Request a Quote
      </Heading>
      <p className="mx-auto text-center text-sm text-charcoal-400">
        Fill in your details and we&apos;ll get back to you promptly.
      </p>
    </div>
  );
}
