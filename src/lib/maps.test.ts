import { describe, it, expect } from 'vitest';
import { company } from '@/data/company';
import {
  getCompanyMapQuery,
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
  resolveGoogleMapsEmbedUrl,
} from './maps';

describe('maps helpers', () => {
  it('builds a map query from the company address', () => {
    expect(getCompanyMapQuery()).toContain(company.streetAddress);
    expect(getCompanyMapQuery()).toContain(company.suburb);
    expect(getCompanyMapQuery()).toContain(company.postalCode);
  });

  it('builds a Google Maps embed URL', () => {
    const url = getGoogleMapsEmbedUrl();
    expect(url).toContain('maps.google.com/maps?q=');
    expect(url).toContain('output=embed');
  });

  it('builds a directions URL', () => {
    const url = getGoogleMapsDirectionsUrl();
    expect(url).toContain('google.com/maps/dir/');
    expect(url).toContain('destination=');
  });

  it('falls back to the company address when env override is unset', () => {
    expect(resolveGoogleMapsEmbedUrl()).toBe(getGoogleMapsEmbedUrl());
  });
});
