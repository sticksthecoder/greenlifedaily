/**
 * SEO smoke tests — metadata, structured data, sitemap, and robots.txt.
 *
 * Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { metadata as homeMetadata } from '@/app/page';
import { metadata as servicesMetadata } from '@/app/services/page';
import { metadata as vehiclesMetadata } from '@/app/vehicles/page';
import { metadata as aboutMetadata } from '@/app/about/page';
import { metadata as contactMetadata } from '@/app/contact/page';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import HomePage from '@/app/page';
import { PUBLIC_PAGE_PATHS, SITE_URL } from '@/lib/site';
import {
  assertDescriptionLength,
  assertOpenGraphTags,
  assertTitleLength,
  resolveMetadataDescription,
  resolveMetadataTitle,
} from '@/lib/seo';

vi.mock('next/image', () => ({
  default: ({
    alt,
    ...props
  }: {
    alt: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element -- test mock for next/image
    <img alt={alt} {...props} />
  ),
}));

const pageMetadata = [
  { name: 'home', metadata: homeMetadata },
  { name: 'services', metadata: servicesMetadata },
  { name: 'vehicles', metadata: vehiclesMetadata },
  { name: 'about', metadata: aboutMetadata },
  { name: 'contact', metadata: contactMetadata },
] as const;

describe('SEO metadata smoke tests', () => {
  it.each(pageMetadata)(
    '$name page has title (50–60 chars), description (150–160 chars), and OG tags',
    ({ metadata }) => {
      const title = resolveMetadataTitle(metadata);
      const description = resolveMetadataDescription(metadata);

      assertTitleLength(title);
      assertDescriptionLength(description);
      assertOpenGraphTags(metadata);
    },
  );
});

describe('Home page structured data', () => {
  it('renders valid Organization and LocalBusiness JSON-LD', () => {
    const { container } = render(<HomePage />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(script).toBeTruthy();

    const structuredData = JSON.parse(script!.textContent!) as Array<{
      '@type': string;
    }>;

    expect(Array.isArray(structuredData)).toBe(true);
    expect(
      structuredData.some((entry) => entry['@type'] === 'Organization'),
    ).toBe(true);
    expect(
      structuredData.some((entry) => entry['@type'] === 'LocalBusiness'),
    ).toBe(true);
  });
});

describe('sitemap.xml generation', () => {
  it('lists all five public pages with lastModified dates', () => {
    const entries = sitemap();

    expect(entries).toHaveLength(PUBLIC_PAGE_PATHS.length);

    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/services`);
    expect(urls).toContain(`${SITE_URL}/vehicles`);
    expect(urls).toContain(`${SITE_URL}/about`);
    expect(urls).toContain(`${SITE_URL}/contact`);

    entries.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });
});

describe('robots.txt generation', () => {
  it('allows all crawlers and references the sitemap', () => {
    const config = robots();

    expect(config.rules).toEqual({
      userAgent: '*',
      allow: '/',
    });
    expect(config.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
