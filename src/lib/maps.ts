import { company } from '@/data/company';

/** Full address string used for Google Maps queries and embeds. */
export function getCompanyMapQuery(): string {
  return `${company.streetAddress}, ${company.suburb}, ${company.postalCode}, ${company.city}, ${company.province}, South Africa`;
}

/** Google Maps embed URL — works without an API key. */
export function getGoogleMapsEmbedUrl(query = getCompanyMapQuery()): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=en&output=embed`;
}

/** Opens Google Maps directions to the business address. */
export function getGoogleMapsDirectionsUrl(query = getCompanyMapQuery()): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/** Resolves the embed URL from env override or the default company address. */
export function resolveGoogleMapsEmbedUrl(): string {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim() ||
    getGoogleMapsEmbedUrl()
  );
}
