import { notFound } from "next/navigation";
import SemesterClient from "./SemesterClient";
import { buildSemesterMetadata, buildSemesterBreadcrumbs, buildBreadcrumbStructuredData } from "@/lib/seo";
import { getSemester } from "@/data/institutions";

type Params = Promise<{
  institution: string;
  program: string;
  branch: string;
  group: string;
  year: string;
  semester: string;
}>;

export async function generateMetadata({ params }: { params: Params }) {
  const p = await params;
  return buildSemesterMetadata(p.institution, p.program, p.branch, p.group, p.year, p.semester);
}

export default async function SemesterPage({ params }: { params: Params }) {
  const p = await params;
  const sem = getSemester(p.institution, p.program, p.branch, p.group, p.year, p.semester);
  if (!sem) notFound();

  const breadcrumbs = buildSemesterBreadcrumbs(p.institution, p.program, p.branch, p.group, p.year, p.semester);
  const breadcrumbData = buildBreadcrumbStructuredData(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <SemesterClient params={params} />
    </>
  );
}
