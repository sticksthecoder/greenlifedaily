/**
 * Unit tests for src/lib/validation.ts
 *
 * Covers:
 *  - Required-field validation
 *  - South African phone number format acceptance / rejection
 *  - Rental date ISO format and past-date rejection
 *  - Honeypot field rejection when populated
 *  - Full valid submission acceptance
 */

import { describe, it, expect } from 'vitest';
import { quoteFormSchema, serviceCategories } from './validation';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns a fully valid payload so individual fields can be overridden. */
function validPayload(overrides: Record<string, unknown> = {}) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const rentalDate = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD

  return {
    fullName: 'Sipho Dlamini',
    phoneNumber: '+27821234567',
    emailAddress: 'sipho@example.com',
    serviceRequired: 'Luxury Vehicle Hire',
    rentalDate,
    message: 'I would like a quote for a wedding.',
    ...overrides,
  };
}

function parseResult(data: Record<string, unknown>) {
  return quoteFormSchema.safeParse(data);
}

// ---------------------------------------------------------------------------
// Valid submissions
// ---------------------------------------------------------------------------

describe('quoteFormSchema — valid submissions', () => {
  it('accepts a fully valid payload', () => {
    const result = parseResult(validPayload());
    expect(result.success).toBe(true);
  });

  it('accepts every service category', () => {
    for (const service of serviceCategories) {
      const result = parseResult(validPayload({ serviceRequired: service }));
      expect(result.success, `Expected success for service: ${service}`).toBe(true);
    }
  });

  it('accepts an optional absent _gotcha field', () => {
    const { _gotcha, ...payload } = validPayload() as Record<string, unknown>;
    void _gotcha; // unused
    const result = parseResult(payload);
    expect(result.success).toBe(true);
  });

  it('accepts an empty string _gotcha field', () => {
    const result = parseResult(validPayload({ _gotcha: '' }));
    expect(result.success).toBe(true);
  });

  it('accepts today as the rental date', () => {
    const today = new Date().toISOString().split('T')[0];
    const result = parseResult(validPayload({ rentalDate: today }));
    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// South African phone number formats
// ---------------------------------------------------------------------------

describe('quoteFormSchema — phone number validation', () => {
  const validNumbers = [
    '+27821234567',  // +27 international
    '27821234567',   // 27 without plus
    '0821234567',    // local with 0
    '+27631234567',  // 063 network
    '+27711234567',  // 071 network
    '0731234567',    // 073 local
  ];

  for (const number of validNumbers) {
    it(`accepts valid SA number: ${number}`, () => {
      const result = parseResult(validPayload({ phoneNumber: number }));
      expect(result.success).toBe(true);
    });
  }

  const invalidNumbers = [
    '1234567890',     // no SA prefix
    '+1-800-555-0100', // US number
    '082123456',      // too short (8 digits after 0)
    '08212345678',    // too long
    '+27521234567',   // 5x prefix — not a valid SA network code
    'not-a-number',
    '',
  ];

  for (const number of invalidNumbers) {
    it(`rejects invalid number: "${number}"`, () => {
      const result = parseResult(validPayload({ phoneNumber: number }));
      expect(result.success).toBe(false);
    });
  }

  it('strips surrounding whitespace before validating', () => {
    // The regex strips whitespace internally
    const result = parseResult(validPayload({ phoneNumber: '+27 82 123 4567' }));
    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Rental date validation
// ---------------------------------------------------------------------------

describe('quoteFormSchema — rental date validation', () => {
  it('rejects a past date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const pastDate = yesterday.toISOString().split('T')[0];
    const result = parseResult(validPayload({ rentalDate: pastDate }));
    expect(result.success).toBe(false);
  });

  it('rejects an invalid date string', () => {
    const result = parseResult(validPayload({ rentalDate: 'not-a-date' }));
    expect(result.success).toBe(false);
  });

  it('rejects a date in the wrong format (DD/MM/YYYY)', () => {
    const result = parseResult(validPayload({ rentalDate: '25/12/2030' }));
    expect(result.success).toBe(false);
  });

  it('rejects an empty rental date', () => {
    const result = parseResult(validPayload({ rentalDate: '' }));
    expect(result.success).toBe(false);
  });

  it('accepts a future date', () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    const futureDate = future.toISOString().split('T')[0];
    const result = parseResult(validPayload({ rentalDate: futureDate }));
    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Required fields
// ---------------------------------------------------------------------------

describe('quoteFormSchema — required fields', () => {
  const requiredFields: Array<[string, unknown]> = [
    ['fullName', ''],
    ['phoneNumber', ''],
    ['emailAddress', ''],
    ['serviceRequired', ''],
    ['rentalDate', ''],
    ['message', ''],
  ];

  for (const [field, emptyValue] of requiredFields) {
    it(`rejects submission when ${field} is empty`, () => {
      const result = parseResult(validPayload({ [field]: emptyValue }));
      expect(result.success).toBe(false);
    });
  }

  it('rejects an invalid email address', () => {
    const result = parseResult(validPayload({ emailAddress: 'not-an-email' }));
    expect(result.success).toBe(false);
  });

  it('rejects an unrecognised service category', () => {
    const result = parseResult(validPayload({ serviceRequired: 'Party Bus Hire' }));
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Honeypot field
// ---------------------------------------------------------------------------

describe('quoteFormSchema — honeypot (_gotcha)', () => {
  it('rejects submission when _gotcha is populated', () => {
    const result = parseResult(validPayload({ _gotcha: 'I am a bot' }));
    expect(result.success).toBe(false);
  });

  it('includes a descriptive error message when _gotcha is populated', () => {
    const result = parseResult(validPayload({ _gotcha: 'bot' }));
    if (!result.success) {
      const gotchaErrors = result.error.errors.filter((e) =>
        e.path.includes('_gotcha'),
      );
      expect(gotchaErrors.length).toBeGreaterThan(0);
    }
  });
});
