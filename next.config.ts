import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "utfs.io" }],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   experimental: {
//     turbo: false, // ⛔ Disable Turbopack (fixes Prisma sourcemap crash)
//   },
// };

// export default nextConfig;
