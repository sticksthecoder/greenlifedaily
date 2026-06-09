/**
 * Verifies required static image assets exist in /public.
 *
 * Requirements: 15.4, 16.1
 */

import { existsSync } from 'fs';
import { join } from 'path';
import { describe, it, expect } from 'vitest';
import { heroImages } from '@/data/hero-images';
import { services } from '@/data/services';
import { vehicles } from '@/data/vehicles';

const publicDir = join(process.cwd(), 'public');

const sharedImages = [
  'images/hero-vehicle.webp',
  'images/map-fallback.webp',
  'images/logo.png',
  'images/logo-dark.png',
  'images/logo.webp',
  'images/logo-dark.webp',
  'images/og-default.webp',
  'images/og-home.webp',
  'images/og-services.webp',
  'images/og-vehicles.webp',
  'images/og-about.webp',
  'images/og-contact.webp',
  'images/vehicles/placeholder.webp',
];

describe('static image assets', () => {
  it('includes all shared WebP images', () => {
    sharedImages.forEach((relativePath) => {
      expect(existsSync(join(publicDir, relativePath))).toBe(true);
    });
  });

  it('includes a WebP file for every vehicle image reference', () => {
    vehicles.forEach((vehicle) => {
      vehicle.images.forEach((imagePath) => {
        const relativePath = imagePath.replace(/^\//, '');
        expect(existsSync(join(publicDir, relativePath))).toBe(true);
      });
    });
  });

  it('includes a WebP file for every hero carousel image', () => {
    heroImages.forEach((image) => {
      const relativePath = image.src.replace(/^\//, '');
      expect(existsSync(join(publicDir, relativePath))).toBe(true);
    });
  });

  it('includes an SVG icon for every service', () => {
    services.forEach((service) => {
      const relativePath = service.icon.replace(/^\//, '');
      expect(existsSync(join(publicDir, relativePath))).toBe(true);
    });
  });
});
