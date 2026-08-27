import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BBD Study Hub",
    short_name: "BBD Hub",
    description:
      "Academic syllabus, curated lectures, and progress tracking for B.Tech students at BBD institutions.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait-primary",
    theme_color: "#1a1635",
    background_color: "#1a1635",
    lang: "en",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/icons/og-image.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
        label: "BBD Study Hub - Desktop",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        form_factor: "narrow",
        label: "BBD Study Hub - Mobile",
      },
    ],
    shortcuts: [
      {
        name: "Search Subjects",
        short_name: "Search",
        url: "/search",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "My Progress",
        short_name: "Progress",
        url: "/progress",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  };
}
