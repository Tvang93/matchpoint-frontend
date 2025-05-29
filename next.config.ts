import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    // domains: ["aaronsblob123.blob.core.windows.net"]
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aaronsblob123.blob.core.windows.net',
        pathname: '/**',
      }
    ]
  }
};

export default withFlowbiteReact(nextConfig);