export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/vehicles', label: 'Vehicles' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const QUOTE_FORM_HREF = '/contact#quote-form';
