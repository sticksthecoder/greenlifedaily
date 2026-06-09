import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  /** Navbar uses a compact size; footer uses a larger mark. */
  variant?: 'navbar' | 'footer';
  className?: string;
}

/** Source dimensions — updated when logo asset changes. */
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 682;

const SOURCES = {
  navbar: '/images/logo.png',
  footer: '/images/logo-dark.png',
} as const;

const SIZES = {
  navbar: 'h-16 w-auto sm:h-[4.5rem] md:h-20',
  footer: 'h-24 w-auto sm:h-28 md:h-32',
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
