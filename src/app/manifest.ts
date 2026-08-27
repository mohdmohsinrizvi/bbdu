import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BBDU CSE Study Hub",
    short_name: "BBDU CSE",
    description:
      "A student-built learning platform for B.Tech CSE students at BBD University. Structured subjects, curated YouTube videos, and progress tracking.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait-primary",
    theme_color: "#1e1b4b",
    background_color: "#1e1b4b",
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
        label: "BBDU CSE Study Hub - Desktop",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        form_factor: "narrow",
        label: "BBDU CSE Study Hub - Mobile",
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
