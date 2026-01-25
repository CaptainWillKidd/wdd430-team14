/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   config options here 
  reactCompiler: true,
};

export default nextConfig; */


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // This tells Next.js it's okay to render SVGs from the allowed domains
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;