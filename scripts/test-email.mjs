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
    console.error('Missing .env.local — copy .env.example and fill in SMTP settings.');
    process.exit(1);
  }

  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    const isDoubleQuoted = value.startsWith('"') && value.endsWith('"');
    const isSingleQuoted = value.startsWith("'") && value.endsWith("'");
    if (isDoubleQuoted || isSingleQuoted) {
      value = value.slice(1, -1);
    }
    if (isDoubleQuoted) {
      value = value.replace(/\\(\$|"|\\)/g, '$1');
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(envPath);

const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, GREENLIFE_EMAIL } = process.env;
const port = Number(process.env.SMTP_PORT ?? 587);

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.error('\nSMTP settings are incomplete in .env.local.');
  console.error('Set SMTP_HOST, SMTP_USER, and SMTP_PASS from your email provider.');
  console.error('Example for mariam@greenlifedaily.co.za:');
  console.error('  SMTP_HOST=mail.greenlifedaily.co.za');
  console.error('  SMTP_PORT=587');
  console.error('  SMTP_USER=mariam@greenlifedaily.co.za');
  console.error('  SMTP_PASS=your-mailbox-password\n');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  requireTLS: port === 587,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transporter.verify();
} catch (err) {
  const error = err instanceof Error ? err : new Error(String(err));
  console.error('\nSMTP connection failed.');
  console.error(`Host: ${SMTP_HOST}:${port}`);
  console.error(`User: ${SMTP_USER}`);
  console.error(`Password loaded: ${SMTP_PASS ? `yes (${SMTP_PASS.length} characters)` : 'no — check .env.local'}`);

  if ('code' in error && error.code === 'EAUTH') {
    console.error('\n535 Incorrect authentication data usually means:');
    console.error('- Wrong mailbox password (reset it in your hosting control panel)');
    console.error('- Mailbox mariam@greenlifedaily.co.za does not exist yet');
    console.error('- SMTP_USER must be the full email address');
    console.error('- If the password contains # or $, use single quotes in .env.local, e.g. SMTP_PASS=\'your#pass\'');
    console.error('\nConfirm you can log in at webmail with the same email and password.');
  }

  throw error;
}

const info = await transporter.sendMail({
  from: SMTP_FROM ?? SMTP_USER,
  to: GREENLIFE_EMAIL ?? SMTP_USER,
  subject: 'Greenlife Daily — test quote email',
  text: 'If you received this, the quote form email setup is working.',
  html: '<p>If you received this, the <strong>quote form email setup</strong> is working.</p>',
});

console.log(`\nTest email sent to ${GREENLIFE_EMAIL ?? SMTP_USER}`);
console.log(`Message ID: ${info.messageId}\n`);
