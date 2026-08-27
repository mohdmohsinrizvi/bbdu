import { notFound } from "next/navigation";
import UnitClient from "./UnitClient";
import { buildUnitMetadata, buildUnitBreadcrumbs, buildBreadcrumbStructuredData, getSubjectById } from "@/lib/seo";

type Params = Promise<{
  institution: string;
  program: string;
  branch: string;
  group: string;
  year: string;
  semester: string;
  subject: string;
  unit: string;
}>;

export async function generateMetadata({ params }: { params: Params }) {
  const p = await params;
  return buildUnitMetadata(p.institution, p.program, p.branch, p.group, p.year, p.semester, p.subject, p.unit);
}

export default async function UnitPage({ params }: { params: Params }) {
  const p = await params;
  const subject = getSubjectById(p.subject);
  const unit = subject?.units.find((u) => u.id === p.unit);
  if (!subject || !unit) notFound();

  const breadcrumbs = buildUnitBreadcrumbs(p.institution, p.program, p.branch, p.group, p.year, p.semester, p.subject, p.unit);
  const breadcrumbData = buildBreadcrumbStructuredData(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <UnitClient params={params} />
    </>
  );
}
