/**
 * Smoke test — verifies that the Vitest + React Testing Library
 * + fast-check setup is correctly configured.
 */
import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

describe("Test suite setup", () => {
  it("vitest runs and assertions work", () => {
    expect(1 + 1).toBe(2);
  });

  it("fast-check is available and runs property tests", () => {
    // Property: string concatenation length equals sum of part lengths
    fc.assert(
      fc.property(fc.string(), fc.string(), (a, b) => {
        return (a + b).length === a.length + b.length;
      }),
      { numRuns: 100 }
    );
  });
});
