/**
 * Converts user-provided hero carousel photos to optimised WebP files.
 * Run with: node scripts/process-hero-images.mjs
 */

import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const assetsDir =
  process.env.HERO_ASSETS_DIR ??
  'C:\\Users\\simph\\.cursor\\projects\\c-dev-Kiro-Greenlife-Daily\\assets';
const outputDir = join(projectRoot, 'public', 'images', 'hero');

const HERO_SOURCES = [
  {
    source:
      'c__Users_simph_AppData_Roaming_Cursor_User_workspaceStorage_9bc3d7a4bfe3152d1cc8f7a5e2771c3a_images_GwagonMatric1-209325b1-15ad-4359-b847-602c50d3d328.png',
    output: 'mercedes-gwagon-luxury.webp',
  },
  {
    source:
      'c__Users_simph_AppData_Roaming_Cursor_User_workspaceStorage_9bc3d7a4bfe3152d1cc8f7a5e2771c3a_images_MarriredCoupleGwagon-796b2267-52b8-4630-9160-338b280fea9a.png',
    output: 'wedding-gwagon-couple.webp',
  },
  {
    source:
      'c__Users_simph_AppData_Roaming_Cursor_User_workspaceStorage_9bc3d7a4bfe3152d1cc8f7a5e2771c3a_images_C220InAction-511f68d9-5ef2-4e52-9bda-647504feab57.png',
    output: 'film-production-c220.webp',
  },
  {
    source:
      'c__Users_simph_AppData_Roaming_Cursor_User_workspaceStorage_9bc3d7a4bfe3152d1cc8f7a5e2771c3a_images_I8Matric-0f545802-9743-4427-8da3-828767d506a8.png',
    output: 'bmw-i8-matric-dance.webp',
  },
  {
    source:
      'c__Users_simph_AppData_Roaming_Cursor_User_workspaceStorage_9bc3d7a4bfe3152d1cc8f7a5e2771c3a_images_ProductionPicture1-12d8a7f0-529f-4e48-851f-b8e9eda9e8db.png',
    output: 'music-video-production.webp',
  },
];

const MAX_WIDTH = 1920;

async function processHeroImage({ source, output }) {
  const inputPath = join(assetsDir, source);
  const outputPath = join(outputDir, output);

  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath);

  console.log(`✓ ${output}`);
}

await mkdir(outputDir, { recursive: true });

for (const image of HERO_SOURCES) {
  await processHeroImage(image);
}

console.log(`\nProcessed ${HERO_SOURCES.length} hero images → public/images/hero/`);
