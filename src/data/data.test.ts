/**
 * Unit tests for data file integrity.
 *
 * Validates: Requirements 2.1, 3.1, 6.1
 */
import { describe, it, expect } from 'vitest';
import { vehicles } from './vehicles';
import { services, serviceCategories, type ServiceCategory } from './services';
import { faqs } from './faqs';

describe('vehicles data integrity', () => {
  it('has between 6 and 8 vehicles (inclusive)', () => {
    expect(vehicles.length).toBeGreaterThanOrEqual(6);
    expect(vehicles.length).toBeLessThanOrEqual(8);
  });
});

describe('services data integrity', () => {
  it('contains all nine ServiceCategory values', () => {
    const expectedCategories: ServiceCategory[] = [
      'Luxury Vehicle Hire',
      'Matric Dance Transport',
      'Wedding Vehicle Hire',
      'Executive Transport',
      'Airport Transfers',
      'Corporate Rentals',
      'VIP Escort Services',
      'Music Video Vehicle Hire',
      'TV & Film Production Vehicle Hire',
    ];

    const presentCategories = services.map((s) => s.category);

    for (const category of expectedCategories) {
      expect(presentCategories).toContain(category);
    }
  });

  it('serviceCategories list contains all nine entries', () => {
    expect(serviceCategories).toHaveLength(9);
  });
});

describe('faqs data integrity', () => {
  it('every FAQ entry has a non-empty question and answer', () => {
    expect(faqs.length).toBeGreaterThan(0);

    for (const faq of faqs) {
      expect(faq.question.trim(), `FAQ id="${faq.id}" question must not be empty`).not.toBe('');
      expect(faq.answer.trim(), `FAQ id="${faq.id}" answer must not be empty`).not.toBe('');
    }
  });
});
