import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy shortcuts → institution routes
      {
        source: "/semester-1",
        destination: "/select",
        permanent: true,
      },
      {
        source: "/semester-1/:subject",
        destination: "/bbdu/btech/cse/group-a/semester-1/:subject",
        permanent: true,
      },
      {
        source: "/semester-1/:subject/:unit",
        destination: "/bbdu/btech/cse/group-a/semester-1/:subject/:unit",
        permanent: true,
      },
      {
        source: "/semester-1/:subject/:unit/:topic",
        destination: "/bbdu/btech/cse/group-a/semester-1/:subject/:unit/:topic",
        permanent: true,
      },
      // Old /btech/ routes → /bbdu/btech/
      {
        source: "/btech/:branch/:group/:semester",
        destination: "/bbdu/btech/:branch/:group/:semester",
        permanent: true,
      },
      {
        source: "/btech/:branch/:group/:semester/:subject",
        destination: "/bbdu/btech/:branch/:group/:semester/:subject",
        permanent: true,
      },
      {
        source: "/btech/:branch/:group/:semester/:subject/:unit",
        destination: "/bbdu/btech/:branch/:group/:semester/:subject/:unit",
        permanent: true,
      },
      {
        source: "/btech/:branch/:group/:semester/:subject/:unit/:topic",
        destination: "/bbdu/btech/:branch/:group/:semester/:subject/:unit/:topic",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
