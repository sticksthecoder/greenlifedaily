/**
 * Processes logo assets for navbar (light) and footer (dark) backgrounds.
 * Run: node scripts/process-logo.mjs
 */

import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const assetsDir =
  process.env.LOGO_ASSETS_DIR ??
  'C:\\Users\\simph\\.cursor\\projects\\c-dev-Kiro-Greenlife-Daily\\assets';

const SOURCE_CANDIDATES = [
  'c__Users_simph_AppData_Roaming_Cursor_User_workspaceStorage_9bc3d7a4bfe3152d1cc8f7a5e2771c3a_images_GreelifeDaily-bc2fc995-17e6-4918-8e1a-8191ec921295.png',
  'c__Users_simph_AppData_Roaming_Cursor_User_workspaceStorage_9bc3d7a4bfe3152d1cc8f7a5e2771c3a_images_GLD_lgog-498980d8-5d64-438d-ae56-3c5009b1bf18.png',
];

function findSource() {
  for (const file of SOURCE_CANDIDATES) {
    const path = join(assetsDir, file);
    if (existsSync(path)) return path;
  }
  return join(projectRoot, 'public', 'images', 'logo-dark.png');
}

async function writePngWebp(data, info, pngPath) {
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(pngPath);

  await sharp(pngPath)
    .webp({ quality: 92, effort: 4 })
    .toFile(pngPath.replace(/\.png$/, '.webp'));
}

async function processLogos(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const darkData = Buffer.from(data);
  const lightData = Buffer.from(data);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isBlackBg = r < 50 && g < 50 && b < 50;
    const isLightText = r > 210 && g > 210 && b > 210;

    if (isBlackBg) {
      lightData[i + 3] = 0;
    }

    if (isLightText) {
      lightData[i] = 45;
      lightData[i + 1] = 45;
      lightData[i + 2] = 45;
      lightData[i + 3] = 255;
    }
  }

  const imagesDir = join(projectRoot, 'public', 'images');
  await writePngWebp(darkData, info, join(imagesDir, 'logo-dark.png'));
  await writePngWebp(lightData, info, join(imagesDir, 'logo.png'));

  return info;
}

const source = findSource();
const meta = await processLogos(source);
console.log(`✓ Logos saved (${meta.width}x${meta.height})`);
console.log('  public/images/logo.png      — navbar (transparent, dark tagline)');
console.log('  public/images/logo-dark.png — footer (dark background)');
