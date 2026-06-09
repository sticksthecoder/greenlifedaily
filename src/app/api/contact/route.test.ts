/**
 * Integration tests for POST /api/contact Route Handler
 *
 * Requirements: 11.3, 11.4, 11.5, 19.3
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

// ---------------------------------------------------------------------------
// Mock the email helper so no real SMTP calls are made
// ---------------------------------------------------------------------------

vi.mock('@/lib/email', () => ({
  sendQuoteEmail: vi.fn(),
}));

// Import the mock AFTER vi.mock so we get the mocked version
import { sendQuoteEmail } from '@/lib/email';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns an ISO date string for a date N days from today. */
function futureDateISO(daysFromToday = 7): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

/** Builds a minimal NextRequest for the App Router route handler. */
function buildRequest(payload: unknown): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
}

/** A valid payload that passes all Zod validation rules. */
const validPayload = {
  fullName: 'Jane Doe',
  phoneNumber: '+27821234567',
  emailAddress: 'jane@example.com',
  serviceRequired: 'Luxury Vehicle Hire',
  rentalDate: futureDateISO(7),
  message: 'Please provide a quote for a wedding transfer.',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /api/contact Route Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // Scenario 1: Valid payload → 200 and mailer called once
  // Validates: Requirements 11.3
  // -------------------------------------------------------------------------
  it('returns 200 and calls sendQuoteEmail once for a valid payload', async () => {
    // Arrange: sendQuoteEmail resolves successfully (default mock behaviour)
    vi.mocked(sendQuoteEmail).mockResolvedValueOnce(undefined);

    // Act
    const response = await POST(buildRequest(validPayload));
    const body = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true });
    expect(sendQuoteEmail).toHaveBeenCalledTimes(1);
    // The handler appends submittedAt server-side; verify the rest matches
    expect(vi.mocked(sendQuoteEmail).mock.calls[0][0]).toMatchObject(validPayload);
  });

  // -------------------------------------------------------------------------
  // Scenario 2: _gotcha populated (honeypot) → 200 but mailer NOT called
  // Validates: Requirement 19.3
  // -------------------------------------------------------------------------
  it('returns 200 silently when the honeypot field _gotcha is populated', async () => {
    // Arrange
    const botPayload = { ...validPayload, _gotcha: 'I am a bot' };

    // Act
    const response = await POST(buildRequest(botPayload));
    const body = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true });
    // Mailer must NOT have been called — bots are silently rejected
    expect(sendQuoteEmail).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // Scenario 3: Missing required field → 400 with error details
  // Validates: Requirement 11.4
  // -------------------------------------------------------------------------
  it('returns 400 with fieldErrors when a required field is missing', async () => {
    // Arrange: omit emailAddress
    const missingEmailPayload = { ...validPayload };
    delete (missingEmailPayload as Partial<typeof validPayload>).emailAddress;

    // Act
    const response = await POST(buildRequest(missingEmailPayload));
    const body = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(body.error).toBe('Validation failed');
    expect(body.fieldErrors).toBeDefined();
    expect(typeof body.fieldErrors).toBe('object');
    // The missing field should appear in fieldErrors
    expect(body.fieldErrors.emailAddress).toBeDefined();
    // Mailer should not have been called
    expect(sendQuoteEmail).not.toHaveBeenCalled();
  });

  it('returns 400 with fieldErrors when all required fields are missing', async () => {
    // Act
    const response = await POST(buildRequest({}));
    const body = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(body.error).toBe('Validation failed');
    expect(body.fieldErrors).toBeDefined();
    // Expect errors for each required field
    expect(body.fieldErrors.fullName).toBeDefined();
    expect(body.fieldErrors.emailAddress).toBeDefined();
    expect(body.fieldErrors.phoneNumber).toBeDefined();
    expect(sendQuoteEmail).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // Scenario 4: SMTP error → 500 response
  // Validates: Requirement 11.5
  // -------------------------------------------------------------------------
  it('returns 500 when sendQuoteEmail throws an SMTP error', async () => {
    // Arrange: make sendQuoteEmail reject with an SMTP-style error
    vi.mocked(sendQuoteEmail).mockRejectedValueOnce(new Error('SMTP connection refused'));

    // Act
    const response = await POST(buildRequest(validPayload));
    const body = await response.json();

    // Assert
    expect(response.status).toBe(500);
    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
    // Should mention retrying or WhatsApp
    expect(body.error).toMatch(/try again|WhatsApp/i);
    // sendQuoteEmail was attempted once
    expect(sendQuoteEmail).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // Edge case: malformed JSON body → 400
  // -------------------------------------------------------------------------
  it('returns 400 when the request body is not valid JSON', async () => {
    const badRequest = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: 'not-json{{{',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(badRequest);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBeDefined();
    expect(sendQuoteEmail).not.toHaveBeenCalled();
  });
});
