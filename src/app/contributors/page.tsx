import type { Metadata } from "next";
import ContributorsPageClient from "./ContributorsPageClient";

export const metadata: Metadata = {
  title: "Contributors",
  description:
    "Meet the students who help BBD Study Hub grow and reach more learners.",
  alternates: { canonical: "https://bbdu.netlify.app/contributors" },
  openGraph: {
    title: "Contributors | BBD Study Hub",
    description:
      "Meet the students who help BBD Study Hub grow and reach more learners.",
    url: "https://bbdu.netlify.app/contributors",
    siteName: "BBD Study Hub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bbdu.netlify.app/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "BBD Study Hub Contributors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contributors | BBD Study Hub",
    description:
      "Meet the students who help BBD Study Hub grow and reach more learners.",
    images: ["https://bbdu.netlify.app/icons/og-image.png"],
  },
};

export default function ContributorsRoute() {
  return <ContributorsPageClient />;
}
