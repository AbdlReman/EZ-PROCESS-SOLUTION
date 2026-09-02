import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      // lib/actions/upload.ts allows images up to 8MB, but Next's default
      // Server Action body limit is 1MB — anything larger than that gets
      // rejected by the framework itself with a generic 400, before the
      // upload action's own size check ever runs.
      bodySizeLimit: "10mb",
    },
  },
  images: {
    // The admin image fields accept a pasted URL from anywhere (not just a
    // Cloudinary upload), so we can't safely allowlist every possible host
    // via remotePatterns. Skipping Next's image optimizer avoids that
    // entirely — images still render, they're just served as-is instead of
    // being resized/reformatted through Next's image proxy.
    unoptimized: true,
  },
};

export default nextConfig;
