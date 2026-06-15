'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const HERO_CTA_ID = 'hero-primary-ctas';

/**
 * On the home page, floating CTAs stay hidden while the hero quote/WhatsApp
 * buttons are visible. On all other pages they are always shown.
 */
export function useFloatingCtaVisibility(): boolean {
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname !== '/');

  useEffect(() => {
    if (pathname !== '/') {
      setVisible(true);
      return;
    }

    const target = document.getElementById(HERO_CTA_ID);
    if (!target) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  return visible;
}
