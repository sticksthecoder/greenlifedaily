import { NextRequest, NextResponse } from 'next/server';
import { quoteFormSchema } from '@/lib/validation';
import { sendQuoteEmail } from '@/lib/email';
import type { ContactPayload } from '@/lib/email';

/**
 * POST /api/contact
 *
 * Handles quote form submissions.
 *
 * - Validates the request body against the Zod schema (Requirements 11.3, 19.2)
 * - Silently returns 200 if the honeypot field `_gotcha` is populated (Requirement 19.3)
 * - Returns 400 with field error messages on validation failure (Requirement 11.4)
 * - Calls sendQuoteEmail on success and returns 200 (Requirement 11.3)
 * - Logs SMTP errors server-side and returns 500 (Requirement 11.5)
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;

  // Parse JSON body
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }

  // Honeypot check — if _gotcha is populated, silently return 200
  // This prevents bots from knowing their submission was rejected (Requirement 19.3)
  if (
    body !== null &&
    typeof body === 'object' &&
    '_gotcha' in body &&
    typeof (body as Record<string, unknown>)._gotcha === 'string' &&
    (body as Record<string, unknown>)._gotcha !== ''
  ) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Validate request body against Zod schema (Requirement 19.2)
  const parseResult = quoteFormSchema.safeParse(body);

  if (!parseResult.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parseResult.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string' && !(field in fieldErrors)) {
        fieldErrors[field] = issue.message;
      }
    }

    return NextResponse.json(
      { error: 'Validation failed', fieldErrors },
      { status: 400 }
    );
  }

  // Build full payload with server-side timestamp
  const payload: ContactPayload = {
    ...parseResult.data,
    submittedAt: new Date().toISOString(),
  };

  // Send email via Nodemailer (Requirement 11.3)
  try {
    await sendQuoteEmail(payload);
  } catch (err) {
    // Log error server-side without exposing details to the client (Requirement 11.5)
    console.error('[/api/contact] SMTP error at', new Date().toISOString(), err);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again or contact us via WhatsApp.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
