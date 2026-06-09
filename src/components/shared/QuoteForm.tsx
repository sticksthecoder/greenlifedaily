'use client';

/**
 * QuoteForm — shared lead-capture form component.
 *
 * Renders all six required fields, a CSS-hidden honeypot, client-side Zod
 * validation, and posts to /api/contact. Supports prefilledVehicle and
 * prefilledService props for contextual pre-population.
 *
 * Requirements: 11.2, 11.3, 11.4, 11.5, 16.4, 19.3
 */

import React, { useRef, useState, useEffect } from 'react';
import { quoteFormSchema, serviceCategories } from '@/lib/validation';
import type { QuoteFormValues } from '@/lib/validation';
import type { ServiceCategory } from '@/data/services';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface QuoteFormProps {
  prefilledVehicle?: string;
  prefilledService?: ServiceCategory;
}

/**
 * Local form-state type: serviceRequired may be '' while the user hasn't
 * chosen a value yet. The Zod schema's safeParse catches the empty-string
 * case and surfaces the "Please select a service" error.
 */
interface FormState {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  serviceRequired: ServiceCategory | '';
  rentalDate: string;
  message: string;
  _gotcha: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build WhatsApp deep-link from env var or fall back to a placeholder. */
function buildWhatsAppUrl(): string {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '27000000000';
  return `https://wa.me/${number}`;
}

/** Return today's date in YYYY-MM-DD format for the date input's min attribute. */
function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function QuoteForm({
  prefilledVehicle,
  prefilledService,
}: QuoteFormProps) {
  // ------- Form state -------------------------------------------------------
  const [values, setValues] = useState<FormState>({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceRequired: prefilledService ?? '',
    rentalDate: '',
    message: prefilledVehicle
      ? `I am interested in hiring the ${prefilledVehicle}.`
      : '',
    _gotcha: '',
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  // Sync props changes (e.g. user clicks "Enquire" on a different vehicle)
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      serviceRequired: prefilledService ?? prev.serviceRequired,
      message: prefilledVehicle
        ? `I am interested in hiring the ${prefilledVehicle}.`
        : prev.message,
    }));
  }, [prefilledVehicle, prefilledService]);

  // ------- Focus management -------------------------------------------------
  // Refs for every field so we can focus the first error after failed submit
  const fieldRefs: Record<string, React.RefObject<HTMLElement | null>> = {
    fullName: useRef<HTMLInputElement>(null),
    phoneNumber: useRef<HTMLInputElement>(null),
    emailAddress: useRef<HTMLInputElement>(null),
    serviceRequired: useRef<HTMLSelectElement>(null),
    rentalDate: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  // The ordered list of fields matches the visual order in the form
  const fieldOrder: (keyof FormState)[] = [
    'fullName',
    'phoneNumber',
    'emailAddress',
    'serviceRequired',
    'rentalDate',
    'message',
  ];

  // ------- Handlers ---------------------------------------------------------

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as the user types
    if (errors[name as keyof QuoteFormValues]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof QuoteFormValues];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // --- Client-side validation ---
    const result = quoteFormSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof QuoteFormValues;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);

      // Move focus to the first field that has an error
      for (const field of fieldOrder) {
        if (fieldErrors[field]) {
          const ref = fieldRefs[field];
          if (ref?.current) {
            (ref.current as HTMLElement).focus();
          }
          break;
        }
      }
      return;
    }

    // --- Submit ---
    setSubmitState('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        setSubmitState('success');
        // Reset form values
        setValues({
          fullName: '',
          phoneNumber: '',
          emailAddress: '',
          serviceRequired: '',
          rentalDate: '',
          message: '',
          _gotcha: '',
        });
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    }
  }

  // ------- Derived UI helpers -----------------------------------------------

  const isSubmitting = submitState === 'submitting';

  function fieldClass(hasError: boolean): string {
    const base =
      'w-full rounded-md border px-4 py-3 text-charcoal bg-white text-sm leading-5 ' +
      'placeholder:text-charcoal-300 ' +
      'focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 ' +
      'transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    return hasError
      ? `${base} border-red-500`
      : `${base} border-charcoal-200`;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (submitState === 'success') {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="rounded-lg border border-green-200 bg-green-50 p-6 text-center"
      >
        <svg
          className="mx-auto mb-3 h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mb-2 text-center text-lg font-semibold text-green-800">
          Quote Request Received!
        </h3>
        <p className="mx-auto text-center text-sm text-green-700">
          Thank you for reaching out. We will be in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Request a quote"
      className="space-y-5"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Error banner (network / server errors)                               */}
      {/* ------------------------------------------------------------------ */}
      {submitState === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800"
        >
          <p className="mb-1 font-medium">
            Something went wrong. Please try again or contact us via WhatsApp.
          </p>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-green-700 underline hover:text-green-900"
          >
            {/* WhatsApp icon */}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat with us on WhatsApp
          </a>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Full Name                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <label
          htmlFor="fullName"
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          <span className="text-red-600" aria-hidden="true">*</span> Full Name
        </label>
        <input
          ref={fieldRefs.fullName as React.RefObject<HTMLInputElement>}
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="e.g. Sipho Dlamini"
          value={values.fullName}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          className={fieldClass(!!errors.fullName)}
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Phone Number                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <label
          htmlFor="phoneNumber"
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          <span className="text-red-600" aria-hidden="true">*</span> Phone Number
        </label>
        <input
          ref={fieldRefs.phoneNumber as React.RefObject<HTMLInputElement>}
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          placeholder="e.g. 0821234567 or +27821234567"
          value={values.phoneNumber}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.phoneNumber}
          aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
          className={fieldClass(!!errors.phoneNumber)}
        />
        {errors.phoneNumber && (
          <p id="phoneNumber-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.phoneNumber}
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Email Address                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <label
          htmlFor="emailAddress"
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          <span className="text-red-600" aria-hidden="true">*</span> Email Address
        </label>
        <input
          ref={fieldRefs.emailAddress as React.RefObject<HTMLInputElement>}
          id="emailAddress"
          name="emailAddress"
          type="email"
          autoComplete="email"
          placeholder="e.g. sipho@example.com"
          value={values.emailAddress}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.emailAddress}
          aria-describedby={errors.emailAddress ? 'emailAddress-error' : undefined}
          className={fieldClass(!!errors.emailAddress)}
        />
        {errors.emailAddress && (
          <p id="emailAddress-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.emailAddress}
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Service Required                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <label
          htmlFor="serviceRequired"
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          <span className="text-red-600" aria-hidden="true">*</span> Service Required
        </label>
        <select
          ref={fieldRefs.serviceRequired as React.RefObject<HTMLSelectElement>}
          id="serviceRequired"
          name="serviceRequired"
          value={values.serviceRequired}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.serviceRequired}
          aria-describedby={
            errors.serviceRequired ? 'serviceRequired-error' : undefined
          }
          className={fieldClass(!!errors.serviceRequired)}
        >
          <option value="" disabled>
            Select a service…
          </option>
          {serviceCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.serviceRequired && (
          <p
            id="serviceRequired-error"
            role="alert"
            className="mt-1.5 text-xs text-red-600"
          >
            {errors.serviceRequired}
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Rental Date                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <label
          htmlFor="rentalDate"
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          <span className="text-red-600" aria-hidden="true">*</span> Rental Date
        </label>
        <input
          ref={fieldRefs.rentalDate as React.RefObject<HTMLInputElement>}
          id="rentalDate"
          name="rentalDate"
          type="date"
          min={todayISO()}
          value={values.rentalDate}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.rentalDate}
          aria-describedby={errors.rentalDate ? 'rentalDate-error' : undefined}
          className={fieldClass(!!errors.rentalDate)}
        />
        {errors.rentalDate && (
          <p id="rentalDate-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.rentalDate}
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Message                                                              */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          <span className="text-red-600" aria-hidden="true">*</span> Message
        </label>
        <textarea
          ref={fieldRefs.message as React.RefObject<HTMLTextAreaElement>}
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us more about your requirements…"
          value={values.message}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${fieldClass(!!errors.message)} resize-y`}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Honeypot field — CSS-hidden, NOT display:none (Req 19.3)            */}
      {/* Bots fill this in; genuine users never see or interact with it.     */}
      {/* ------------------------------------------------------------------ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <label htmlFor="_gotcha">Leave this field blank</label>
        <input
          id="_gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values._gotcha ?? ''}
          onChange={handleChange}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Submit button                                                        */}
      {/* ------------------------------------------------------------------ */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={
          'w-full rounded-md px-6 py-3.5 text-sm font-semibold text-white ' +
          'bg-green-600 hover:bg-green-700 active:bg-green-800 ' +
          'focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ' +
          'transition-colors duration-200 ' +
          'disabled:opacity-60 disabled:cursor-not-allowed'
        }
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Sending…' : 'Request a Quote'}
      </button>

      <p className="text-left text-xs text-charcoal-400">
        <span className="text-red-600" aria-hidden="true">*</span> Required fields
      </p>
    </form>
  );
}
