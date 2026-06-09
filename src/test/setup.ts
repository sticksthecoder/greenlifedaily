/**
 * Vitest global test setup
 *
 * Imported before every test suite via vitest.config.ts `setupFiles`.
 * Extends Vitest's `expect` with jest-dom matchers so assertions like
 * `expect(element).toBeInTheDocument()` work out of the box.
 */
import "@testing-library/jest-dom";
