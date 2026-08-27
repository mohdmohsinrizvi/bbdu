import HomeClient from "./HomeClient";
import { buildHomepageMetadata, buildWebsiteStructuredData } from "@/lib/seo";

export const metadata = buildHomepageMetadata();

export default function HomePage() {
  const siteData = buildWebsiteStructuredData();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteData) }}
      />
      <HomeClient />
    </>
  );
}
