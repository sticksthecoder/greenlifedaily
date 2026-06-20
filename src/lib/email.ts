import nodemailer from 'nodemailer';

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------

export interface QuoteFormValues {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  serviceRequired: string;
  rentalDate: string;
  message: string;
  _gotcha?: string;
}

/** The full payload POSTed to /api/contact (server-side submittedAt added). */
export interface ContactPayload extends QuoteFormValues {
  submittedAt: string; // ISO timestamp
}

// -----------------------------------------------------------------------
// Transporter
// -----------------------------------------------------------------------

/**
 * Creates a reusable Nodemailer transporter from environment variables.
 * Validated at send-time so Next.js doesn't fail at import on the client.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      'Missing SMTP configuration. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in your environment.',
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
  });
}

// -----------------------------------------------------------------------
// Email helper
// -----------------------------------------------------------------------

/**
 * Sends a formatted quote-request email to the Greenlife Daily inbox.
 *
 * @param payload - The validated contact form payload (including server-side timestamp).
 */
export async function sendQuoteEmail(payload: ContactPayload): Promise<void> {
  const from = process.env.SMTP_FROM;
  const to = process.env.GREENLIFE_EMAIL;

  if (!from || !to) {
    throw new Error(
      'Missing email recipient configuration. Ensure SMTP_FROM and GREENLIFE_EMAIL are set.'
    );
  }

  const subject = `New Quote Request \u2013 ${payload.serviceRequired} \u2013 ${payload.fullName}`;

  const html = buildHtmlBody(payload);
  const text = buildTextBody(payload);

  const transporter = createTransporter();

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.emailAddress,
    subject,
    html,
    text,
  });
}

// -----------------------------------------------------------------------
// Template builders
// -----------------------------------------------------------------------

function buildHtmlBody(payload: ContactPayload): string {
  const formattedDate = payload.rentalDate
    ? new Date(payload.rentalDate).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : payload.rentalDate;

  const formattedTimestamp = new Date(payload.submittedAt).toLocaleString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Johannesburg',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Quote Request</title>
  <style>
    body { font-family: Arial, sans-serif; color: #1a1a1a; background-color: #f5f5f5; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
    .header { background-color: #166534; padding: 24px 32px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px; }
    .value { font-size: 15px; color: #111827; line-height: 1.5; white-space: pre-wrap; word-break: break-word; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .footer { background-color: #f9fafb; padding: 16px 32px; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>&#128203; New Quote Request</h1>
    </div>
    <div class="body">

      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${escapeHtml(payload.fullName)}</div>
      </div>

      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${escapeHtml(payload.phoneNumber)}</div>
      </div>

      <div class="field">
        <div class="label">Email Address</div>
        <div class="value">${escapeHtml(payload.emailAddress)}</div>
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="label">Service Required</div>
        <div class="value">${escapeHtml(payload.serviceRequired)}</div>
      </div>

      <div class="field">
        <div class="label">Rental Date</div>
        <div class="value">${escapeHtml(formattedDate)}</div>
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="label">Message</div>
        <div class="value">${escapeHtml(payload.message)}</div>
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="label">Submitted At</div>
        <div class="value">${escapeHtml(formattedTimestamp)} (SAST)</div>
      </div>

    </div>
    <div class="footer">
      This email was automatically generated by the Greenlife Daily website quote form.
    </div>
  </div>
</body>
</html>
`.trim();
}

function buildTextBody(payload: ContactPayload): string {
  return [
    'NEW QUOTE REQUEST',
    '=================',
    '',
    `Full Name:       ${payload.fullName}`,
    `Phone Number:    ${payload.phoneNumber}`,
    `Email Address:   ${payload.emailAddress}`,
    '',
    `Service Required: ${payload.serviceRequired}`,
    `Rental Date:     ${payload.rentalDate}`,
    '',
    `Message:`,
    payload.message,
    '',
    '---',
    `Submitted At: ${payload.submittedAt}`,
  ].join('\n');
}

// -----------------------------------------------------------------------
// Utility
// -----------------------------------------------------------------------

/** Minimal HTML escaping to prevent XSS in the email body. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
