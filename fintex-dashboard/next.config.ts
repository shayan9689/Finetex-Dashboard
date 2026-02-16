import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/dashboard/users", destination: "/dashboard/clients", permanent: true },
    ];
  },
};

export default nextConfig;
