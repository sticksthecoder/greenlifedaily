# Implementation Plan: Greenlife Daily Premium Vehicle Rental Website

## Overview

Implement the Greenlife Daily marketing website using Next.js 14 (App Router) with Tailwind CSS. The site is statically generated with a single server-side Route Handler for the quote form. Tasks are ordered to establish shared infrastructure first, then build pages from the inside out, finishing with SEO, accessibility, and testing.

---

## Tasks

- [x] 1. Project setup and configuration
  - Initialise a Next.js 14 App Router project with TypeScript and Tailwind CSS v3
  - Configure `tailwind.config.ts` with brand colours (green, white, charcoal), font family, and spacing scale
  - Add `globals.css` with CSS reset, base typography, and smooth-scroll
  - Create `.env.example` with all required environment variable keys (SMTP, WhatsApp, Maps, reCAPTCHA)
  - Configure `next.config.ts` with image domains and output settings
  - Install and configure Vitest, React Testing Library, and fast-check for the test suite
  - _Requirements: 17.1, 18.1, 18.3, 15.6_

- [x] 2. Data layer — TypeScript data files
  - [x] 2.1 Create `src/data/vehicles.ts` with the `Vehicle` interface and 6–8 curated vehicle entries (including `featured` flag)
    - Export `vehicles` array and `featuredVehicles` derived array
    - _Requirements: 2.1, 2.2, 9.2_

  - [x] 2.2 Create `src/data/services.ts` with the `ServiceCategory` type union, `Service` interface, and all nine service entries
    - Each entry must include `id`, `category`, `slug`, `icon`, `title`, `shortDescription` (≤30 words), `fullDescription`, and `useCases`
    - _Requirements: 3.1, 3.2, 8.2, 8.3_

  - [x] 2.3 Create `src/data/testimonials.ts`, `src/data/faqs.ts`, and `src/data/company.ts`
    - `testimonials.ts`: at least 5 `Testimonial` entries with `id`, `reviewerName`, `starRating`, `reviewText`
    - `faqs.ts`: at least 6 `FaqItem` entries covering the topics listed in Requirement 6.1
    - `company.ts`: contact details (phone, email, address, hours), social media links, WhatsApp number
    - _Requirements: 5.2, 6.1, 10.2, 11.6, 13.5_

  - [x] 2.4 Write unit tests for data file integrity
    - Assert vehicle count is between 6 and 8
    - Assert all nine `ServiceCategory` values are present in the services array
    - Assert each FAQ entry has non-empty `question` and `answer` fields
    - _Requirements: 2.1, 3.1, 6.1_

- [x] 3. Validation schema and email helper
  - [x] 3.1 Create `src/lib/validation.ts` with a Zod schema for `QuoteFormValues`
    - Required fields: `fullName`, `phoneNumber`, `emailAddress`, `serviceRequired`, `rentalDate`, `message`
    - Optional honeypot: `_gotcha`
    - Phone number format validation (South African format)
    - Date format validation (ISO date string, not in the past)
    - _Requirements: 11.2, 11.4, 19.2_

  - [x] 3.2 Write unit tests for the Zod validation schema
    - Test each required field missing individually
    - Test invalid phone format
    - Test invalid date format
    - Test valid payload passes without errors
    - _Requirements: 11.4, 19.2_

  - [x] 3.3 Create `src/lib/email.ts` Nodemailer helper
    - Implement `sendQuoteEmail(payload: ContactPayload): Promise<void>`
    - Build email subject and body from template variables defined in the design
    - Load SMTP credentials from environment variables
    - _Requirements: 11.3_

- [x] 4. Route Handler — `/api/contact`
  - [x] 4.1 Create `src/app/api/contact/route.ts` POST handler
    - Parse and validate request body using the Zod schema from `src/lib/validation.ts`
    - If honeypot `_gotcha` is populated, return 200 silently without sending email
    - If validation fails, return 400 with field error messages
    - Call `sendQuoteEmail` from `src/lib/email.ts` on success; return 200
    - On SMTP failure, log error server-side and return 500
    - _Requirements: 11.3, 11.5, 19.2, 19.3_

  - [x] 4.2 Write integration tests for the Route Handler
    - Mock Nodemailer; POST valid payload; assert 200 and mailer called once
    - POST payload with `_gotcha` populated; assert 200 but mailer NOT called
    - POST payload missing required field; assert 400 with error details
    - POST triggers SMTP error; assert 500 response
    - _Requirements: 11.3, 11.4, 11.5, 19.3_

- [x] 5. Checkpoint — core data and API
  - Ensure all tests pass, ask the user if questions arise.

- [-] 6. Shared UI components
  - [-] 6.1 Implement `src/components/shared/VehicleCard.tsx`
    - Render vehicle image (Next.js `Image` with `alt` from `altText`), name, passenger capacity, transmission, fuel type, and category
    - Include "Enquire" CTA button that calls `onEnquire(vehicleName)` prop
    - Apply responsive card layout and brand styling
    - _Requirements: 2.2, 2.3, 9.2, 9.3, 14.7, 18.1_

  - [ ]* 6.2 Write property test for VehicleCard — Property 1: Vehicle Card renders all required fields
    - Use `fc.constantFrom(...vehicles)` to test every vehicle in the dataset
    - Assert rendered HTML contains vehicle name, passenger capacity, transmission, fuel type, and category
    - **Property 1: Vehicle Card renders all required fields**
    - **Validates: Requirements 2.2, 9.2**

  - [ ]* 6.3 Write property test for VehicleCard — Property 2: Vehicle Card CTA pre-populates form
    - Use `fc.constantFrom(...vehicles)` to test every vehicle
    - Assert that activating the CTA calls `onEnquire` with exactly the vehicle's name
    - **Property 2: Vehicle Card CTA pre-populates form with vehicle name**
    - **Validates: Requirements 2.3, 9.3**

  - [-] 6.4 Implement `src/components/shared/ServiceCard.tsx`
    - Support `variant="overview"` (icon + title + ≤30-word description) and `variant="full"` (full description + use cases + enquiry CTA)
    - Enquiry CTA on `variant="full"` calls `onEnquire(service.category)` prop
    - _Requirements: 3.2, 8.3, 8.4_

  - [ ]* 6.5 Write property test for ServiceCard — Property 10: Service card overview renders icon, title, and description
    - Use `fc.constantFrom(...services)` to test every service in overview variant
    - Assert icon element, title, and description ≤ 30 words are present
    - **Property 10: Service card in overview renders icon, title, and description**
    - **Validates: Requirements 3.2**

  - [ ]* 6.6 Write property test for ServiceCard — Property 4: Service CTA pre-populates form with service category
    - Use `fc.constantFrom(...services)` in full variant; activate enquiry CTA
    - Assert `onEnquire` is called with exactly `service.category`
    - **Property 4: Service CTA pre-populates form with service category**
    - **Validates: Requirements 8.4**

  - [-] 6.7 Implement `src/components/shared/QuoteForm.tsx`
    - Render all six required fields with matching `<label>` elements (using `for`/`id` pairing)
    - Include hidden honeypot field `_gotcha` (CSS-hidden, not `display:none`)
    - Client-side validation using the Zod schema; display inline error per field on submit
    - Set `aria-invalid` on invalid fields; move focus to first error on failed submit
    - POST to `/api/contact`; show success confirmation on 200; show error banner on failure with WhatsApp fallback link
    - Accept `prefilledVehicle` and `prefilledService` props
    - _Requirements: 11.2, 11.3, 11.4, 11.5, 16.4, 19.3_

  - [ ]* 6.8 Write property test for QuoteForm — Property 6: Form validation rejects any subset of missing required fields
    - Use `fc.subarray(requiredFields, {minLength: 1})` to test all non-empty subsets of missing fields
    - Assert form is not submitted and each missing field shows an inline error
    - **Property 6: Form validation rejects any subset of missing required fields**
    - **Validates: Requirements 11.4**

  - [ ]* 6.9 Write property test for QuoteForm — Property 8: Every form field has an associated label
    - Render the QuoteForm and assert each `input`, `select`, and `textarea` has an associated `<label>` via `for`/`id` or `aria-labelledby`
    - **Property 8: Every form field has an associated label**
    - **Validates: Requirements 16.4**

  - [ ] 6.10 Implement `src/components/shared/StickyQuoteCta.tsx` and `src/components/shared/ClickToCallButton.tsx`
    - `StickyQuoteCta`: fixed/sticky element linking to the Quote Form; visible on all pages at all scroll positions
    - `ClickToCallButton`: renders on mobile viewports (≤768px); links to `tel:` company phone number
    - _Requirements: 12.3, 12.4, 12.5_

- [ ] 7. Layout components
  - [ ] 7.1 Implement `src/components/layout/Navbar.tsx`
    - Desktop (>768px): horizontal nav with links to Home, Services, Vehicles, About, Contact; sticky "Request a Quote" button
    - Mobile (≤768px): hamburger icon with `aria-expanded` / `aria-controls`; slide-in drawer with all nav links; click-to-call button
    - Active page link receives `aria-current="page"`
    - _Requirements: 13.1, 13.2, 13.3, 12.3, 16.5_

  - [ ]* 7.2 Write property test for Navbar — Property 11: Hamburger menu reveals all navigation links on mobile
    - Use `fc.integer({min: 320, max: 768})` for viewport widths
    - After activating hamburger, assert all five nav links are visible in the DOM
    - **Property 11: Hamburger menu reveals all navigation links on mobile**
    - **Validates: Requirements 13.3**

  - [ ] 7.3 Implement `src/components/layout/Footer.tsx`
    - Company name, nav links, contact information, social media links, copyright notice
    - Privacy Policy link
    - _Requirements: 13.5, 19.4_

  - [ ] 7.4 Implement `src/components/layout/WhatsAppButton.tsx`
    - Fixed floating button visible on all pages and screen sizes
    - Opens `wa.me/${NEXT_PUBLIC_WHATSAPP_NUMBER}` with a pre-filled introductory message
    - _Requirements: 12.1, 12.2_

  - [ ] 7.5 Create `src/app/layout.tsx` root layout
    - Compose `Navbar`, `Footer`, `WhatsAppButton`, and `StickyQuoteCta`
    - Import `globals.css`
    - Set default metadata fields (site name, default OG image)
    - _Requirements: 12.1, 12.3, 13.1, 13.5_

- [x] 8. Home page sections
  - [x] 8.1 Implement `src/components/home/HeroSection.tsx`
    - Headline "Premium Vehicle Hire For Every Occasion", sub-headline, "Request a Quote" CTA, "WhatsApp Us" CTA
    - Background high-quality vehicle image (Next.js `Image` with `priority`, descriptive `alt`)
    - Mobile single-column responsive layout
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [x] 8.2 Implement `src/components/home/FeaturedVehiclesSection.tsx`
    - Render `VehicleCard` for each entry in `featuredVehicles`
    - Responsive grid: 1-column (≤768px), 2-column (769–1024px), 3-column (>1024px)
    - "More vehicles available" notice
    - Wire `onEnquire` to open/scroll to `QuoteForm` pre-populated with vehicle name
    - _Requirements: 2.1, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 8.3 Implement `src/components/home/ServicesOverview.tsx`
    - Render a `ServiceCard variant="overview"` for each of the nine services
    - CTA links to the relevant anchor on the Services Page (`/services#<slug>`)
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 8.4 Implement `src/components/home/WhyChooseSection.tsx`
    - Six value propositions with icon, title, and ≤25-word description
    - _Requirements: 4.1, 4.2_

  - [x] 8.5 Implement `src/components/home/TestimonialsSection.tsx`
    - Carousel cycling through testimonial entries; each shows reviewer name, star rating, review text
    - Previous/next controls; auto-advance with 300ms transition
    - ARIA roles for carousel and slide elements
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 16.5_

  - [x] 8.6 Implement `src/components/home/FaqSection.tsx`
    - Accordion for each FAQ item; answer hidden by default; toggle on activation
    - ARIA: `aria-expanded` on trigger button, `aria-controls` linking to answer panel
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 16.5_

  - [ ]* 8.7 Write property test for FaqSection — Property 9: FAQ accordion open/close round-trip
    - Use `fc.constantFrom(...faqItems)` to test each FAQ item
    - Open then close the item; assert answer text is not visible after second activation
    - **Property 9: FAQ accordion open/close round-trip**
    - **Validates: Requirements 6.4**

  - [x] 8.8 Implement `src/components/home/FinalCtaSection.tsx`
    - Heading "Need The Perfect Vehicle?", "WhatsApp Now" button, "Request Quote" button
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 8.9 Assemble `src/app/page.tsx` (Home Page)
    - Compose all home sections in order; export `metadata` object (title, description, OG tags, JSON-LD)
    - JSON-LD: `Organization` and `LocalBusiness` schema
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.9_

- [x] 9. Checkpoint — Home page
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Vehicles page with filter
  - [ ] 10.1 Implement `src/components/vehicles/VehicleFilter.tsx` (`'use client'`)
    - Category selector buttons/tabs for each `ServiceCategory` plus "All"
    - Read and write selected category to `localStorage` key `greenlife_vehicle_filter`; default to "All" if unavailable
    - Emit selected category to parent via callback prop
    - Error boundary: on unhandled error, redirect to `/vehicles?category=<value>` triggering full page reload
    - `<noscript>` fallback linking to server-rendered filtered URL
    - _Requirements: 9.5, 9.6, 9.7_

  - [ ]* 10.2 Write property test for VehicleFilter — Property 5: Vehicle filter shows only matching cards
    - Use `fc.constantFrom(...serviceCategories)` to test each category
    - Assert every rendered `VehicleCard` has `category === selectedCategory`; assert no card from a different category is rendered
    - **Property 5: Vehicle filter shows only matching cards**
    - **Validates: Requirements 9.6**

  - [ ] 10.3 Assemble `src/app/vehicles/page.tsx`
    - Server component: read `searchParams.category` for SSR fallback filtering
    - Render `VehicleFilter`, `VehicleCard` grid for all (or filtered) vehicles, "more vehicles" notice
    - Export `metadata` with unique title/description/OG tags
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.7, 14.1, 14.2, 14.4_

- [ ] 11. Services page
  - [ ] 11.1 Implement `src/app/services/page.tsx`
    - Render a `ServiceCard variant="full"` section for each of the nine services, each with an `id` matching its slug for anchor links
    - Wire enquiry CTA `onEnquire` to open `QuoteForm` pre-populated with `service.category`
    - Export `metadata` with unique title/description/OG tags
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 14.1, 14.2, 14.4_

  - [ ]* 11.2 Write property test for Services page — Property 3: Service section renders all required elements
    - Use `fc.constantFrom(...services)` to test each service
    - Assert rendered section contains a heading, non-empty description, at least one use case, and an enquiry CTA
    - **Property 3: Service section renders all required elements**
    - **Validates: Requirements 8.3**

- [ ] 12. About page
  - [ ] 12.1 Implement `src/app/about/page.tsx`
    - Company Overview section (history and scope), Mission statement, Vision statement, five Values (Professionalism, Reliability, Customer Satisfaction, Safety, Excellence) each with description
    - Export `metadata` with unique title/description/OG tags
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 14.1, 14.2, 14.4_

- [ ] 13. Contact page
  - [ ] 13.1 Implement `src/app/contact/page.tsx`
    - Render `QuoteForm`, company contact details (phone, email, address/service area, hours), `WhatsApp CTA` button
    - Google Maps `<iframe>` embed; wrap with error handler that swaps iframe for static fallback `<img>` on load failure
    - Export `metadata` with unique title/description/OG tags
    - _Requirements: 11.1, 11.2, 11.6, 11.7, 11.8, 11.9, 14.1, 14.2, 14.4_

- [ ] 14. SEO infrastructure
  - [ ] 14.1 Create `src/app/sitemap.ts`
    - Return all five public pages (`/`, `/services`, `/vehicles`, `/about`, `/contact`) with `lastModified` dates
    - _Requirements: 14.6_

  - [ ] 14.2 Create `src/app/robots.ts`
    - Allow all crawlers; reference sitemap URL
    - _Requirements: 14.5_

  - [ ]* 14.3 Write smoke tests for SEO metadata and structured data
    - Assert each page's `metadata` export has a `title` (50–60 chars), `description` (150–160 chars), and all four OG tags
    - Assert Home Page HTML contains valid JSON-LD `Organization` and `LocalBusiness` objects
    - Assert `/robots.txt` returns valid content; assert `/sitemap.xml` lists all five pages
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

- [ ] 15. Accessibility and cross-cutting concerns
  - [ ]* 15.1 Write property test — Property 7: Every image element has a non-empty alt attribute
    - Use `fc.constantFrom(...allPagePaths)` to test each page
    - Assert every `<img>` and Next.js `<Image>` has a non-empty `alt` attribute
    - **Property 7: Every image element has a non-empty alt attribute**
    - **Validates: Requirements 14.7, 16.1**

  - [ ]* 15.2 Run axe-core accessibility checks on all page components
    - Use `jest-axe` or `@axe-core/react` on every page; assert zero WCAG 2.1 AA violations
    - _Requirements: 16.1, 16.2, 16.3, 16.5_

  - [ ]* 15.3 Write keyboard navigation tests
    - Tab through all interactive elements on each page; assert focus indicators are visible
    - _Requirements: 16.3_

- [ ] 16. Performance and image optimisation
  - [ ] 16.1 Add all vehicle and hero images to `public/images/` in WebP format with appropriate compression
    - Add static fallback map image (`public/images/map-fallback.webp`)
    - Verify all `next/image` usages include `width`, `height` (or `fill`), and `alt`; set `priority` on above-the-fold images; set `loading="lazy"` on below-the-fold images
    - _Requirements: 15.4, 15.5, 14.7, 18.4_

  - [ ] 16.2 Configure Lighthouse CI
    - Create `.lighthouserc.js` with performance score ≥ 0.8, LCP ≤ 2500ms, CLS ≤ 0.1 assertions
    - _Requirements: 15.1, 15.2, 15.3_

- [ ] 17. Final checkpoint — full site
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property-based tests use **fast-check** and must run a minimum of 100 iterations each
- Tag format for PBT: `// Feature: greenlife-daily-website, Property N: <property_text>`
- Unit tests use **Vitest** + **React Testing Library**
- All environment variables must be set in `.env.local` before testing the contact form locally
- Vehicle and hero images must be sourced and placed in `public/images/` before running the full build

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "2.2", "2.3", "3.1", "3.3"] },
    { "id": 1, "tasks": ["2.4", "3.2", "4.1", "6.1", "6.4", "6.7", "6.10"] },
    { "id": 2, "tasks": ["4.2", "6.2", "6.3", "6.5", "6.6", "6.8", "6.9", "7.1", "7.3", "7.4"] },
    { "id": 3, "tasks": ["7.2", "7.5", "8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.8"] },
    { "id": 4, "tasks": ["8.7", "8.9", "10.1", "11.1", "12.1", "13.1"] },
    { "id": 5, "tasks": ["10.2", "10.3", "11.2", "14.1", "14.2"] },
    { "id": 6, "tasks": ["14.3", "15.1", "15.2", "15.3", "16.1", "16.2"] }
  ]
}
```
