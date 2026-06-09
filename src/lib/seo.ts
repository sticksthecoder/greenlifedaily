/**
 * SEO validation helpers for metadata smoke tests.
 *
 * Requirements: 14.1, 14.2, 14.4
 */

import type { Metadata } from 'next';

export function resolveMetadataTitle(metadata: Metadata): string {
  const { title } = metadata;

  if (typeof title === 'string') {
    return title;
  }

  if (title && typeof title === 'object') {
    if ('absolute' in title && typeof title.absolute === 'string') {
      return title.absolute;
    }

    if ('default' in title && typeof title.default === 'string') {
      return title.default;
    }
  }

  return '';
}

export function resolveMetadataDescription(metadata: Metadata): string {
  return typeof metadata.description === 'string' ? metadata.description : '';
}

export function assertTitleLength(title: string): void {
  if (title.length < 50 || title.length > 60) {
    throw new Error(
      `Expected title length 50–60 chars, got ${title.length}: "${title}"`,
    );
  }
}

export function assertDescriptionLength(description: string): void {
  if (description.length < 150 || description.length > 160) {
    throw new Error(
      `Expected description length 150–160 chars, got ${description.length}`,
    );
  }
}

export function assertOpenGraphTags(metadata: Metadata): void {
  const { openGraph } = metadata;

  if (!openGraph?.title) {
    throw new Error('Missing openGraph.title');
  }

  if (!openGraph.description) {
    throw new Error('Missing openGraph.description');
  }

  if (!openGraph.url) {
    throw new Error('Missing openGraph.url');
  }

  const images = openGraph.images;
  const hasImage = Array.isArray(images)
    ? images.length > 0
  : Boolean(images);

  if (!hasImage) {
    throw new Error('Missing openGraph.images');
  }
}
