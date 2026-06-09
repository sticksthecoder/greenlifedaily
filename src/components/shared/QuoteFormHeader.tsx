/**
 * QuoteFormHeader — centred heading and subtitle above the quote form.
 */

interface QuoteFormHeaderProps {
  as?: 'h2' | 'h3';
}

export default function QuoteFormHeader({ as: Heading = 'h2' }: QuoteFormHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <Heading className="mb-2 text-center text-xl font-bold text-charcoal sm:text-2xl">
        Request a Quote
      </Heading>
      <p className="mx-auto text-center text-sm text-charcoal-400">
        Fill in your details and we&apos;ll get back to you promptly.
      </p>
    </div>
  );
}
