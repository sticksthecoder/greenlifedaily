/**
 * Zod validation schemas for the Greenlife Daily quote form.
 *
 * Validates:
 *  - South African phone numbers (Requirements 11.2, 19.2)
 *  - ISO rental date not in the past (Requirements 11.2, 19.2)
 *  - All required fields present (Requirement 11.4)
 *  - Honeypot field must be absent / empty for genuine submissions (Requirement 19.2)
 */

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Service categories
// ---------------------------------------------------------------------------

export const serviceCategories = [
  'Luxury Vehicle Hire',
  'Matric Dance Transport',
  'Wedding Vehicle Hire',
  'Executive Transport',
  'Airport Transfers',
  'Corporate Rentals',
  'VIP Escort Services',
  'Music Video Vehicle Hire',
  'TV & Film Production Vehicle Hire',
  'Vehicle Branding',
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];

// ---------------------------------------------------------------------------
// Phone-number validation (South African formats)
//
// Accepted formats:
//   +27XXXXXXXXX  — international prefix with plus
//    27XXXXXXXXX  — international prefix without plus
//    0XXXXXXXXX   — local format with leading zero
//
// In each case the 9 significant digits must form a valid SA subscriber number:
// the first of those digits is the area/network code (6–8), followed by 8 more.
// ---------------------------------------------------------------------------

const SA_PHONE_REGEX = /^(\+27|27|0)[6-8][0-9]{8}$/;

const phoneNumberSchema = z
  .string()
  .min(1, 'Phone number is required')
  .refine(
    (val) => SA_PHONE_REGEX.test(val.replace(/\s/g, '')),
    {
      message:
        'Please enter a valid South African phone number (e.g. +27821234567, 0821234567)',
    },
  );

// ---------------------------------------------------------------------------
// Rental-date validation
//
// Must be a valid ISO 8601 date string (YYYY-MM-DD) and must not be in the past.
// "Today" is acceptable — only strictly past dates are rejected.
// ---------------------------------------------------------------------------

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const rentalDateSchema = z
  .string()
  .min(1, 'Rental date is required')
  .refine((val) => ISO_DATE_REGEX.test(val) && !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date (YYYY-MM-DD)',
  })
  .refine(
    (val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(val);
      selected.setHours(0, 0, 0, 0);
      return selected >= today;
    },
    { message: 'Rental date cannot be in the past' },
  );

// ---------------------------------------------------------------------------
// Full quote form schema
// ---------------------------------------------------------------------------

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be 100 characters or fewer'),

  phoneNumber: phoneNumberSchema,

  emailAddress: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),

  serviceRequired: z
    .union([z.enum(serviceCategories), z.literal('')])
    .refine((val) => val !== '', {
      message: 'Please select a service',
    }),

  rentalDate: rentalDateSchema,

  message: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message must be 2 000 characters or fewer'),

  // Honeypot — bots fill this in; genuine users leave it blank
  _gotcha: z.string().max(0, 'Bot submission detected').optional(),
});

// ---------------------------------------------------------------------------
// Inferred TypeScript type
// ---------------------------------------------------------------------------

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
