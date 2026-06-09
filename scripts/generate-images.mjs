/**
 * Generates compressed WebP placeholder images for the Greenlife Daily site.
 * Run with: npm run generate:images
 *
 * Replace these placeholders with real photography before production launch.
 */

import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const BRAND = {
  green: '#16a34a',
  greenDark: '#14532d',
  charcoal: '#2D2D2D',
  charcoalDark: '#111111',
};

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildImageSvg({
  width,
  height,
  title,
  subtitle = 'Premium Vehicle Hire',
  fromColor,
  toColor,
}) {
  const titleSize = Math.max(28, Math.round(width * 0.04));
  const subtitleSize = Math.max(16, Math.round(width * 0.022));
  const footerY = height - Math.round(height * 0.06);

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${fromColor}" />
        <stop offset="100%" stop-color="${toColor}" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <rect x="0" y="${Math.round(height * 0.68)}" width="100%" height="${Math.round(height * 0.32)}" fill="rgba(0,0,0,0.38)" />
    <text x="50%" y="42%" text-anchor="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="700">${escapeXml(title)}</text>
    <text x="50%" y="52%" text-anchor="middle" fill="#dcfce7" font-family="Arial, Helvetica, sans-serif" font-size="${subtitleSize}">${escapeXml(subtitle)}</text>
    <text x="32" y="${footerY}" fill="#86efac" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600">Greenlife Daily</text>
  </svg>`;
}

function buildMapSvg(width, height) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#e8f5e9" />
    <path d="M0 ${height * 0.35} C ${width * 0.25} ${height * 0.15}, ${width * 0.45} ${height * 0.55}, ${width} ${height * 0.25} L ${width} ${height} L 0 ${height} Z" fill="#bbf7d0" />
    <path d="M0 ${height * 0.55} C ${width * 0.35} ${height * 0.4}, ${width * 0.6} ${height * 0.75}, ${width} ${height * 0.5} L ${width} ${height} L 0 ${height} Z" fill="#86efac" />
    <circle cx="${width * 0.52}" cy="${height * 0.42}" r="18" fill="${BRAND.green}" />
    <circle cx="${width * 0.52}" cy="${height * 0.42}" r="8" fill="#ffffff" />
    <text x="50%" y="12%" text-anchor="middle" fill="${BRAND.charcoal}" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700">Johannesburg &amp; Pretoria</text>
    <text x="50%" y="20%" text-anchor="middle" fill="#4a4a4a" font-family="Arial, Helvetica, sans-serif" font-size="18">Gauteng Service Area</text>
  </svg>`;
}

function buildLogoSvg(size) {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50%" cy="50%" r="48%" fill="${BRAND.green}" />
    <text x="50%" y="56%" text-anchor="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(size * 0.28)}" font-weight="700">GD</text>
  </svg>`;
}

async function writeWebpFromSvg(svg, outputPath, quality = 82) {
  await mkdir(dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg)).webp({ quality, effort: 4 }).toFile(outputPath);
}

const vehicleImages = [
  { file: 'ford-mustang-gt.webp', title: 'Ford Mustang GT' },
  { file: 'mercedes-v-class.webp', title: 'Mercedes-Benz V-Class' },
  { file: 'range-rover-autobiography.webp', title: 'Range Rover Autobiography' },
  { file: 'mercedes-g63.webp', title: 'Mercedes-AMG G63' },
  { file: 'lamborghini-urus.webp', title: 'Lamborghini Urus' },
  { file: 'porsche-cayenne.webp', title: 'Porsche Cayenne' },
  { file: 'maserati-granturismo-mc-stradale.webp', title: 'Maserati GranTurismo MC Stradale' },
  { file: 'bmw-m4-g82.webp', title: 'BMW M4 G82' },
  { file: 'placeholder.webp', title: 'Premium Vehicle' },
];

const ogImages = [
  'og-default.webp',
  'og-home.webp',
  'og-services.webp',
  'og-vehicles.webp',
  'og-about.webp',
  'og-contact.webp',
];

const serviceIcons = {
  'luxury-vehicle.svg': 'M5 17h14l-1.5-9H6.5L5 17zm2.5-11h9l1-4H6.5l1 4z',
  'matric-dance.svg':
    'M12 2l2.4 4.8L20 8l-4 3.9.9 5.5L12 15.8 7.1 17.4 8 11.9 4 8l5.6-1.2L12 2z',
  'wedding.svg':
    'M12 21s-7-4.35-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.65-7 10-7 10z',
  'executive-transport.svg':
    'M4 7h16v10H4V7zm2 2v6h12V9H6zm2 8h2v2H8v-2zm6 0h2v2h-2v-2z',
  'airport-transfers.svg': 'M2 19h20v2H2v-2zm18.5-8-1.42 1.42L16 7.84V19h-2V7.84l-3.08 3.58L9.5 11 16 4.5l6.5 6.5z',
  'corporate-rentals.svg':
    'M3 21h18V8l-9-5-9 5v13zm4-2h10v-8H7v8zm2-6h2v4H9v-4zm4 0h2v4h-2v-4z',
  'vip-escort.svg':
    'M12 1 14 7h6l-5 4 2 6-7-4-7 4 2-6-5-4h6l2-6z',
  'music-video.svg':
    'M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z',
  'film-production.svg':
    'M4 4h16v16H4V4zm2 2v4h2V6H6zm4 0v4h2V6h-2zm4 0v4h2V6h-2zM6 14v4h2v-4H6zm4 0v4h2v-4h-2zm4 0v4h2v-4h-2z',
};

function buildIconSvg(pathD) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#16a34a" aria-hidden="true"><path d="${pathD}"/></svg>`;
}

async function main() {
  await mkdir(join(publicDir, 'images', 'vehicles'), { recursive: true });

  await writeWebpFromSvg(
    buildImageSvg({
      width: 1920,
      height: 1080,
      title: 'Premium Vehicle Hire',
      subtitle: 'For Every Occasion',
      fromColor: BRAND.charcoalDark,
      toColor: BRAND.greenDark,
    }),
    join(publicDir, 'images', 'hero-vehicle.webp'),
    85,
  );

  await writeWebpFromSvg(
    buildMapSvg(1200, 900),
    join(publicDir, 'images', 'map-fallback.webp'),
    80,
  );

  await writeWebpFromSvg(
    buildLogoSvg(512),
    join(publicDir, 'images', 'logo.webp'),
    90,
  );

  for (const vehicle of vehicleImages) {
    await writeWebpFromSvg(
      buildImageSvg({
        width: 1200,
        height: 750,
        title: vehicle.title,
        subtitle: 'Greenlife Daily Fleet',
        fromColor: '#1a1a1a',
        toColor: BRAND.greenDark,
      }),
      join(publicDir, 'images', 'vehicles', vehicle.file),
      82,
    );
  }

  for (const ogImage of ogImages) {
    await writeWebpFromSvg(
      buildImageSvg({
        width: 1200,
        height: 630,
        title: 'Greenlife Daily',
        subtitle: 'Premium Vehicle Hire South Africa',
        fromColor: BRAND.green,
        toColor: BRAND.charcoal,
      }),
      join(publicDir, 'images', ogImage),
      84,
    );
  }

  const iconsDir = join(publicDir, 'icons');
  await mkdir(iconsDir, { recursive: true });

  for (const [filename, pathD] of Object.entries(serviceIcons)) {
    await writeFile(join(iconsDir, filename), buildIconSvg(pathD), 'utf8');
  }

  console.log('Generated WebP images in public/images/ and SVG icons in public/icons/');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
