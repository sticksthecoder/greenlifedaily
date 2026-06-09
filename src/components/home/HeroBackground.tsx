'use client';

/**
 * HeroBackground — rotating full-bleed vehicle images for the home hero.
 * Cycles every 5 seconds with a crossfade transition.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { heroImages } from '@/data/hero-images';

const INTERVAL_MS = 5000;

export default function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {heroImages.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/80" />
    </div>
  );
}
