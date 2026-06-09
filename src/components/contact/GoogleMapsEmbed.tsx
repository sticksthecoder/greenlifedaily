'use client';

/**
 * GoogleMapsEmbed — Google Maps iframe with static image fallback on failure.
 *
 * Requirements: 11.8, 11.9
 */

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { company } from '@/data/company';
import {
  getGoogleMapsDirectionsUrl,
  resolveGoogleMapsEmbedUrl,
} from '@/lib/maps';

const MAP_FALLBACK_SRC = '/images/map-fallback.webp';
const LOAD_TIMEOUT_MS = 8000;

type MapLoadState = 'loading' | 'loaded' | 'failed';

export default function GoogleMapsEmbed() {
  const embedUrl = useMemo(() => resolveGoogleMapsEmbedUrl(), []);
  const directionsUrl = useMemo(() => getGoogleMapsDirectionsUrl(), []);
  const [loadState, setLoadState] = useState<MapLoadState>('loading');

  useEffect(() => {
    if (loadState !== 'loading') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setLoadState((current) => (current === 'loading' ? 'failed' : current));
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [loadState]);

  function handleLoad() {
    setLoadState('loaded');
  }

  function handleError() {
    setLoadState('failed');
  }

  if (loadState === 'failed') {
    return (
      <div className="space-y-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-charcoal-100 ring-1 ring-charcoal-200">
          <Image
            src={MAP_FALLBACK_SRC}
            alt={`Map showing Greenlife Daily at ${company.address}, Johannesburg`}
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center text-sm font-semibold text-green-700 transition-colors duration-200 hover:text-green-800"
        >
          Open {company.address} in Google Maps
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-charcoal-100 ring-1 ring-charcoal-200">
        <iframe
          title={`Greenlife Daily — ${company.address}`}
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center text-sm font-semibold text-green-700 transition-colors duration-200 hover:text-green-800"
      >
        Get directions to {company.address}
      </a>
    </div>
  );
}
