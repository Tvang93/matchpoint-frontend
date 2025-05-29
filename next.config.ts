import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    // domains: ["matchpointblobstorage.blob.core.windows.net"] 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'matchpoint.blob.core.windows.net',
        pathname: '/**',
      }
    ]
  }
};

export default withFlowbiteReact(nextConfig);