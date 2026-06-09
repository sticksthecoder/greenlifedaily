/**
 * Unit tests for about page content integrity.
 *
 * Requirements: 10.4
 */

import { describe, it, expect } from 'vitest';
import { aboutContent } from './about';

const requiredValues = [
  'Professionalism',
  'Reliability',
  'Customer Satisfaction',
  'Safety',
  'Excellence',
] as const;

describe('about content', () => {
  it('includes a non-empty company overview', () => {
    expect(aboutContent.overview.paragraphs.length).toBeGreaterThan(0);
    aboutContent.overview.paragraphs.forEach((paragraph) => {
      expect(paragraph.trim().length).toBeGreaterThan(0);
    });
  });

  it('includes mission and vision statements', () => {
    expect(aboutContent.mission.statement.trim().length).toBeGreaterThan(0);
    expect(aboutContent.vision.statement.trim().length).toBeGreaterThan(0);
  });

  it('includes exactly five company values with descriptions', () => {
    expect(aboutContent.values).toHaveLength(5);
    const titles = aboutContent.values.map((value) => value.title);
    requiredValues.forEach((title) => {
      expect(titles).toContain(title);
    });
    aboutContent.values.forEach((value) => {
      expect(value.description.trim().length).toBeGreaterThan(0);
    });
  });
});
