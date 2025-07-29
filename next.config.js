/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dvuzbcalsepjpbwkypyz.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // delete
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "vbmotorworld.com",
      },
      {
        protocol: "https",
        hostname: "www.stag-adventures.com",
      },
      {
        protocol: "https",
        hostname: "furplecs.com",
      },
    ],
  },
};

module.exports = nextConfig;
