export interface Testimonial {
  id: string;
  reviewerName: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  reviewText: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-001',
    reviewerName: 'Thabo Nkosi',
    starRating: 5,
    reviewText:
      'Greenlife Daily exceeded every expectation for my daughter\'s matric dance. The vehicle arrived on time, the driver was immaculately dressed, and she felt like royalty for the evening. Highly recommended!',
  },
  {
    id: 'testimonial-002',
    reviewerName: 'Priya Pillay',
    starRating: 5,
    reviewText:
      'We used Greenlife Daily for executive airport transfers throughout a week-long conference. Every pickup was punctual, the vehicles were spotless, and the service was discreet and professional. Exactly what our C-suite guests expected.',
  },
  {
    id: 'testimonial-003',
    reviewerName: 'Derick van der Merwe',
    starRating: 5,
    reviewText:
      'The Mercedes we hired for our wedding was absolutely stunning. The team went above and beyond, decorating the vehicle beautifully and ensuring everything ran smoothly on our big day. Worth every rand.',
  },
  {
    id: 'testimonial-004',
    reviewerName: 'Nomvula Dlamini',
    starRating: 4,
    reviewText:
      'Booked a luxury vehicle for a music video shoot in Johannesburg. The car was in pristine condition and perfectly suited the premium aesthetic we were going for. Smooth process from quote to return.',
  },
  {
    id: 'testimonial-005',
    reviewerName: 'Brendan Joubert',
    starRating: 5,
    reviewText:
      'I\'ve used Greenlife Daily several times for VIP client entertainment and they never disappoint. Competitive rates, immaculate vehicles, and a response time that makes last-minute bookings stress-free.',
  },
  {
    id: 'testimonial-006',
    reviewerName: 'Lindiwe Mokoena',
    starRating: 5,
    reviewText:
      'Organised a government delegation transfer through Greenlife Daily. The professionalism and attention to detail were outstanding. I will not hesitate to use them again for future official events.',
  },
];
