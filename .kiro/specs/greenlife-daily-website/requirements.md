# Requirements Document

## Introduction

Greenlife Daily is a premium vehicle rental company in South Africa serving private individuals, corporate clients, VIP guests, government officials, matric dance events, weddings, music video productions, TV and film productions, airport transfers, executive transport, and long-term rentals. This document defines the requirements for a modern, premium, mobile-first lead generation website whose primary goal is to convert visitors into enquiries and bookings through WhatsApp and contact forms. The website will showcase a curated selection of the company's most impressive vehicles while communicating that a larger fleet is available upon enquiry.

---

## Glossary

- **Website**: The Greenlife Daily lead generation website described in this document
- **Visitor**: Any person browsing the Website
- **CTA**: Call-to-action element (button, link, or banner) that prompts the Visitor to initiate contact
- **WhatsApp_Button**: The floating, site-wide button that opens a WhatsApp conversation with Greenlife Daily
- **Quote_Form**: The contact form that collects Name, Phone, Email, Service Required, Rental Date, and Message
- **Featured_Vehicle**: One of the 6–8 curated vehicles displayed on the Home Page and Vehicles Page
- **Vehicle_Card**: A UI component displaying a Featured_Vehicle's image, name, passenger capacity, transmission, fuel type, category, and an enquiry CTA
- **Hero_Section**: The full-width banner at the top of the Home Page
- **Service_Category**: One of the defined service types: Luxury Vehicle Hire, Matric Dance Transport, Wedding Vehicle Hire, Executive Transport, Airport Transfers, Corporate Rentals, VIP Escort Services, Music Video Vehicle Hire, TV & Film Production Vehicle Hire
- **SEO**: Search Engine Optimisation practices applied to improve search ranking
- **Schema_Markup**: Structured data (JSON-LD) embedded in pages to improve search engine understanding
- **Open_Graph**: Meta tags enabling rich social media sharing previews
- **WCAG**: Web Content Accessibility Guidelines (target: WCAG 2.1 AA)
- **Core_Web_Vitals**: Google's set of page experience metrics (LCP, FID/INP, CLS)

---

## Requirements

### Requirement 1: Home Page — Hero Section

**User Story:** As a Visitor, I want to see a compelling hero banner when I arrive on the website, so that I immediately understand what Greenlife Daily offers and am prompted to make an enquiry.

#### Acceptance Criteria

1. THE Website SHALL display a Hero_Section as the first visible element on the Home Page containing the headline "Premium Vehicle Hire For Every Occasion".
2. THE Website SHALL display a sub-headline beneath the headline that briefly describes the breadth of services offered by Greenlife Daily.
3. THE Hero_Section SHALL display a primary CTA button labelled "Request a Quote" that navigates the Visitor to the Quote_Form.
4. THE Hero_Section SHALL display a secondary CTA button labelled "WhatsApp Us" that opens a WhatsApp conversation with Greenlife Daily when activated.
5. THE Hero_Section SHALL display a high-quality premium vehicle background image or video that reinforces the luxury brand identity.
6. WHEN the Hero_Section is viewed on a device with a viewport width of 768px or below, THE Hero_Section SHALL render the headline, sub-headline, and CTA buttons in a single-column, vertically stacked layout with no horizontal overflow.

---

### Requirement 2: Home Page — Featured Vehicles Section

**User Story:** As a Visitor, I want to browse a curated selection of premium vehicles on the Home Page, so that I can quickly assess whether Greenlife Daily's fleet meets my needs and enquire about a specific vehicle.

#### Acceptance Criteria

1. THE Website SHALL display between 6 and 8 Featured_Vehicle entries in the Featured Vehicles Section on the Home Page.
2. EACH Featured_Vehicle entry SHALL be rendered as a Vehicle_Card displaying the vehicle image, name, passenger capacity, transmission type, and category.
3. EACH Vehicle_Card SHALL include an enquiry CTA button that, when activated, opens the Quote_Form pre-populated with the selected vehicle's name.
4. THE Featured Vehicles Section SHALL display a visible notice informing the Visitor that additional vehicles are available and that enquiries for specific requirements are welcomed.
5. WHEN the Featured Vehicles Section is viewed on a device with a viewport width of 768px or below, THE Website SHALL render Vehicle_Cards in a single-column layout.
6. WHEN the Featured Vehicles Section is viewed on a tablet with a viewport width between 769px and 1024px, THE Website SHALL render Vehicle_Cards in a two-column layout.
7. WHEN the Featured Vehicles Section is viewed on a desktop with a viewport width above 1024px, THE Website SHALL render Vehicle_Cards in a three-column or four-column layout.

---

### Requirement 3: Home Page — Services Overview Section

**User Story:** As a Visitor, I want to see all available service categories on the Home Page, so that I can identify the service relevant to my needs and navigate to more information.

#### Acceptance Criteria

1. THE Website SHALL display a Services Overview Section on the Home Page listing all nine Service_Categories: Luxury Vehicle Hire, Matric Dance Transport, Wedding Vehicle Hire, Executive Transport, Airport Transfers, Corporate Rentals, VIP Escort Services, Music Video Vehicle Hire, and TV & Film Production Vehicle Hire.
2. EACH Service_Category entry SHALL include a descriptive icon or illustration, a title, and a brief description of up to 30 words.
3. EACH Service_Category entry SHALL include a CTA link that navigates the Visitor to the corresponding section on the Services Page.

---

### Requirement 4: Home Page — Why Choose Greenlife Daily Section

**User Story:** As a Visitor, I want to understand the key differentiators of Greenlife Daily, so that I can trust the company and feel confident making an enquiry.

#### Acceptance Criteria

1. THE Website SHALL display a "Why Choose Greenlife Daily" section on the Home Page containing exactly six value propositions: Professional Service, Well Maintained Vehicles, Competitive Pricing, Flexible Rental Options, Fast Response Times, and Reliable Customer Support.
2. EACH value proposition SHALL be presented with an icon, a title, and a concise supporting description of up to 25 words.

---

### Requirement 5: Home Page — Testimonials Section

**User Story:** As a Visitor, I want to read genuine customer testimonials, so that I can feel confident in the quality and reliability of Greenlife Daily's services.

#### Acceptance Criteria

1. THE Website SHALL display a Testimonials Section on the Home Page featuring a carousel or slider that cycles through customer reviews.
2. EACH testimonial entry SHALL display the reviewer's name, a star rating, and the review text.
3. THE Testimonials Section SHALL display navigation controls (previous/next or dot indicators) that allow the Visitor to manually cycle through testimonials.
4. WHEN a Visitor activates a navigation control, THE Testimonials Section SHALL advance to the adjacent testimonial within 300ms.

---

### Requirement 6: Home Page — FAQ Section

**User Story:** As a Visitor, I want to find answers to common questions about Greenlife Daily's services, so that I can make an informed decision without needing to contact the company first.

#### Acceptance Criteria

1. THE Website SHALL display an FAQ Section on the Home Page containing answers to questions covering at minimum: documents required for rental, chauffeur/driver services, matric dance bookings, music video production bookings, executive transport, and how to request a quote.
2. EACH FAQ entry SHALL be implemented as an accessible accordion element displaying only the question by default.
3. WHEN a Visitor activates an FAQ accordion item, THE Website SHALL expand the answer text without navigating away from the page.
4. WHEN an FAQ accordion item is already expanded and a Visitor activates it again, THE Website SHALL collapse the answer text.

---

### Requirement 7: Home Page — Final CTA Section

**User Story:** As a Visitor who has scrolled to the bottom of the Home Page, I want a clear final prompt to contact Greenlife Daily, so that I am not left without a clear next step.

#### Acceptance Criteria

1. THE Website SHALL display a Final CTA section at the bottom of the Home Page with the heading "Need The Perfect Vehicle?".
2. THE Final CTA section SHALL contain a "WhatsApp Now" button that opens a WhatsApp conversation with Greenlife Daily.
3. THE Final CTA section SHALL contain a "Request Quote" button that navigates the Visitor to the Quote_Form.

---

### Requirement 8: Services Page

**User Story:** As a Visitor, I want a dedicated Services Page with detailed information about each service category, so that I can understand the full range of Greenlife Daily's offerings and enquire about the right service.

#### Acceptance Criteria

1. THE Website SHALL provide a Services Page accessible via the main navigation.
2. THE Services Page SHALL contain a dedicated section for each of the nine Service_Categories.
3. EACH service section SHALL include a heading, a description of the service, relevant use cases or occasions, and an enquiry CTA.
4. EACH service section's enquiry CTA SHALL, when activated, open the Quote_Form pre-populated with the relevant Service_Category name.

---

### Requirement 9: Vehicles Page

**User Story:** As a Visitor, I want to browse all showcased vehicles in one place, so that I can select the most suitable vehicle and make an enquiry.

#### Acceptance Criteria

1. THE Website SHALL provide a Vehicles Page accessible via the main navigation.
2. THE Vehicles Page SHALL display Vehicle_Cards for all Featured_Vehicles including name, category, passenger capacity, transmission, fuel type, and at least one high-quality image.
3. EACH Vehicle_Card on the Vehicles Page SHALL include an enquiry CTA that, when activated, opens the Quote_Form pre-populated with the selected vehicle's name.
4. THE Vehicles Page SHALL display a prominent notice informing the Visitor that additional vehicles are available and that enquiries for specific requirements are welcomed.
5. THE Vehicles Page SHALL provide a filter or category selector allowing the Visitor to view vehicles by Service_Category, and the selected filter state SHALL persist across page sessions for returning Visitors.
6. WHEN a Visitor selects a category filter, THE Vehicles Page SHALL display only Vehicle_Cards matching the selected category without a full page reload.
7. IF the client-side filtering mechanism fails, THEN THE Vehicles Page SHALL fall back to a full page reload to display the filtered results.

---

### Requirement 10: About Page

**User Story:** As a Visitor, I want to learn about Greenlife Daily's background and values, so that I can trust the company before making an enquiry.

#### Acceptance Criteria

1. THE Website SHALL provide an About Page accessible via the main navigation.
2. THE About Page SHALL include a Company Overview section describing Greenlife Daily's history and scope of services.
3. THE About Page SHALL include clearly labelled Mission and Vision statements.
4. THE About Page SHALL display the five company Values — Professionalism, Reliability, Customer Satisfaction, Safety, and Excellence — each accompanied by a short description.

---

### Requirement 11: Contact Page and Quote Form

**User Story:** As a Visitor, I want a dedicated Contact Page with a quote request form and all relevant contact details, so that I can easily reach Greenlife Daily through my preferred channel.

#### Acceptance Criteria

1. THE Website SHALL provide a Contact Page accessible via the main navigation.
2. THE Contact Page SHALL include the Quote_Form with required fields: Full Name, Phone Number, Email Address, Service Required (dropdown of Service_Categories), Rental Date, and Message.
3. WHEN a Visitor submits the Quote_Form with all required fields completed and the submission result is SUCCESS, THE Website SHALL send the form data to Greenlife Daily's designated email or CRM endpoint and display a confirmation message to the Visitor.
4. WHEN a Visitor submits the Quote_Form with one or more required fields empty, THE Website SHALL display an inline validation error identifying each missing field and SHALL NOT submit the form.
5. IF the Quote_Form submission fails due to a network or server error, THEN THE Website SHALL display an error message instructing the Visitor to try again or contact Greenlife Daily via WhatsApp.
6. THE Contact Page SHALL display Greenlife Daily's phone number, email address, physical address or service area, and business hours.
7. THE Contact Page SHALL include a WhatsApp CTA button linking directly to a WhatsApp conversation.
8. THE Contact Page SHALL embed a Google Maps widget showing the company's location or primary service area.
9. WHEN the Google Maps widget cannot be loaded due to a network error, THE Contact Page SHALL display a static map image as a fallback.

---

### Requirement 12: Site-Wide Conversion Features

**User Story:** As a Visitor on any page, I want persistent, easily accessible ways to contact Greenlife Daily, so that I can initiate an enquiry at any point in my browsing experience.

#### Acceptance Criteria

1. THE Website SHALL display the WhatsApp_Button as a fixed floating element visible on all pages and all screen sizes at all times during scrolling.
2. WHEN a Visitor activates the WhatsApp_Button, THE Website SHALL open a WhatsApp conversation with a pre-filled introductory message.
3. THE Website SHALL display a sticky "Request a Quote" CTA button or header element visible on all pages during scrolling.
4. WHEN a Visitor activates the sticky "Request a Quote" CTA, THE Website SHALL navigate to or display the Quote_Form.
5. WHEN the Website is viewed on a mobile device with a viewport width of 768px or below, THE Website SHALL display a visible click-to-call button linked to Greenlife Daily's phone number.

---

### Requirement 13: Navigation and Site Structure

**User Story:** As a Visitor, I want clear and consistent navigation, so that I can move between pages without confusion.

#### Acceptance Criteria

1. THE Website SHALL display a top navigation bar on all pages containing links to: Home, Services, Vehicles, About, and Contact.
2. WHEN a Visitor is on a device with a viewport width of 768px or below, THE Website SHALL replace the full navigation bar with a hamburger menu icon.
3. WHEN a Visitor activates the hamburger menu icon, THE Website SHALL display all navigation links in a vertical dropdown or slide-in panel.
4. THE Website SHALL define 200px as the minimum supported viewport width; viewport widths below 200px are outside the defined scope and navigation behaviour is unspecified.
5. THE Website SHALL display a footer on all pages containing the company name, navigation links, contact information, social media links, and a copyright notice.

---

### Requirement 14: SEO and Metadata

**User Story:** As the website owner, I want the website to be optimised for search engines, so that potential customers can discover Greenlife Daily when searching for relevant services.

#### Acceptance Criteria

1. EACH page of the Website SHALL include a unique, descriptive HTML `<title>` tag of between 50 and 60 characters targeting relevant search terms.
2. EACH page of the Website SHALL include a unique `<meta name="description">` tag of between 150 and 160 characters.
3. THE Website SHALL include Organisation and LocalBusiness Schema_Markup in JSON-LD format on the Home Page.
4. THE Website SHALL include Open_Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`) on every page.
5. THE Website SHALL include a valid `robots.txt` file at the root URL.
6. THE Website SHALL generate and expose an XML sitemap listing all public pages at `/sitemap.xml`.
7. ALL images on the Website SHALL include descriptive `alt` attributes.
8. THE Website SHALL use SEO-friendly URL slugs for all pages (e.g., `/services`, `/vehicles`, `/about`, `/contact`).
9. THE Website SHALL include LocalBusiness structured data referencing Greenlife Daily's South African service area and relevant service types.

---

### Requirement 15: Performance and Core Web Vitals

**User Story:** As a Visitor, I want the website to load quickly and respond smoothly, so that I am not deterred by slow performance before I can make an enquiry.

#### Acceptance Criteria

1. THE Website SHALL achieve a Google PageSpeed Insights mobile performance score of 80 or above.
2. THE Website SHALL achieve a Largest Contentful Paint (LCP) of 2.5 seconds or less on a simulated 4G mobile connection.
3. THE Website SHALL achieve a Cumulative Layout Shift (CLS) score of 0.1 or less.
4. ALL images on the Website SHALL be served in a modern format (WebP or AVIF) with appropriate compression.
5. THE Website SHALL implement lazy loading for images that are not in the initial viewport.
6. THE Website SHALL serve CSS and JavaScript assets in minified form.

---

### Requirement 16: Accessibility

**User Story:** As a Visitor with accessibility needs, I want the website to be usable with assistive technologies, so that I can access Greenlife Daily's services without barriers.

#### Acceptance Criteria

1. THE Website SHALL achieve WCAG 2.1 AA compliance for all public-facing pages.
2. THE Website SHALL provide a minimum colour contrast ratio of 4.5:1 between text and background for normal-sized text across the entire colour scheme.
3. ALL interactive elements (buttons, links, form fields, accordion items, carousel controls) SHALL be keyboard navigable and SHALL display a visible focus indicator.
4. ALL form fields on the Website SHALL be associated with a descriptive `<label>` element.
5. THE Website SHALL include appropriate ARIA roles and attributes on dynamic components including the testimonials carousel, FAQ accordions, and mobile navigation menu.

---

### Requirement 17: Mobile-First Responsive Design

**User Story:** As a Visitor browsing on a smartphone, I want the website to be fully usable on my device, so that I can explore services and make enquiries without needing a desktop.

#### Acceptance Criteria

1. THE Website SHALL be designed and implemented mobile-first, with base styles targeting viewport widths of 320px and above.
2. THE Website SHALL render without horizontal scrolling on viewport widths of 320px and above.
3. ALL tap targets (buttons, links, form controls) on mobile viewports SHALL have a minimum touch target size of 44x44 CSS pixels.
4. THE Website SHALL use a fluid typographic scale ensuring legible font sizes at all supported viewport widths.

---

### Requirement 18: Brand and Visual Design

**User Story:** As a Visitor, I want the website to feel premium and professional, so that I trust Greenlife Daily with high-value occasions such as weddings, VIP transport, and corporate events.

#### Acceptance Criteria

1. THE Website SHALL use green and white as primary brand colours and charcoal or dark grey as secondary colours throughout all pages.
2. THE Website SHALL apply smooth CSS transitions and animations to interactive elements and section entrances to reinforce a premium feel, with all transition durations between 150ms and 500ms.
3. THE Website SHALL use a modern, legible sans-serif typeface for headings and body text.
4. THE Website SHALL use high-quality vehicle photography throughout, with no pixelated or stretched images displayed at any viewport size.
5. THE Website SHALL maintain consistent spacing, typography scale, and colour usage across all pages.

---

### Requirement 19: Form Security and Data Handling

**User Story:** As a Visitor submitting a quote request, I want my personal information to be handled securely, so that I can trust Greenlife Daily with my contact details.

#### Acceptance Criteria

1. THE Website SHALL serve all pages exclusively over HTTPS.
2. THE Quote_Form SHALL implement server-side input validation and sanitisation before processing submitted data, and SHALL block submission when HTTPS is not active.
3. THE Quote_Form SHALL include bot protection (CAPTCHA or honeypot field) to prevent automated spam submissions.
4. THE Website SHALL include a Privacy Policy link accessible from the footer on all pages.
