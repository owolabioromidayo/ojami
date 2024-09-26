const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  register: true,
  scope: "/",
  sw: "/service-worker.js",
  fallbacks: {
    // Failed page requests fallback to this.
    document: "/pages/_offline.tsx",
    // This is for /_next/.../.json files.
    data: "/fallback.json",
  },
});
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },};

module.exports = withPWA(nextConfig);
