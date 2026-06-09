/**
 * Sends a test quote email using credentials from .env.local
 * Run: npm run test:email
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');

function loadEnvFile(path) {
  if (!existsSync(path)) {
    console.error('Missing .env.local — copy .env.example and fill in SMTP_PASS.');
    process.exit(1);
  }

  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(envPath);

const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, GREENLIFE_EMAIL } = process.env;

if (!SMTP_USER || !SMTP_PASS) {
  console.error('\nSMTP_PASS is empty in .env.local.');
  console.error('1. Enable 2-Step Verification on your Google account');
  console.error('2. Create an App Password: https://myaccount.google.com/apppasswords');
  console.error('3. Add it to .env.local as SMTP_PASS=your16charpassword');
  console.error('4. Restart the dev server (npm run dev)\n');
  process.exit(1);
}

const transporter = SMTP_HOST?.includes('gmail')
  ? nodemailer.createTransport({ service: 'gmail', auth: { user: SMTP_USER, pass: SMTP_PASS } })
  : nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

const info = await transporter.sendMail({
  from: SMTP_FROM ?? SMTP_USER,
  to: GREENLIFE_EMAIL ?? SMTP_USER,
  subject: 'Greenlife Daily — test quote email',
  text: 'If you received this, the quote form email setup is working.',
  html: '<p>If you received this, the <strong>quote form email setup</strong> is working.</p>',
});

console.log(`\nTest email sent to ${GREENLIFE_EMAIL}`);
console.log(`Message ID: ${info.messageId}\n`);
