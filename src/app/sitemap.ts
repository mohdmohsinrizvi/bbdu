import type { MetadataRoute } from "next";
import { subjects } from "@/data/subjects";
import { branches } from "@/data/branches";
import { getSubjectsForGroup } from "@/lib/branchUtils";

const BASE_URL = "https://bbdu-study-hub.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/select`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/semester-1`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/progress`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const branchPages: MetadataRoute.Sitemap = [];

  for (const branch of branches) {
    for (const group of branch.groups) {
      const groupSubjects = getSubjectsForGroup(branch.id, group.id);

      branchPages.push({
        url: `${BASE_URL}/btech/${branch.id}/${group.id}/semester-1`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      for (const subject of groupSubjects) {
        branchPages.push({
          url: `${BASE_URL}/btech/${branch.id}/${group.id}/semester-1/${subject.id}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.7,
        });

        for (const unit of subject.units) {
          branchPages.push({
            url: `${BASE_URL}/btech/${branch.id}/${group.id}/semester-1/${subject.id}/${unit.id}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.6,
          });

          for (const topic of unit.topics) {
            branchPages.push({
              url: `${BASE_URL}/btech/${branch.id}/${group.id}/semester-1/${subject.id}/${unit.id}/${topic.id}`,
              lastModified: now,
              changeFrequency: "monthly",
              priority: 0.5,
            });
          }
        }
      }
    }
  }

  return [...staticPages, ...branchPages];
}
