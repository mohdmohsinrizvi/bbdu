import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Return to BBD Study Hub.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-extrabold tabular-nums text-border-strong">404</p>
      <h1 className="mt-4 text-xl font-bold text-foreground">
        Page not in the study hub
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        Looks like this page isn&rsquo;t part of the syllabus. It may have been moved or doesn&rsquo;t exist.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
        >
          Back to Study Hub
        </Link>
        <Link
          href="/onboarding"
          className="rounded-lg border border-border px-5 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-surface-hover"
        >
          Set up your profile
        </Link>
      </div>
    </div>
  );
}
