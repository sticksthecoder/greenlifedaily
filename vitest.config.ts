import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // Expose Vitest globals (describe, it, expect, etc.) without importing them
    // Required for @testing-library/jest-dom to extend expect in setup files
    globals: true,
    // Use jsdom environment so React Testing Library can render components
    environment: "jsdom",
    // Run setup file before each test suite
    setupFiles: ["./src/test/setup.ts"],
    // Glob patterns for test files
    include: [
      "src/**/*.test.{ts,tsx}",
      "src/**/*.spec.{ts,tsx}",
    ],
    // Exclude node_modules and Next.js build output
    exclude: ["node_modules", ".next"],
    // Minimum 100 iterations per property-based test (fast-check default can be
    // overridden per test, but we set a global baseline here)
    // Global test timeout (generous for PBT runs)
    testTimeout: 30000,
    // Coverage configuration (optional, for later use)
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/test/**",
        "src/app/layout.tsx",
        "src/app/page.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      // Mirror the @/* path alias from tsconfig.json
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
