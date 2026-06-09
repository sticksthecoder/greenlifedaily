export interface BusinessHours {
  weekdays: string;
  saturday: string;
  sunday: string;
  publicHolidays: string;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
  linkedin: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  /** Web design / consulting credit shown in the footer (optional). */
  consultantCompanyName?: string;
  consultantCompanyUrl?: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  suburb: string;
  postalCode: string;
  city: string;
  province: string;
  /** Single-line address for display in the UI */
  address: string;
  businessHours: BusinessHours;
  /** WhatsApp number in international format without '+', e.g. "27XXXXXXXXX" */
  whatsAppNumber: string;
  socialMedia: SocialMedia;
}

export const company: CompanyInfo = {
  name: 'Greenlife Daily',
  tagline: 'Car Rental Company',
  consultantCompanyName: '',
  consultantCompanyUrl: '',
  phoneNumber: '082 330 2132',
  email: 'sticksthedesigner@gmail.com',
  streetAddress: '87 Tennyson Road',
  suburb: 'Lombardy East',
  postalCode: '2090',
  city: 'Johannesburg',
  province: 'Gauteng',
  address: '87 Tennyson Road, Lombardy East, 2090',
  businessHours: {
    weekdays: 'Monday – Friday: 07:00 – 19:00',
    saturday: 'Saturday: 08:00 – 17:00',
    sunday: 'Sunday: 09:00 – 14:00',
    publicHolidays: 'Public Holidays: 09:00 – 13:00',
  },
  whatsAppNumber: '27823302132',
  socialMedia: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },
};
