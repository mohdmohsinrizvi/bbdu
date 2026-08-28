import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Legacy shortcuts → onboarding
      {
        source: "/semester-1",
        destination: "/onboarding",
        permanent: true,
      },
      {
        source: "/semester-1/:subject",
        destination: "/bbdu/btech/cse/group-a/first-year/semester-1/:subject",
        permanent: true,
      },
      {
        source: "/semester-1/:subject/:unit",
        destination: "/bbdu/btech/cse/group-a/first-year/semester-1/:subject/:unit",
        permanent: true,
      },
      {
        source: "/semester-1/:subject/:unit/:topic",
        destination: "/bbdu/btech/cse/group-a/first-year/semester-1/:subject/:unit/:topic",
        permanent: true,
      },
      // Old bare /btech/ routes → /bbdu/btech/ with year
      {
        source: "/btech/:branch/:group/:semester",
        destination: "/bbdu/btech/:branch/:group/first-year/:semester",
        permanent: true,
      },
      {
        source: "/btech/:branch/:group/:semester/:subject",
        destination: "/bbdu/btech/:branch/:group/first-year/:semester/:subject",
        permanent: true,
      },
      {
        source: "/btech/:branch/:group/:semester/:subject/:unit",
        destination: "/bbdu/btech/:branch/:group/first-year/:semester/:subject/:unit",
        permanent: true,
      },
      {
        source: "/btech/:branch/:group/:semester/:subject/:unit/:topic",
        destination: "/bbdu/btech/:branch/:group/first-year/:semester/:subject/:unit/:topic",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
