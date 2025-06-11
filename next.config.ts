import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns : [
          {
            protocol: "https",
            hostname: "image.mux.com"
          },
          {
            protocol: "https",
            hostname: "gl51faoru8.ufs.sh"
          }
    ]
  }
};

export default nextConfig;
