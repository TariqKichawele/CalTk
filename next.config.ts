import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com", protocol: "https" },
      { hostname: "utfs.io", port: "", protocol: "https" },
    ]
  }
};

export default nextConfig;
