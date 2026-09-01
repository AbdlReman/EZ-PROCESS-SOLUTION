import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // The admin image fields also accept a pasted URL (not just an
      // upload), so allow any HTTPS host — otherwise next/image throws
      // (a 500) the moment someone saves a project/service/blog post
      // with an image hosted anywhere outside Cloudinary.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
