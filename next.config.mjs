/** @type {import('next').NextConfig} */
const nextConfig = {
  // ----------------------------------------------------------------
  // Image optimisation
  // ----------------------------------------------------------------
  images: {
    // Remote image domains allowed for next/image optimisation.
    remotePatterns: [
      // Unsplash placeholder images during development
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Google Maps static map API (fallback map image)
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "maps.gstatic.com",
      },
    ],
    // Serve images in modern formats (WebP/AVIF) — Requirement 15.4
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ----------------------------------------------------------------
  // Trailing slash — clean URLs like /services rather than /services/
  // ----------------------------------------------------------------
  trailingSlash: false,

  // ----------------------------------------------------------------
  // Compression — Gzip for server responses (Requirement 15.6)
  // ----------------------------------------------------------------
  compress: true,

  // ----------------------------------------------------------------
  // Strict mode (React 18 best practice)
  // ----------------------------------------------------------------
  reactStrictMode: true,

  // ----------------------------------------------------------------
  // Headers — basic security hardening
  // ----------------------------------------------------------------
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
