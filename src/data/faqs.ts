export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: 'faq-001',
    question: 'What documents do I need to rent a vehicle?',
    answer:
      'You will need a valid South African driver\'s licence (or an international driving permit for foreign nationals), a green ID book or smart ID card, and a credit or debit card in the renter\'s name for the deposit. Corporate clients may also be required to provide a company letter of authorisation. All documents will be verified before the vehicle is released.',
  },
  {
    id: 'faq-002',
    question: 'Do you offer chauffeur or driver services?',
    answer:
      'Yes. All our vehicles can be booked with a professional chauffeur. Our drivers are vetted, experienced, and familiar with Johannesburg, Pretoria, and surrounding areas. Simply request a driver when submitting your quote.',
  },
  {
    id: 'faq-003',
    question: 'Can I book a vehicle for a matric dance?',
    answer:
      'Absolutely. Matric dance bookings are one of our specialities. We offer a curated selection of luxury vehicles guaranteed to make a memorable entrance. Bookings are subject to availability and should be placed as early as possible, especially during peak matric season (October–November). Contact us via WhatsApp or the quote form to check availability for your date.',
  },
  {
    id: 'faq-004',
    question: 'Do you supply vehicles for music video productions?',
    answer:
      'Yes. We regularly supply premium and exotic vehicles for music video shoots, commercials, and other media productions across Gauteng. Our vehicles are maintained in showroom condition to ensure they look their best on camera. Shoot-day bookings are flexible and can be arranged on a half-day or full-day basis. Reach out with your production requirements and we will tailor a package for you.',
  },
  {
    id: 'faq-005',
    question: 'What executive transport options do you offer?',
    answer:
      'We provide executive transport solutions including airport meet-and-greet pickups, board meeting transfers, and client entertainment. Our fleet includes flagship sedans and premium SUVs with tinted windows and climate control. All executive bookings are handled with strict confidentiality and punctuality.',
  },
  {
    id: 'faq-006',
    question: 'How do I request a quote?',
    answer:
      'Requesting a quote is quick and easy. You can use the "Request a Quote" form on our website. Simply fill in your name, contact details, the service you need, and your preferred date, and we will get back to you promptly. Alternatively, you can send us a message directly on WhatsApp for an even faster response. We aim to respond to all enquiries within two hours during business hours.',
  },
  {
    id: 'faq-007',
    question: 'What is your cancellation and refund policy?',
    answer:
      'Cancellations made more than 48 hours before the booking start time will receive a full refund of any deposit paid. Cancellations within 48 hours may be subject to a cancellation fee. For last-minute changes, please contact us as soon as possible and we will do our best to accommodate your needs. Full details are provided at the time of booking.',
  },
];
