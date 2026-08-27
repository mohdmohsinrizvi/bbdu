import { notFound } from "next/navigation";
import SubjectClient from "./SubjectClient";
import { buildSubjectMetadata, buildSubjectBreadcrumbs, buildBreadcrumbStructuredData, getSubjectById } from "@/lib/seo";

type Params = Promise<{
  institution: string;
  program: string;
  branch: string;
  group: string;
  year: string;
  semester: string;
  subject: string;
}>;

export async function generateMetadata({ params }: { params: Params }) {
  const p = await params;
  return buildSubjectMetadata(p.institution, p.program, p.branch, p.group, p.year, p.semester, p.subject);
}

export default async function SubjectPage({ params }: { params: Params }) {
  const p = await params;
  const subject = getSubjectById(p.subject);
  if (!subject) notFound();

  const breadcrumbs = buildSubjectBreadcrumbs(p.institution, p.program, p.branch, p.group, p.year, p.semester, p.subject);
  const breadcrumbData = buildBreadcrumbStructuredData(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <SubjectClient params={params} />
    </>
  );
}
