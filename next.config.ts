import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "en",
    localeDetection: false, // Prevents automatic locale detection
  },
  images: {
    domains: ["github.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
