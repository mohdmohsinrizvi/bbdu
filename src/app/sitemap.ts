import type { MetadataRoute } from "next";
import { institutions } from "@/data/institutions";
import { subjects as bbduSubjects } from "@/data/subjects";
import { bbniitSubjects } from "@/data/bbniit/subjects";

const BASE_URL = "https://bbdu.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/contributors`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/onboarding`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/progress`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const dynamicPages: MetadataRoute.Sitemap = [];

  for (const institution of institutions) {
    for (const program of institution.programs) {
      for (const branch of program.branches) {
        for (const group of branch.groups) {
          for (const year of group.years) {
            for (const semester of year.semesters) {
              const prefix = `${BASE_URL}/${institution.id}/${program.id}/${branch.id}/${group.id}/${year.id}/${semester.id}`;
              const source = institution.id === "bbniit" ? bbniitSubjects : bbduSubjects;
              const semesterSubjects = semester.subjects
                .map((id) => source.find((s) => s.id === id))
                .filter(Boolean);

              // Semester page
              dynamicPages.push({
                url: prefix,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.8,
              });

              for (const subject of semesterSubjects) {
                if (!subject) continue;

                // Subject page
                dynamicPages.push({
                  url: `${prefix}/${subject.id}`,
                  lastModified: now,
                  changeFrequency: "weekly",
                  priority: 0.7,
                });

                for (const unit of subject.units) {
                  // Unit page
                  dynamicPages.push({
                    url: `${prefix}/${subject.id}/${unit.id}`,
                    lastModified: now,
                    changeFrequency: "weekly",
                    priority: 0.6,
                  });

                  for (const topic of unit.topics) {
                    // Topic page
                    dynamicPages.push({
                      url: `${prefix}/${subject.id}/${unit.id}/${topic.id}`,
                      lastModified: now,
                      changeFrequency: "monthly",
                      priority: 0.5,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return [...staticPages, ...dynamicPages];
}
