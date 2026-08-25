import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/semester-1",
        destination: "/select",
        permanent: true,
      },
      {
        source: "/semester-1/:subject",
        destination: "/btech/cse/group-a/semester-1/:subject",
        permanent: true,
      },
      {
        source: "/semester-1/:subject/:unit",
        destination: "/btech/cse/group-a/semester-1/:subject/:unit",
        permanent: true,
      },
      {
        source: "/semester-1/:subject/:unit/:topic",
        destination: "/btech/cse/group-a/semester-1/:subject/:unit/:topic",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
