import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/semester-1",
        destination: "/select",
        permanent: false,
      },
      {
        source: "/semester-1/:subject",
        destination: "/btech/cse/group-a/semester-1/:subject",
        permanent: false,
      },
      {
        source: "/semester-1/:subject/:unit",
        destination: "/btech/cse/group-a/semester-1/:subject/:unit",
        permanent: false,
      },
      {
        source: "/semester-1/:subject/:unit/:topic",
        destination: "/btech/cse/group-a/semester-1/:subject/:unit/:topic",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
