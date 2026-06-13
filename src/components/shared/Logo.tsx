import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  /** Navbar uses a compact size; footer uses a larger mark. */
  variant?: 'navbar' | 'footer';
  className?: string;
}

/** Source dimensions — updated when logo asset changes. */
const LOGO_WIDTH = 568;
const LOGO_HEIGHT = 439;

const SOURCES = {
  navbar: '/images/logo.png',
  footer: '/images/logo.png',
} as const;

const SIZES = {
  navbar: 'h-20 w-auto sm:h-24 md:h-28',
  footer: 'h-28 w-auto sm:h-32 md:h-40',
} as const;

export default function Logo({ variant = 'navbar', className = '' }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-[44px] items-center rounded-lg transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${className}`}
      aria-label="Greenlife Daily — home"
    >
      <Image
        src={SOURCES[variant]}
        alt="Greenlife Daily Car Rental Company"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={variant === 'navbar'}
        className={SIZES[variant]}
      />
    </Link>
  );
}
