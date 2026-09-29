import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow access from local network (mobile device)
  allowedDevOrigins: ["192.168.4.10"],
} as any;

export default nextConfig;
