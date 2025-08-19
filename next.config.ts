import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com", // আগেরটা
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // নতুন যোগ হলো
      },
    ],
  },
};

export default nextConfig;
