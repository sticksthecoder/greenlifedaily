import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand: primary greens (Tailwind green palette extended with named aliases)
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Brand: charcoal / dark grey secondary
        charcoal: {
          DEFAULT: "#2D2D2D",
          50: "#f5f5f5",
          100: "#e8e8e8",
          200: "#d1d1d1",
          300: "#a8a8a8",
          400: "#6f6f6f",
          500: "#4a4a4a",
          600: "#2D2D2D",
          700: "#252525",
          800: "#1a1a1a",
          900: "#111111",
        },
        // Explicit white alias for semantic use
        brand: {
          green: "#16a34a",
          white: "#ffffff",
          charcoal: "#2D2D2D",
        },
      },
      fontFamily: {
        // Inter is loaded via next/font in the root layout
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        // Extended spacing scale for consistent layout rhythm
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
        // Section padding tokens
        "section-sm": "3rem",
        "section-md": "5rem",
        "section-lg": "7.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      transitionDuration: {
        // Brand transition scale: 150–500ms per Requirement 18.2
        150: "150ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
      },
      screens: {
        // Mobile-first breakpoints (Requirement 17.1)
        // 320px base (handled by Tailwind defaults — no override needed)
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
